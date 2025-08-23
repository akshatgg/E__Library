// app/api/auth/register/route.ts
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {hashPassword} from "@/lib/helper/auth";
import {generateOTP} from "@/lib/helper/otp";
import {
  sendOtpVerificationEmail,
  sendWelcomeEmail,
} from "@/lib/helper/sendEmail";
import {Prisma} from "@prisma/client";
import crypto from "crypto";
import {generateToken} from "@/lib/helper/jwt";

export async function POST(req: NextRequest) {
  try {
    const {email, password, displayName, role = "user"} = await req.json();

    // Basic validation
    if (!email || !password || !displayName) {
      return NextResponse.json(
        {success: false, message: "Missing required fields"},
        {status: 400}
      );
    }

    // Early uniqueness check (race handled by DB constraint below)
    const exists = await prisma.user.findUnique({where: {email}});
    if (exists) {
      return NextResponse.json(
        {success: false, message: "User already exists"},
        {status: 409}
      );
    }

    // Parallel expensive ops: hash password + generate OTP
    const [hashedPassword, otp] = await Promise.all([
      hashPassword(password),
      generateOTP(),
    ]);

    const expiryMinutes = Number(process.env.OTP_EXPIRE_MINUTES) || 10;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Create user + OTP atomically
    let user;
    try {
      user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            displayName,
            password: hashedPassword,
            role,
            uid: crypto.randomUUID(),
          },
          select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
            createdAt: true,
          },
        });

        await tx.oTP.create({
          data: {
            userId: newUser.id,
            email: newUser.email,
            otp,
            type: "verification",
            expiresAt,
            // `used` defaults to false per schema
          },
        });

        return newUser;
      });
    } catch (err: any) {
      // Handle unique constraint races and surface friendly message
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        // Unique constraint failed (likely email or uid)
        return NextResponse.json(
          {success: false, message: "User already exists"},
          {status: 409}
        );
      }
      throw err; // bubble up for general error handler
    }

    // Fire-and-forget: send the OTP email (non-blocking)
    sendOtpVerificationEmail(
      user.email,
      user.displayName ?? "New Guest",
      otp,
      expiryMinutes
    ).catch((e) => console.error("OTP email error:", e));

    // Return created user (no sensitive info)
    return NextResponse.json(
      {success: true, message: "User created, OTP sent", user},
      {status: 201}
    );
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      {success: false, message: "Server error"},
      {status: 500}
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {email, otp} = await req.json();

    // Basic validation
    if (!email || !otp) {
      return NextResponse.json(
        {success: false, message: "Email and OTP are required"},
        {status: 400}
      );
    }

    // Find latest OTP entry for the user
    const otpRecord = await prisma.oTP.findFirst({
      where: {email, type: "verification", used: false},
      orderBy: {createdAt: "desc"},
      select: {id: true, otp: true, expiresAt: true, userId: true},
    });

    if (!otpRecord) {
      return NextResponse.json(
        {success: false, message: "OTP not found or already used"},
        {status: 404}
      );
    }

    // Validate OTP
    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        {success: false, message: "Invalid OTP"},
        {status: 400}
      );
    }

    // Check expiry
    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json(
        {success: false, message: "OTP has expired. Please request a new one"},
        {status: 400}
      );
    }

    // Atomically mark user verified & mark OTP as used
    let verifiedUser;
    try {
      verifiedUser = await prisma.$transaction(async (tx) => {
        await tx.oTP.update({
          where: {id: otpRecord.id},
          data: {used: true},
        });

        return tx.user.update({
          where: {id: otpRecord.userId},
          data: {
            isVerified: true,
            isActive: true,
            lastLoggedin: new Date(),
          },
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
          {success: false, message: "Verification conflict"},
          {status: 409}
        );
      }
      throw err;
    }

    // Generate JWT token
    const token = await generateToken({
      id: verifiedUser.id,
      displayName: verifiedUser.displayName,
      lastLoggedin: verifiedUser.lastLoggedin,
      isActive: verifiedUser.isActive,
      isVerified: verifiedUser.isVerified,
      email: verifiedUser.email,
      role: verifiedUser.role,
    });

    // Send welcome email (fire-and-forget)
    if (verifiedUser.isVerified) {
      sendWelcomeEmail(
        verifiedUser.email,
        verifiedUser.displayName ?? "New Guest"
      ).catch((e) => console.error("Welcome email error:", e));
    }

    const res = NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        user: verifiedUser,
        token,
      },
      {status: 200}
    );

    res.cookies.set("token", token, {
      httpOnly: process.env.NODE_ENV === "production", // prevent JS access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // expire immediately
    });

    return res;
  } catch (err: any) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      {success: false, message: "Server error"},
      {status: 500}
    );
  }
}
