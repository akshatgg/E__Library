import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { HydrationFix } from "@/components/hydration-fix"
import "./globals.css"
import AppLayouts from "@/layouts/AppLayouts"
// Initialize cron jobs
import "@/lib/cron-jobs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Library - Professional Legal Solutions",
  description: "AI-powered legal document management and case law research platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={inter.className} 
        suppressHydrationWarning
      >
        <HydrationFix />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
          <AppLayouts>
            {children}
            <Toaster />
          </AppLayouts>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
