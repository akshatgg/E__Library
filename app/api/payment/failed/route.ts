import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      error_code,
      error_description,
      credits,
      amount,
      userId,
      transactionId,
    } = await request.json()

    console.log("Recording failed payment:", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      error: error_code,
      userId
    })

    try {
      // If we have an existing transaction ID, update it
      if (transactionId) {
        const updatedTransaction = await prisma.transaction.update({
          where: { id: transactionId },
          data: {
            status: "failed",
            description: `Failed to purchase ${credits} credits: ${error_description || error_code || "Unknown error"}`
          }
        })

        return NextResponse.json({
          success: true,
          message: "Failed payment transaction updated",
          transaction: updatedTransaction
        })
      }

            // Otherwise try to create a new transaction if we have a userId
      if (userId) {
        // Find user by id
        const user = await prisma.user.findUnique({
          where: { id: userId }
        })

        if (user) {
          // Create a new failed transaction record
          const transaction = await prisma.transaction.create({
            data: {
              userId: user.id,
              orderId: razorpay_order_id || `order_failed_${Date.now()}`,
              type: "purchase",
              credits: parseInt(credits.toString()),
              amount: parseInt(amount.toString()),
              status: "failed",
              description: `Failed to purchase ${credits} credits: ${error_description || error_code || "Unknown error"}`,
              timestamp: new Date()
            }
          })

          return NextResponse.json({
            success: true,
            message: "Failed payment transaction created",
            transaction
          })
        }
      }

      // Fallback for when we can't create a transaction
      return NextResponse.json({
        success: true,
        message: "Failed payment logged (no transaction created)",
        error: {
          code: error_code,
          description: error_description
        }
      })
    } catch (dbError) {
      console.error("Database error recording failed payment:", dbError)
      
      // Still return success since we logged the error
      return NextResponse.json({
        success: true,
        message: "Failed payment logged (with database error)",
        error: {
          code: error_code,
          description: error_description
        }
      })
    }
  } catch (error) {
    console.error("Error logging failed payment:", error)
    return NextResponse.json(
      { error: "Failed to log payment failure" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
