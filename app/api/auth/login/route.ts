// app/api/auth/login/route.ts
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {comparePassword} from "@/lib/helper/auth";
import {generateToken} from "@/lib/helper/jwt";
import {sendOtpVerificationEmail} from "@/lib/helper/sendEmail";
import {generateOTP} from "@/lib/helper/otp";

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {success: false, message: "Email and password are required"},
        {status: 400}
      );
    }

    // Fetch user with password for validation
    const user = await prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        email: true,
        displayName: true,
        password: true,
        isVerified: true,
        isActive: true,
        lastLoggedin: true,
        role: true,
      },
    });

    // Unified failure message (security: avoid email existence leaks)
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        {success: false, message: "Invalid email or password"},
        {status: 401}
      );
    }

    // Require email verification before login
    if (!user.isVerified) {
      const otpRecord = await prisma.oTP.findFirst({
        where: {userId: user.id, type: "verification"},
        orderBy: {createdAt: "desc"},
      });

      const now = new Date();
      const expired = !otpRecord || otpRecord.used || otpRecord.expiresAt < now;

      if (expired) {
        const otp = generateOTP();
        const expiryMinutes = Number(process.env.OTP_EXPIRE_MINUTES) || 10;
        const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

        await prisma.oTP.create({
          data: {
            userId: user.id,
            email: user.email,
            otp,
            type: "verification",
            expiresAt,
          },
        });

        sendOtpVerificationEmail(
          user.email,
          user.displayName ?? "New Guest",
          otp,
          expiryMinutes
        ).catch((e) => console.error("OTP email error:", e));
      }

      return NextResponse.json(
        {
          success: false,
          message: expired
            ? "Account not verified. A new OTP has been sent to your email."
            : "Account not verified. Please check your email for the OTP.",
        },
        {status: 403}
      );
    }

    // Parallel: update last login & issue token
    const [_, token] = await Promise.all([
      prisma.user.update({
        where: {id: user.id},
        data: {lastLoggedin: new Date(), isActive: true},
      }),
      generateToken({
        id: user.id,
        displayName: user.displayName,
        isVerified: user.isVerified,
        lastLoggedin: user.lastLoggedin,
        isActive: user.isActive,
        email: user.email,
        role: user.role,
      }),
    ]);

    const {password: _Password, ...safeUser} = user;

    const res = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: safeUser,
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
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      {success: false, message: "Server error"},
      {status: 500}
    );
  }
}
