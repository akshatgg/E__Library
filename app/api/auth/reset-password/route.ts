// app/api/auth/reset-password/route.ts
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {generateOTP} from "@/lib/helper/otp";
import {sendPasswordResetEmail} from "@/lib/helper/sendEmail";
import {hashPassword} from "@/lib/helper/auth";
import { Prisma } from "@prisma/client";

// -------------------- Request OTP for Password Reset --------------------
export async function POST(req: NextRequest) {
  try {
    const {email} = await req.json();
    if (!email) {
      return NextResponse.json(
        {success: false, message: "Email is required"},
        {status: 400}
      );
    }

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
      return NextResponse.json(
        {success: false, message: "User not found"},
        {status: 404}
      );
    }

    // Check if a valid OTP already exists
    const now = new Date();
    const existingOTP = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        type: "Password Reset",
        used: false,
        expiresAt: {gt: now}, // OTP not expired
      },
      orderBy: {createdAt: "desc"},
    });

    let otp: string;
    let expiryMinutes: number = Number(process.env.OTP_EXPIRE_MINUTES) || 10;

    if (!existingOTP) {
      // Generate new OTP
      otp = generateOTP();
      const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

      await prisma.oTP.create({
        data: {
          userId: user.id,
          email: user.email,
          otp,
          type: "Password Reset",
          expiresAt,
        },
      });
    } else {
      // Reuse existing OTP
      otp = existingOTP.otp;
      expiryMinutes = Math.ceil(
        (existingOTP.expiresAt.getTime() - now.getTime()) / 60000
      );
    }

    // Fire-and-forget email send
    sendPasswordResetEmail(
      user.email,
      user.displayName ?? "User",
      otp,
      expiryMinutes
    ).catch((err) => console.error("Password reset OTP email error:", err));

    return NextResponse.json({
      success: true,
      message:
        "An OTP has been sent to your email. Use it to reset your password.",
    });
  } catch (err) {
    console.error("Request reset password error:", err);
    return NextResponse.json(
      {success: false, message: "Failed to request OTP"},
      {status: 500}
    );
  }
}

// -------------------- Forget Password (Verify OTP + Reset) --------------------
export async function PUT(req: NextRequest) {
  try {
    const {email, otp, password} = await req.json();
    if (!email || !otp || !password) {
      return NextResponse.json(
        {success: false, message: "All fields are required"},
        {status: 400}
      );
    }

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
      return NextResponse.json(
        {success: false, message: "User not found"},
        {status: 404}
      );
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        type: "Password Reset",
        otp,
        used: false,
        expiresAt: {gt: new Date()},
      },
      orderBy: {createdAt: "desc"},
    });

    if (!otpRecord) {
      return NextResponse.json(
        {success: false, message: "Invalid or expired OTP"},
        {status: 400}
      );
    }

    const hashedPassword = await hashPassword(password);

    let updatedUser;
    try {
      updatedUser = await prisma.$transaction(async (tx) => {
        // Mark OTP as used
        await tx.oTP.update({
          where: {id: otpRecord.id},
          data: {used: true},
        });

        // Update user password and other optional fields
        return tx.user.update({
          where: {id: user.id},
          data: {password: hashedPassword},
          select: {
            id: true,
            email: true,
            displayName: true,
            isVerified: true,
            isActive: true,
            lastLoggedin: true,
            role: true,
          },
        });
      });
    } catch (err: any) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return NextResponse.json(
          {success: false, message: "Conflict during password reset"},
          {status: 409}
        );
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Forget password error:", err);
    return NextResponse.json(
      {success: false, message: "Failed to reset password"},
      {status: 500}
    );
  }
}
