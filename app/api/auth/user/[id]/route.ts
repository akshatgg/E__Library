// app/api/users/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {hashPassword} from "@/lib/helper/auth";
import {generateToken} from "@/lib/helper/jwt";

// GET /api/users/:id
export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {id} = await params;
    if (!id) {
      return NextResponse.json(
        {success: false, message: "User ID is required"},
        {status: 400}
      );
    }

    // Fetch user with only safe fields (avoid leaking password, etc.)
    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        displayName: true,
        email: true,
        role: true,
        createdAt: true,
        // updatedAt: true,
        // exclude sensitive fields like password, refreshToken, etc.
      },
    });

    if (!user) {
      return NextResponse.json(
        {success: false, message: "User not found"},
        {status: 404}
      );
    }

    return NextResponse.json(
      {success: true, message: "User fetched successfully", user},
      {status: 200}
    );
  } catch (error) {
    console.error("GetUserById Error:", error);
    return NextResponse.json(
      {success: false, message: "Internal server error"},
      {status: 500}
    );
  }
}

// POST /api/users/:id
export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {id} = await params;
    if (!id) {
      return NextResponse.json(
        {success: false, message: "User ID is required"},
        {status: 400}
      );
    }

    // Example: Mark user as inactive (or clear refreshToken field if you store it)
    await prisma.user.update({
      where: {id},
      data: {isActive: false},
    });

    // Clear cookies if you’re using JWT/Session cookies
    const res = NextResponse.json(
      {success: true, message: "Logout successful. Remove token from client."},
      {status: 200}
    );

    res.cookies.set("token", "", {
      httpOnly: true, // prevent JS access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // expire immediately
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {success: false, message: "Logout failed"},
      {status: 500}
    );
  }
}

// Patch /api/users/:id
export async function PATCH(
  req: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {id} = await params;
    if (!id) {
      return NextResponse.json(
        {success: false, message: "User ID is required"},
        {status: 400}
      );
    }

    const {displayName, email, password, role = "user"} = await req.json();

    // Prepare dynamic update object
    const dataToUpdate: any = {
      ...(displayName && {displayName}),
      ...(email && {email}),
      ...(role && {role}),
      ...(password && {password: await hashPassword(password)}),
    };

    // Check if email is already used by another user
    if (email) {
      const exists = await prisma.user.findUnique({where: {email}});
      if (exists && exists.id !== id) {
        return NextResponse.json(
          {success: false, message: "Email already in use"},
          {status: 400}
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: {id},
      data: dataToUpdate,
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

    // Generate new token
    const token = await generateToken({
      email: updatedUser.email,
      displayName: updatedUser.displayName,
      id: updatedUser.id,
      role: updatedUser.role,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
        token,
      },
      {status: 200}
    );

    res.cookies.set("token", `${token}`, {
      httpOnly: true, // prevent JS access
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("UpdateUser Error:", error);
    return NextResponse.json(
      {success: false, message: "Internal server error"},
      {status: 500}
    );
  }
}
