"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar, Users, CreditCard, ArrowRight, Loader2, AlertCircle, Trophy } from "lucide-react"

// Helper to wrap search params for Next.js 15
function BookingDetails() {
  const searchParams = useSearchParams()
  
  // State
  const [isProcessing, setIsProcessing] = useState(false)
  const [payFullAmount, setPayFullAmount] = useState(false)
  const [couponCode, setCouponCode] = useState("") 
  const [error, setError] = useState<string | null>(null)

  // Hardcoded Guest Info
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")

  // Extract Params
  const sessionType = searchParams.get("sessionType") || ""
  const players = Number(searchParams.get("players")) || 1
  const dateStr = searchParams.get("date") || ""
  const timeSlot = searchParams.get("timeSlot") || ""
  const duration = Number(searchParams.get("duration")) || 1
  const golfClubRental = searchParams.get("golfClubRental") === "true"
  const coachingSession = searchParams.get("coachingSession") === "true"

  // --- CALCULATION LOGIC ---
  const calculateTotal = () => {
    let basePrice = 0
    // DEMO PRICING: Adjusted numbers slightly to look realistic for US Market ($)
    if (sessionType === "4ball") basePrice = 80 * 4 * duration 
    else if (sessionType === "3ball") basePrice = 90 * 3 * duration
    else {
      // Quick Play Fallback
      const pricing = { 1: 120, 2: 100, 3: 90, 4: 80 }
      const rate = pricing[Math.min(players, 4) as keyof typeof pricing] || 120
      basePrice = rate * players * duration
    }
    
    if (golfClubRental) basePrice += 40
    if (coachingSession) basePrice += 100
    return basePrice
  }

  const total = calculateTotal()
  
  // Deposit Logic
  const isDepositEligible = sessionType.includes("ball") || sessionType.includes("famous")
  const depositAmount = Math.ceil(total * 0.40)
  
  // Checkbox Toggle
  const amountDueNow = (isDepositEligible && !payFullAmount) ? depositAmount : total
  const amountDueLater = total - amountDueNow

  const handlePayment = async () => {
    if (!guestName || !guestEmail || !guestPhone) {
      setError("Please fill in your details.")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_date: dateStr,
          start_time: timeSlot,
          duration_hours: duration,
          player_count: players,
          session_type: sessionType,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          total_price: total,
          pay_full_amount: payFullAmount,
          coupon_code: couponCode,
          enter_competition: false, 
          accept_whatsapp: true
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = "Server Error"
        try {
           const errorJson = JSON.parse(errorText)
           errorMessage = errorJson.error || errorMessage
        } catch {
           errorMessage = `Error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else if (data.free_booking) {
         window.location.href = `/booking/success?bookingId=${data.booking_id}`
      } else {
        throw new Error("No payment redirect found")
      }

    } catch (err: any) {
      console.error("Payment Error:", err)
      setError(err.message || "Payment initialization failed")
    } finally {
      setIsProcessing(false) 
    }
  }

  const sessionLabel = sessionType === "4ball" ? "4-Ball Special" : 
                       sessionType === "3ball" ? "3-Ball Special" : "Quick Play"

  return (
    // MAIN CONTAINER - DARK THEME APPLIED
    <div className="max-w-3xl mx-auto p-4 space-y-8 pb-24 text-zinc-100">
      <div className="text-center mb-8 pt-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Confirm Booking
        </h1>
        <p className="text-zinc-400 mt-2">Finalize your session details</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT COL: Details & Input */}
        <div className="space-y-6">
          
          {/* SESSION CARD */}
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3 border-b border-zinc-800/50">
              <CardTitle className="text-lg flex items-center gap-2 text-zinc-100">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm pt-4">
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Date</span>
                <span className="font-medium text-zinc-200">{dateStr}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Time</span>
                <span className="font-medium text-zinc-200">{timeSlot} ({duration} hrs)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Type</span>
                <span className="font-medium text-emerald-400">{sessionLabel}</span>
              </div>
            </CardContent>
          </Card>

          {/* GUEST DETAILS CARD */}
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm shadow-xl">
             <CardHeader className="pb-3 border-b border-zinc-800/50">
              <CardTitle className="text-lg flex items-center gap-2 text-zinc-100">
                <Users className="w-5 h-5 text-emerald-400" />
                Guest Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 uppercase ml-1">Name</label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-zinc-600"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 uppercase ml-1">Email</label>
                <input 
                  type="email" 
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-zinc-600"
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 uppercase ml-1">Phone</label>
                <input 
                  type="tel" 
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-zinc-600"
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

           {/* PROMO CODE CARD */}
           <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3 border-b border-zinc-800/50">
              <CardTitle className="text-lg flex items-center gap-2 text-zinc-100">
                <Trophy className="w-5 h-5 text-amber-500" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 uppercase placeholder:normal-case placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
                  placeholder="Enter code (e.g. SAVE10)"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COL: Payment */}
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800 shadow-2xl relative overflow-hidden">
            {/* Top Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2 text-white">
                <CreditCard className="w-6 h-6 text-emerald-400" />
                Payment Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* CHECKBOX LOGIC - FIXED DARK MODE */}
              {isDepositEligible && (
                <div className="bg-zinc-800/40 p-4 rounded-xl border border-zinc-700/50">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      id="payFull" 
                      checked={payFullAmount}
                      onChange={(e) => setPayFullAmount(e.target.checked)}
                      className="mt-1 w-5 h-5 text-emerald-500 bg-zinc-900 border-zinc-600 rounded focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <span className="block text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                        Pay full amount now?
                      </span>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Pay ${total} now and settle nothing in store.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              <div className="h-px bg-zinc-800 w-full" />

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-semibold text-lg text-zinc-200">Due Now</span>
                  <span className="font-bold text-3xl text-white">${amountDueNow.toFixed(2)}</span>
                </div>
                
                {amountDueLater > 0 && (
                   <div className="flex justify-between items-center text-sm font-medium bg-amber-950/30 border border-amber-900/50 px-4 py-3 rounded-lg">
                    <span className="text-amber-500">Due in Store</span>
                    <span className="text-amber-400 text-lg">${amountDueLater.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 pb-6">
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${amountDueNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {error && (
            <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-zinc-950 text-emerald-500">Loading...</div>}>
      <BookingDetails />
    </Suspense>
  )
}