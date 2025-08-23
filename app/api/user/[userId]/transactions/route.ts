import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // We'll trust the client has sent the correct user ID
    // In a production app, you should validate authentication with a token check
    // or implement middleware for this
    
    const { userId } = params;
    
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Get user's transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
    
    return NextResponse.json({
      success: true,
      data: transactions.map(t => ({
        id: t.id,
        orderId: t.orderId,
        amount: t.amount,
        credits: t.credits,
        description: t.description,
        status: t.status,
        type: t.type,
        timestamp: t.timestamp
      }))
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch transactions",
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
