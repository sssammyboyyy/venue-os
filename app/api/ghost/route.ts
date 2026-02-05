import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST() {
  // 1. Simulate "AI Thinking" delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // 2. Generate Fake Revenue Data
  const recoveredAmount = Math.floor(Math.random() * (120 - 45 + 1) + 45);
  
  // 3. Return the "Event" for the frontend to render
  return NextResponse.json({
    success: true,
    event: {
      id: Math.random().toString(36).substring(7),
      type: "RECOVERY",
      source: "GHOST_PROTOCOL",
      message: `Waitlist Auto-Filled: Slot 14:00 ($${recoveredAmount} captured)`,
      timestamp: new Date().toISOString(),
      revenue: recoveredAmount
    }
  })
}