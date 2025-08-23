import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log("Payment verification started")
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      credits,
      amount,
      userId,
      transactionId, // Added to keep track of our database transaction record
    } = await request.json()

    console.log("Payment verification data:", {
      razorpay_order_id,
      razorpay_payment_id,
      credits,
      amount,
      userId,
    })

    // Check if environment variables are available
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY_KEY_SECRET not found in environment variables")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    console.log("Signature verification:", {
      expectedSignature,
      receivedSignature: razorpay_signature,
      isAuthentic,
    })

    if (!isAuthentic) {
      // If we have a transactionId, update it to failed status
      if (transactionId) {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: "failed" }
        })
      }
      
      return NextResponse.json(
        { error: "Payment verification failed - Invalid signature" },
        { status: 400 }
      )
    }
    
    // Find the user in the database by id
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      console.error("User not found with ID:", userId)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update transaction if we have a transactionId, or create one if not
    let dbTransaction;
    
    if (transactionId) {
      // Update existing transaction
      dbTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: "success"
        }
      })
    } else {
      // Create a new transaction record (fallback if transactionId isn't provided)
      dbTransaction = await prisma.transaction.create({
        data: {
          userId: user.id,
          orderId: razorpay_order_id,
          amount: Number(amount),
          credits: Number(credits),
          description: `Purchased ${credits} credits`,
          status: "success",
          type: "purchase"
        }
      })
    }
    
    // Update the user's credits
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          increment: Number(credits)
        }
      }
    })
    
    console.log("Payment verification completed successfully, transaction:", dbTransaction)
    console.log("User credits updated:", updatedUser.credits)

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      transaction: dbTransaction,
      user: {
        id: updatedUser.id,
        credits: updatedUser.credits
      }
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    
    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"
    
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
    })
    
    return NextResponse.json(
      { 
        error: "Payment verification failed", 
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
