"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCreditService } from "@/services/credit-service";
import { toast } from "@/hooks/use-toast";

interface UsePageCreditsOptions {
  pageKey: string; // Unique identifier for the page (e.g., "case-laws", "documents")
  creditCost: number; // How many credits this page costs
  description: string; // Description for the credit transaction
  redirectOnFailure?: string; // Where to redirect if credits insufficient (default: "/profile")
}

export function usePageCredits({
  pageKey,
  creditCost,
  description,
  redirectOnFailure = "/profile"
}: UsePageCreditsOptions) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasRunRef = useRef(false); // Prevent multiple executions
  const router = useRouter();
  const { spendCredits, hasEnoughCredits } = useCreditService();

  useEffect(() => {
    // Prevent multiple executions during component lifecycle
    if (hasRunRef.current) {
      return;
    }

    const checkAndChargeCredits = async () => {
      try {
        setIsLoading(true);
        
        // Use a more persistent storage key that includes the current day
        // This ensures credits are charged once per day per page, not per session
        const today = new Date().toDateString();
        const storageKey = `${pageKey}-page-access-${today}`;
        const alreadyCharged = localStorage.getItem(storageKey);
        
        if (alreadyCharged === 'true') {
          // Already charged today, just authorize
          setIsAuthorized(true);
          hasRunRef.current = true;
          return;
        }
        
        // Check if user has enough credits
        if (!hasEnoughCredits(creditCost)) {
          toast({
            title: "Insufficient Credits",
            description: `You need ${creditCost} credit(s) to access this page`,
            variant: "destructive",
          });
          router.push(redirectOnFailure);
          hasRunRef.current = true;
          return;
        }

        // Charge credits
        const success = await spendCredits(creditCost, description);
        
        if (success) {
          setIsAuthorized(true);
          localStorage.setItem(storageKey, 'true');
          
          // Clean up old entries (keep only last 7 days)
          cleanupOldEntries(pageKey);
          
          toast({
            title: "Credits Deducted",
            description: `${creditCost} credit(s) deducted for ${description.toLowerCase()}`,
            variant: "default",
          });
        } else {
          toast({
            title: "Payment Failed",
            description: "Failed to process credits. Please try again.",
            variant: "destructive",
          });
          router.push(redirectOnFailure);
        }
        
        hasRunRef.current = true;
      } catch (error) {
        console.error("Error in page credit verification:", error);
        toast({
          title: "Error",
          description: "An error occurred while processing credits",
          variant: "destructive",
        });
        router.push(redirectOnFailure);
        hasRunRef.current = true;
      } finally {
        setIsLoading(false);
      }
    };

    checkAndChargeCredits();
  }, []); // Empty dependency array - only run once

  return { isAuthorized, isLoading };
}

// Helper function to clean up old localStorage entries
function cleanupOldEntries(pageKey: string) {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${pageKey}-page-access-`)) {
        const dateString = key.replace(`${pageKey}-page-access-`, '');
        const entryDate = new Date(dateString);
        
        if (entryDate < sevenDaysAgo) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning up old localStorage entries:", error);
  }
}
