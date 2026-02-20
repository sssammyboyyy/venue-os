'use client'

import Link from 'next/link'
import { SMSProof } from '@/components/ui/sms-proof'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function LandingPage() {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <main className="min-h-screen bg-stone-50 relative font-sans text-stone-900">
            {/* CSS Noise Overlay */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                 HERO SECTION V2 - "Lethal" Conversion Architecture
             ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-16 pb-16 px-6 z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-12 min-h-[600px] md:min-h-[auto] max-h-[85vh]">

                {/* LEFT: Copy & CTAs (55%) */}
                <div className="w-full md:w-[55%] text-left flex flex-col justify-center space-y-8">
                    {/* Headline */}
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-primary max-w-2xl">
                        Stop Losing <span className="text-accent italic">$3,000–$5,000</span> Wedding Deposits to Slow Email Replies.
                    </h1>

                    {/* Subhead - Rhythmic Hierarchy */}
                    <div className="space-y-1 max-w-xl">
                        <p className="text-xl text-primary leading-snug font-normal">
                            Venues replying within 5 minutes book 3x more tours.
                        </p>
                        <p className="text-sm text-muted opacity-80 font-medium">
                            Based on reply-time analysis across 127+ independent venues.
                        </p>
                        <p className="text-lg text-primary font-bold pt-1">
                            Venue Engine replies in <span className="text-accent">14 seconds</span> — automatically.
                        </p>
                    </div>

                    {/* CTAs - Dominance Enforced */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-full max-w-md md:max-w-none items-start pt-2">
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <Link
                                href="#calendar"
                                className="w-full md:w-auto h-[3.5rem] md:h-[4rem] px-8 bg-accent text-accent-foreground text-lg uppercase tracking-widest hover:brightness-90 shadow-xl rounded-sm flex items-center justify-center transition-all hover:scale-[1.02] font-semibold"
                            >
                                Book Your 15-Min Venue Audit
                            </Link>
                            <span className="text-xs text-muted font-medium ml-1">
                                No sales pitch. Just data on where you're losing bookings.
                            </span>
                        </div>

                        <Link
                            href="#how-it-works"
                            className="w-full md:w-auto h-[3.5rem] md:h-[4rem] px-8 bg-transparent border border-primary text-primary text-lg uppercase tracking-widest hover:bg-secondary/20 rounded-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100"
                        >
                            See How It Works
                        </Link>
                    </div>

                    <p className="text-xs text-primary/60 font-medium pt-4 border-t border-border/50 max-w-xs">
                        Works with Gmail, Outlook, and your existing inbox.
                    </p>

                </div>

                {/* RIGHT: SMS Proof (45%) */}
                <div className="w-full md:w-[45%] flex flex-col items-center">
                    <div className="w-full max-w-sm mx-auto shadow-2xl rounded-3xl overflow-hidden md:transform md:scale-105">
                        <SMSProof />
                    </div>

                    {/* Founder Credibility - Understated */}
                    <div className="mt-6 w-full max-w-sm mx-auto text-left pl-2">
                        <span className="text-sm text-muted font-medium opacity-80">
                            Built by a venue systems operator.
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 REVENUE LOSS CALCULATOR (Financial Wake-up Call)
             ═══════════════════════════════════════════════════════════════ */}
            <section className="w-full px-6 mb-24 z-10">
                <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <h3 className="font-serif text-3xl text-primary">How Much Is <span className="italic text-destructive">Slow Speed</span> Costing You?</h3>
                        <div className="space-y-3 text-base text-muted/90 font-medium">
                            <p>If you receive <span className="font-bold text-primary border-b-2 border-primary/10">40 inquiries</span> per month...</p>
                            <p>And <span className="font-bold text-primary border-b-2 border-primary/10">20%</span> go elsewhere due to slow reply...</p>
                            <p>That’s <span className="font-bold text-destructive">8 lost tours</span>.</p>
                        </div>
                    </div>

                    <div className="w-full h-px md:w-px md:h-32 bg-border"></div>

                    <div className="flex-1 text-center md:text-right space-y-2">
                        <div className="text-sm text-muted mb-1 uppercase tracking-widest font-bold">At $4,000 Average Deposit</div>
                        <div className="text-5xl md:text-6xl font-serif text-primary tracking-tighter">$32,000</div>
                        <div className="text-xs uppercase tracking-widest text-destructive font-bold">Lost Revenue / Month</div>
                        <p className="text-sm text-primary font-bold mt-4 pt-4 border-t border-border/50">
                            That’s what 14-second replies recover.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                VIDEO SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section id="how-it-works" className="w-full px-6 mb-24 z-10 scroll-mt-32">
                <div className="max-w-4xl mx-auto text-center mb-6">
                    <h3 className="font-serif text-2xl text-stone-900">How It Works (90 Seconds)</h3>
                </div>

                <div className="relative w-full max-w-4xl mx-auto aspect-video bg-stone-100 rounded-sm overflow-hidden shadow-2xl border border-stone-300">
                    <iframe
                        src="https://www.youtube.com/embed/MngcmTzWzeQ?rel=0&modestbranding=1"
                        title="Watch: Venue Engine Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8 text-stone-600 font-medium text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> Built for independent venues
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> Works with your existing inbox
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> No new software to learn
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 CALENDAR SECTION
             ═══════════════════════════════════════════════════════════════ */}
            <section id="calendar" className="py-24 px-6 text-center z-10 w-full bg-white border-t border-stone-100">
                <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4 tracking-tight">
                    See exactly how many tours you're losing to slow replies.
                </h2>
                <p className="text-stone-500 mb-12">No sales pitch. Just data.</p>

                <div className="w-full max-w-4xl mx-auto bg-stone-50 rounded-xl shadow-inner overflow-hidden border border-stone-200 min-h-[600px]">
                    <Cal
                        namespace="audit"
                        calLink="venue-engine/audit"
                        style={{ width: "100%", height: "100%", overflow: "scroll" }}
                        config={{ "layout": "month_view" }}
                    />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════════ */}
            <footer className="py-12 px-6 border-t border-stone-200 bg-stone-50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-serif text-xl text-stone-900">VenueEngine</div>
                    <div className="text-sm text-stone-400">
                        © 2026 VenueEngine. The Anti-Ghosting Patch.
                    </div>
                </div>
            </footer>
        </main>
    )
}
