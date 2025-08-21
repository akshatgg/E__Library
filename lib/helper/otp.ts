import crypto from "crypto";

//  Generate a numeric OTP (default: 6 digits) using crypto for security
export const generateOTP = (length: number = 6): string =>
  Array.from({length}, () => crypto.randomInt(0, 10)).join("");

//  Check if an OTP is expired
export const isOtpExpired = (expiryTime?: Date | string | null): boolean => {
  if (!expiryTime) return true;
  const expiry = new Date(expiryTime);
  if (isNaN(expiry.getTime())) return true; // invalid date fallback
  return new Date() > expiry;
};
