import { NextRequest, NextResponse } from "next/server"

// This is now just a redirector to the main verify endpoint
export async function POST(request: NextRequest) {
  console.log("Redirecting from verify-simple to main verify endpoint")
  
  // Forward the request to the main verify endpoint
  const response = await fetch(new URL("/api/payment/verify", request.url), {
    method: "POST",
    headers: request.headers,
    body: request.body
  })
  
  return response
}
