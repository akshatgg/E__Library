"use client";

import {useState} from "react";
import {useAuth} from "@/components/auth-provider";
import {useToast} from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  credits: number;
  amount: number;
  onSuccess?: (transaction: any) => Promise<void>;
}

interface Transaction {
  id: string;
  orderId: string;
  type: string;
  credits: number;
  amount: number;
  status: "success" | "failed" | "pending";
  timestamp: Date;
  description: string;
  error?: {
    code: string;
    description: string;
  };
}

export function useRazorpay() {
  const {user} = useAuth();
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async ({credits, amount, onSuccess}: PaymentOptions) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to make a purchase",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      // Create order
      console.log("Creating order with user ID:", user.id);
      
      const orderPayload = {
        amount,
        credits,
        userId: user.id,
      };
      
      console.log("Order payload:", orderPayload);
      
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.error("Order creation failed:", errorData);
        throw new Error(errorData.error || errorData.details || "Failed to create payment order");
      }

      const orderData = await orderResponse.json();
      console.log("Order created successfully:", orderData);

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "E-Library Credits",
        description: `Purchase ${credits} credits`,
        order_id: orderData.orderId,
        prefill: {
          name: user.displayName || "User",
          email: user.email || "",
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async function (response: any) {
          try {
            console.log("Payment success response:", response);

            // Use a single verification endpoint - no fallbacks
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                credits,
                amount,
                userId: user.id,
                transactionId: orderData.transactionId,
              }),
            });

            console.log("Verify response status:", verifyResponse.status);

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              console.error("Payment verification failed:", errorData);
              throw new Error(
                errorData.details ||
                  errorData.error ||
                  "Payment verification failed"
              );
            }

            const verifyData = await verifyResponse.json();
            console.log("Payment verification successful:", verifyData);

            toast({
              title: "Payment Successful!",
              description: `${credits} credits have been added to your account`,
            });

            console.log("Credits added in the backend successfully");

            // Create transaction data from the verification response
            const transactionData = verifyData.transaction || {
              id: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              type: "purchase" as const,
              credits: credits,
              amount: amount,
              status: "success" as const,
              description: `Purchased ${credits} credits`,
            };

            // Call onSuccess callback if provided
            if (onSuccess) {
              console.log("Calling onSuccess callback...");
              await onSuccess(transactionData);
            }

            return verifyData.transaction;
          } catch (error) {
            console.error("Payment verification error:", error);
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error occurred";

            toast({
              title: "Payment Verification Failed",
              description: `Error: ${errorMessage}. Please contact support if credits were not added.`,
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: async function () {
            // Log failed/cancelled payment
            await fetch("/api/payment/failed", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: orderData.orderId,
                error_code: "USER_CANCELLED",
                error_description: "Payment cancelled by user",
                credits,
                amount,
                userId: user.id,
                transactionId: orderData.transactionId,
              }),
            });

            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled by user",
              variant: "destructive",
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response: any) {
        // Log failed payment
        await fetch("/api/payment/failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.error.metadata.order_id,
            razorpay_payment_id: response.error.metadata.payment_id,
            error_code: response.error.code,
            error_description: response.error.description,
            credits,
            amount,
            userId: user.id,
            transactionId: orderData.transactionId,
          }),
        });

        toast({
          title: "Payment Failed",
          description:
            response.error.description || "Payment failed. Please try again.",
          variant: "destructive",
        });
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makePayment,
    isLoading,
  };
}
