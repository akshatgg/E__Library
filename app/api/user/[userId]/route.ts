import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const { userId } = params;
    
    // Find the user by ID
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: userId },
          { uid: userId }
        ]
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Don't return password hash
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      data: {
        ...userWithoutPassword,
        credits: userWithoutPassword.credits.toString()
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
