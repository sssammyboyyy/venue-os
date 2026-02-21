'use client'

import { useState, useEffect } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"

export function MicroApplyFunnel() {
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
        <section id="calendar" className="py-24 px-6 relative w-full bg-stone-50 border-t border-stone-200">
            {/* ═══════════════════════════════════════════════════════════════
                 STEP 1: MICRO-APPLY (Qualification State)
             ═══════════════════════════════════════════════════════════════ */}
            {step === 'form' && (
                <div className="w-full max-w-lg mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-200 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-3 leading-tight tracking-tight">
                            See If Instant Replies Will Increase Your Bookings
                        </h2>
                        <p className="text-stone-500 text-base">
                            Let's see if our response architecture fits your current inquiry volume.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Question 1 */}
                        <div className="space-y-2 text-left">
                            <label htmlFor="volume" className="block text-sm font-semibold text-stone-900 tracking-wide">
                                How many weddings do you host annually?
                            </label>
                            <select
                                id="volume"
                                aria-label="Annual wedding volume"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all text-stone-900"
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
                            <label htmlFor="bottleneck" className="block text-sm font-semibold text-stone-900 tracking-wide">
                                What’s your biggest inquiry bottleneck?
                            </label>
                            <select
                                id="bottleneck"
                                aria-label="Biggest inquiry bottleneck"
                                value={bottleneck}
                                onChange={(e) => setBottleneck(e.target.value)}
                                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all text-stone-900"
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
                                    ? 'bg-amber-700 text-white hover:bg-amber-800 hover:scale-[1.01] shadow-lg cursor-pointer'
                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-70'
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
                <div className="w-full max-w-lg mx-auto text-center py-12 px-6 bg-white rounded-2xl shadow-xl border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-500">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 tracking-tight">
                        We’re right-sized for venues hosting 20+ weddings annually.
                    </h2>
                    <p className="text-lg text-stone-500 leading-relaxed mb-8">
                        As you scale and your inquiry pool grows, instant reply systems become significantly more impactful to your bottom line. Feel free to revisit when your volume increases.
                    </p>
                    <button
                        onClick={() => { setStep('form'); setVolume(''); setBottleneck(''); }}
                        className="text-amber-700 hover:underline font-medium"
                    >
                        ← Start over
                    </button>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                 STEP 2: CONDITIONAL CALENDAR (Commitment State)
             ═══════════════════════════════════════════════════════════════ */}
            {step === 'calendar' && (
                <div className="w-full max-w-4xl mx-auto flex flex-col z-10 overflow-x-hidden animate-in fade-in duration-700">
                    {/* State Reset Control */}
                    <div className="w-full mb-6">
                        <button
                            onClick={() => setStep('form')}
                            className="text-stone-500 hover:text-stone-900 text-sm font-semibold transition-colors flex items-center gap-1"
                        >
                            &larr; Back
                        </button>
                    </div>

                    <div className="text-center mb-10">
                        <p className="text-sm md:text-base text-amber-700 uppercase tracking-widest font-bold mb-3">
                            Based on your volume, instant replies could materially increase booked tours.
                        </p>
                        <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4 tracking-tight">
                            Choose a time below.
                        </h2>
                        <p className="text-stone-500">
                            You’ll leave knowing exactly where revenue is leaking.
                        </p>
                    </div>

                    {/* Calendar Embed Safety Constraint */}
                    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-stone-200 h-auto sm:min-w-[360px]">
                        <Cal
                            namespace="audit"
                            calLink="venue-engine/audit"
                            style={{ width: "100%", overflow: "scroll" }}
                            config={{ "layout": "month_view" }}
                        />
                    </div>

                    {/* Revenue Contrast (Compact) */}
                    <div className="max-w-xl mx-auto text-center space-y-1 mt-12 pt-8 border-t border-stone-300">
                        <p className="text-sm text-stone-900">* If you receive 40 inquiries/month</p>
                        <p className="text-sm text-stone-900">And 20% go elsewhere due to slow reply</p>
                        <p className="text-sm font-semibold text-stone-900">That’s 8 lost tours.</p>
                        <p className="text-sm text-stone-900 mt-2 block">At $4,000 average deposit…</p>
                        <p className="text-base font-bold text-stone-900">That’s $32,000 in monthly exposure.</p>
                        <p className="text-sm font-semibold text-amber-700 mt-3">
                            14-second replies eliminate that delay.
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}
