import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log("Creating Razorpay order...")
    
    // Check environment variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay credentials not found")
      return NextResponse.json(
        { error: "Server configuration error - Razorpay credentials missing" },
        { status: 500 }
      )
    }
    
    const { amount, currency = "INR", credits, userId } = await request.json()
    
    console.log("Order request data:", { amount, currency, credits, userId })

    if (!amount || !credits || !userId) {
      return NextResponse.json(
        { error: "Amount, credits and userId are required" },
        { status: 400 }
      )
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    
    console.log("Looking for user with ID:", userId)
    
    // Find user by id
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    console.log("User found:", user ? "Yes" : "No")
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found with ID: " + userId },
        { status: 404 }
      )
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    }

    console.log("Creating order with options:", options)

    const order = await razorpay.orders.create(options)
    
    console.log("Order created successfully:", order.id)
    
    // Create transaction record in database (initially with pending status)
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        orderId: order.id,
        amount,
        credits,
        description: `Purchased ${credits} credits`,
        status: "pending",
        type: "purchase",
        timestamp: new Date()
      }
    })
    
    console.log("Transaction record created:", transaction.id)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      credits,
      transactionId: transaction.id
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"
    
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack
    })
    
    return NextResponse.json(
      { 
        error: "Failed to create payment order", 
        details: errorMessage,
        timestamp: new Date().toISOString(),
        debug: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
