'use client'

import { useState } from 'react'
import Link from 'next/link'
import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export default function ApplyPage() {
    const [step, setStep] = useState<'form' | 'calendar' | 'disqualified'>('form')
    const [volume, setVolume] = useState('')
    const [bottleneck, setBottleneck] = useState('')

    // Safety constraint: Continue button is strictly disabled until both are chosen
    const canContinue = volume !== '' && bottleneck !== ''

    useEffect(() => {
        if (step === 'calendar') {
            (async function () {
                const cal = await getCalApi({});
                cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
            })();
        }
    }, [step]);

    const handleContinue = () => {
        if (!canContinue) return;

        // Qualification Logic (Time Protection Mode)
        if (volume === '0-5' || volume === '6-20') {
            setStep('disqualified');
        } else {
            setStep('calendar');
        }
    }

    return (
        <main className="min-h-screen relative flex flex-col font-sans bg-[#F5F3EF] items-center justify-center p-6">
            {/* Minimal Header */}
            <header className="absolute top-0 left-0 w-full p-6 z-50">
                <Link href="/" className="font-serif text-xl text-[#111111] font-bold tracking-tight hover:opacity-80 transition-opacity">
                    VenueEngine
                </Link>
            </header>

            {/* ═══════════════════════════════════════════════════════════════
                 STEP 1: MICRO-APPLY (Qualification State)
             ═══════════════════════════════════════════════════════════════ */}
            {step === 'form' && (
                <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#E5E2DC] z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-10">
                        <h1 className="font-serif text-3xl md:text-4xl text-[#111111] mb-3 leading-tight">
                            See If Instant Replies Will Increase Your Bookings
                        </h1>
                        <p className="text-[#6E7074] text-base">
                            Let's see if our response architecture fits your current inquiry volume.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Question 1 */}
                        <div className="space-y-2 text-left">
                            <label htmlFor="volume" className="block text-sm font-semibold text-[#111111] tracking-wide">
                                How many weddings do you host annually?
                            </label>
                            <select
                                id="volume"
                                aria-label="Annual wedding volume"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="w-full p-4 bg-[#F5F3EF] border border-[#E5E2DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all text-[#111111]"
                            >
                                <option value="" disabled>Select your volume...</option>
                                <option value="0-5">0–5</option>
                                <option value="6-20">6–20</option>
                                <option value="20-50">20–50</option>
                                <option value="50+">50+</option>
                            </select>
                        </div>

                        {/* Question 2 */}
                        <div className="space-y-2 text-left">
                            <label htmlFor="bottleneck" className="block text-sm font-semibold text-[#111111] tracking-wide">
                                What’s your biggest inquiry bottleneck?
                            </label>
                            <select
                                id="bottleneck"
                                aria-label="Biggest inquiry bottleneck"
                                value={bottleneck}
                                onChange={(e) => setBottleneck(e.target.value)}
                                className="w-full p-4 bg-[#F5F3EF] border border-[#E5E2DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all text-[#111111]"
                            >
                                <option value="" disabled>Select your biggest issue...</option>
                                <option value="Slow replies">Slow replies</option>
                                <option value="Too many ghosted leads">Too many ghosted leads</option>
                                <option value="Leads not booking tours">Leads not booking tours</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Primary CTA (Disabled State Managed) */}
                        <div className="pt-4">
                            <button
                                onClick={handleContinue}
                                disabled={!canContinue}
                                className={`w-full min-h-[52px] rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 ${canContinue
                                    ? 'bg-[#B87333] text-white hover:brightness-90 hover:scale-[1.01] shadow-lg cursor-pointer'
                                    : 'bg-[#E5E2DC] text-[#6E7074] cursor-not-allowed opacity-70'
                                    }`}
                            >
                                Continue &rarr; Check Availability
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                 DISQUALIFICATION STATE (Safety/Time Protection)
             ═══════════════════════════════════════════════════════════════ */}
            {step === 'disqualified' && (
                <div className="w-full max-w-lg text-center p-8 z-10 animate-in fade-in zoom-in-95 duration-500">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#111111] mb-4">
                        We’re right-sized for venues hosting 20+ weddings annually.
                    </h2>
                    <p className="text-lg text-[#6E7074] leading-relaxed mb-8">
                        As you scale and your inquiry pool grows, instant reply systems become significantly more impactful to your bottom line. Feel free to revisit when your volume increases.
                    </p>
                    <button
                        onClick={() => { setStep('form'); setVolume(''); setBottleneck(''); }}
                        className="text-[#B87333] hover:underline font-medium"
                    >
                        ← Start over
                    </button>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                 STEP 2: CONDITIONAL CALENDAR (Commitment State)
             ═══════════════════════════════════════════════════════════════ */}
            {step === 'calendar' && (
                <div className="w-full max-w-4xl mx-auto flex flex-col pt-16 md:pt-24 pb-20 z-10 overflow-x-hidden animate-in fade-in duration-700">
                    {/* State Reset Control */}
                    <div className="w-full mb-6">
                        <button
                            onClick={() => setStep('form')}
                            className="text-[#6E7074] hover:text-[#111111] text-sm font-semibold transition-colors flex items-center gap-1"
                        >
                            &larr; Back
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-sm md:text-base text-[#B87333] uppercase tracking-widest font-bold mb-3">
                            Based on your volume, instant replies could materially increase booked tours.
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#111111] mb-2">
                            Choose a time below.
                        </h2>
                        <p className="text-[#6E7074]">
                            You’ll leave knowing exactly where revenue is leaking.
                        </p>
                    </div>

                    {/* Calendar Embed Safety Constraint */}
                    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-[#E5E2DC] h-auto sm:min-w-[360px]">
                        <Cal
                            namespace="audit"
                            calLink="venue-engine/audit"
                            style={{ width: "100%", overflow: "scroll" }}
                            config={{ "layout": "month_view" }}
                        />
                    </div>

                    {/* Revenue Contrast (Compact) */}
                    <div className="max-w-xl mx-auto text-center space-y-1 mt-12 pt-8 border-t border-[#E5E2DC]">
                        <p className="text-sm text-[#111111]">* If you receive 40 inquiries/month</p>
                        <p className="text-sm text-[#111111]">And 20% go elsewhere due to slow reply</p>
                        <p className="text-sm font-semibold text-[#111111]">That’s 8 lost tours.</p>
                        <p className="text-sm text-[#111111] mt-2 block">At $4,000 average deposit…</p>
                        <p className="text-base font-bold text-[#111111]">That’s $32,000 in monthly exposure.</p>
                        <p className="text-sm font-semibold text-[#B87333] mt-3">
                            14-second replies eliminate that delay.
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}
