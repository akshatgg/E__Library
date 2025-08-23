// utils/sendEmail.ts
import nodemailer from "nodemailer";

// ✅ Create reusable transporter
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE || "Gmail",
  auth: {
    user: process.env.NODEMAILER_SMTP_EMAIL,
    pass: process.env.NODEMAILER_SMTP_PASS,
  },
});

// ---- Template payload types ----
type WelcomePayload = {name: string};
type PasswordResetPayload = {name: string; otp: string; expiryMinutes?: number};
type OtpVerificationPayload = {
  name: string;
  otp: string;
  expiryMinutes?: number;
};
type deleteAccountVerificationPayload = {
  name: string;
  otp: string;
  expiryMinutes?: number;
};

// Map template name → payload type
type TemplateMap = {
  welcome: WelcomePayload;
  passwordReset: PasswordResetPayload;
  otpVerification: OtpVerificationPayload;
  deleteAccountVerification: deleteAccountVerificationPayload;
};

// ---- Centralized templates ----
const templates: {
  [K in keyof TemplateMap]: (payload: TemplateMap[K]) => {
    subject: string;
    text: string;
    html: string;
  };
} = {
  welcome: ({name}) => ({
    subject: "Welcome to E-Library! 🎉",
    text: `Hello ${name},\nThank you for creating an account with us!`,
    html: `<h1>Hello ${name}</h1><p>Thank you for creating an account with us! 🎉</p>`,
  }),

  passwordReset: ({name, otp, expiryMinutes = 10}) => ({
    subject: "Reset Your E-Library Password",
    text: `Hello ${name},\nYour password reset OTP is: ${otp}. It expires in ${expiryMinutes} minutes.`,
    html: `<p>Hello ${name},</p><p>Your password reset OTP is: <strong>${otp}</strong></p><p>This OTP will expire in ${expiryMinutes} minutes.</p>`,
  }),

  otpVerification: ({name, otp, expiryMinutes = 10}) => ({
    subject: "Your E-Library OTP Verification Code",
    text: `Hello ${name},\nYour OTP code is: ${otp}. It expires in ${expiryMinutes} minutes.`,
    html: `<p>Hello ${name},</p><p>Your OTP code is: <strong>${otp}</strong></p><p>This OTP will expire in ${expiryMinutes} minutes.</p>`,
  }),

  // Delete Account OTP
  deleteAccountVerification: ({name, otp, expiryMinutes = 10}) => ({
    subject: "Confirm Your Account Deletion - E-Library",
    text: `Hello ${name},\nYou requested to delete your E-Library account.\nYour OTP code is: ${otp}. It expires in ${expiryMinutes} minutes.\nIf you did not request this, please ignore this email.`,
    html: `<p>Hello ${name},</p>
           <p>You requested to <strong>delete your E-Library account</strong>.</p>
           <p>Your OTP code is: <strong>${otp}</strong></p>
           <p>This OTP will expire in ${expiryMinutes} minutes.</p>
           <p>If you did not request this, please ignore this email.</p>`,
  }),
};

// ---- Generic sendEmail ----
export const sendEmail = async <T extends keyof TemplateMap>(
  to: string,
  type: T,
  payload: TemplateMap[T]
): Promise<void> => {
  if (!to) throw new Error("Invalid recipient email");

  const {subject, text, html} = templates[type](payload);

  try {
    await transporter.sendMail({
      from: `"E-Library" <${process.env.NODEMAILER_SMTP_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`✅ Email sent to ${to} (${type})`);
  } catch (err: any) {
    console.error("❌ Email error:", err);
    throw new Error(`Email sending failed: ${err.message}`);
  }
};

// ---- Convenience wrappers ----
export const sendWelcomeEmail = (to: string, name: string) =>
  sendEmail(to, "welcome", {name});

export const sendPasswordResetEmail = (
  to: string,
  name: string,
  otp: string,
  expiryMinutes?: number
) => sendEmail(to, "passwordReset", {name, otp, expiryMinutes});

export const sendOtpVerificationEmail = (
  to: string,
  name: string,
  otp: string,
  expiryMinutes?: number
) => sendEmail(to, "otpVerification", {name, otp, expiryMinutes});

export const sendOtpDeleteAccountVerificationEmail = (
  to: string,
  name: string,
  otp: string,
  expiryMinutes?: number
) =>
  sendEmail(to, "deleteAccountVerification", {
    name,
    otp,
    expiryMinutes,
  });
