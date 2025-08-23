"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/components/auth-provider"

export interface Transaction {
  id: string
  orderId: string
  type: string
  credits: number
  amount: number
  status: "success" | "failed" | "pending"
  timestamp: Date | string
  description: string
  error?: {
    code: string
    description: string
  }
}

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, getTransactions } = useAuth()

  // Use useCallback to memoize the fetch function
  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      console.log("Fetching transactions for user:", user.id)
      
      // Use the auth provider's getTransactions method
      const userTransactions = await getTransactions()
      
      console.log("Fetched transactions:", userTransactions?.length || 0, "Raw:", userTransactions)
      
      if (!userTransactions || !Array.isArray(userTransactions)) {
        console.error("Invalid transactions response format:", userTransactions)
        setError("Invalid response format from server")
        setTransactions([])
        return
      }
      
      // Sort transactions by timestamp (newest first)
      const sortedTransactions = userTransactions
        .map((transaction: any) => ({
          ...transaction,
          timestamp: transaction.timestamp instanceof Date ? 
            transaction.timestamp : 
            new Date(transaction.timestamp)
        }))
        .sort((a: Transaction, b: Transaction) => {
          const dateA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp)
          const dateB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp)
          return dateB.getTime() - dateA.getTime()
        })

      setTransactions(sortedTransactions)
    } catch (err) {
      console.error("Error fetching transactions:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch transactions")
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }, [user, getTransactions]); // Include dependencies

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [user?.id, fetchTransactions]);

  const refetch = useCallback(() => {
    console.log("Manual transaction refetch triggered")
    fetchTransactions()
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refetch,
  }
}
