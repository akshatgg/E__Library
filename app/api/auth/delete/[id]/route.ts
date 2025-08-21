// app/api/delete/[id]/route.ts
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {generateOTP} from "@/lib/helper/otp";
import {sendOtpDeleteAccountVerificationEmail} from "@/lib/helper/sendEmail";

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {id} = await params;

    if (!id) {
      return NextResponse.json(
        {success: false, message: "User ID is required"},
        {status: 400}
      );
    }

    const user = await prisma.user.findUnique({where: {id}});
    if (!user) {
      return NextResponse.json(
        {success: false, message: "User not found"},
        {status: 404}
      );
    }

    // Check latest OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        type: "Delete Account Verification",
      },
      orderBy: {createdAt: "desc"},
    });

    const now = new Date();
    let otp: string;
    let expiryMinutes: number;

    if (!otpRecord || otpRecord.used || otpRecord.expiresAt < now) {
      // Expired or not found → generate new OTP
      otp = generateOTP();
      expiryMinutes = Number(process.env.OTP_EXPIRE_MINUTES) || 10;
      const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

      await prisma.oTP.create({
        data: {
          userId: user.id,
          email: user.email,
          otp,
          type: "Delete Account Verification",
          expiresAt,
        },
      });
    } else {
      // Reuse existing valid OTP
      otp = otpRecord.otp;
      expiryMinutes = Math.ceil(
        (otpRecord.expiresAt.getTime() - now.getTime()) / 60000
      );
    }

    // Send OTP email (non-blocking)
    sendOtpDeleteAccountVerificationEmail(
      user.email,
      user.displayName ?? "Guest",
      otp,
      expiryMinutes
    ).catch((e) => console.error("Delete account OTP email error:", e));

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email. Use it to confirm account deletion.",
    });
  } catch (err) {
    console.error("Delete Account OTP Error:", err);
    return NextResponse.json(
      {success: false, message: "Failed to send OTP"},
      {status: 500}
    );
  }
}

// Step 2: Verify OTP and delete account
export async function DELETE(
  req: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {id} = await params;
    if (!id)
      return NextResponse.json(
        {success: false, message: "User ID is required"},
        {status: 400}
      );

    const {otp} = await req.json();
    if (!otp)
      return NextResponse.json(
        {success: false, message: "OTP is required"},
        {status: 400}
      );

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: id,
        otp,
        type: "Delete Account Verification",
        used: false,
      },
      orderBy: {createdAt: "desc"},
    });

    if (!otpRecord)
      return NextResponse.json(
        {success: false, message: "Invalid OTP"},
        {status: 403}
      );

    if (otpRecord.expiresAt < new Date())
      return NextResponse.json(
        {success: false, message: "OTP expired"},
        {status: 403}
      );

    // Mark OTP as used
    await prisma.oTP.update({where: {id: otpRecord.id}, data: {used: true}});

    // Delete user
    await prisma.user.delete({where: {id}});

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("Delete User Error:", err);
    return NextResponse.json(
      {success: false, message: "Failed to delete account"},
      {status: 500}
    );
  }
}
