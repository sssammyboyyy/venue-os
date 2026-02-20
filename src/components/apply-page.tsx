'use client'

import Link from 'next/link'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ApplyPage() {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <main className="min-h-screen relative flex flex-col font-sans bg-[#F5F3EF]">
            {/* ═══════════════════════════════════════════════════════════════
                 HEADER (Minimal - Logo Only)
             ═══════════════════════════════════════════════════════════════ */}
            <header className="absolute top-0 left-0 w-full p-6 z-50">
                <div className="font-serif text-xl text-[#111111] font-bold tracking-tight">
                    VenueEngine
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════════
                 HERO SECTION (High Intent)
             ═══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-16 px-6 z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 min-h-[auto]">

                {/* LEFT: Copy & CTA */}
                <div className="w-full md:w-[60%] text-left space-y-8">
                    {/* Headline */}
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#111111] max-w-3xl">
                        Let’s Fix Your Reply Speed.
                    </h1>

                    {/* Subhead */}
                    <p className="text-xl text-[#6E7074] leading-relaxed font-normal max-w-2xl">
                        In 15 minutes, you’ll see exactly how many tours you’re losing to slow responses — and whether instant replies would increase bookings.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col gap-3 w-full max-w-md items-start">
                        <Link
                            href="#calendar"
                            className="w-full h-[3.5rem] md:h-[4rem] px-8 bg-[#B87333] text-white text-lg uppercase tracking-widest hover:brightness-90 shadow-xl rounded-sm flex items-center justify-center transition-all hover:scale-[1.02] font-semibold"
                        >
                            Book Your 15-Min Venue Audit
                        </Link>
                        {/* Micro-risk Reducer */}
                        <span className="text-xs text-[#6E7074] font-medium ml-1">
                            No pitch. Just data.
                        </span>
                    </div>

                    {/* Credibility Block */}
                    <div className="space-y-1 pt-4 border-t border-[#E5E2DC] max-w-xs">
                        <p className="text-sm text-[#111111] font-medium">127+ venue reply-time analysis</p>
                        <p className="text-sm text-[#111111] font-medium">Designed for independent venues</p>
                        <p className="text-sm text-[#111111] font-medium">Works with Gmail & Outlook</p>
                    </div>
                </div>

                {/* RIGHT: Visual / Placeholder on Desktop - Hidden on Mobile to prioritize Calendar */}
                <div className="hidden md:block w-full md:w-[40%]">
                    {/* Optional: Simple visual or negative space for calm */}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 CALENDAR SECTION
             ═══════════════════════════════════════════════════════════════ */}
            <section id="calendar" className="w-full px-6 mb-12 z-10 scroll-mt-24">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl text-[#111111] mb-2">
                        Choose a time below.
                    </h2>
                    <p className="text-[#6E7074]">
                        You’ll leave knowing exactly where revenue is leaking.
                    </p>
                </div>

                <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-[#E5E2DC] min-h-[600px]">
                    <Cal
                        namespace="audit"
                        calLink="venue-engine/audit"
                        style={{ width: "100%", height: "100%", overflow: "scroll" }}
                        config={{ "layout": "month_view" }}
                    />
                </div>
                <div className="text-center mt-6 text-sm text-[#6E7074]">
                    Average audit length: 15 minutes | Hosted on Google Meet
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 REVENUE CONTRAST SECTION
             ═══════════════════════════════════════════════════════════════ */}
            <section className="w-full px-6 mb-24 z-10">
                <div className="max-w-2xl mx-auto text-center space-y-4 py-12 border-t border-[#E5E2DC]">
                    <p className="text-lg text-[#111111]">If you receive <span className="font-bold">40 inquiries/month</span></p>
                    <p className="text-lg text-[#111111]">And <span className="font-bold">20%</span> go elsewhere due to slow reply</p>
                    <p className="text-lg text-[#B87333] font-bold">That’s 8 lost tours.</p>
                    <p className="text-lg text-[#111111]">At <span className="font-bold">$4,000</span> average deposit…</p>
                    <p className="text-2xl md:text-3xl font-serif text-[#111111] pt-2">That’s <span className="font-bold border-b-2 border-[#B87333]">$32,000</span> in monthly exposure.</p>
                    <p className="text-lg text-[#111111] font-bold pt-8">
                        <span className="text-[#B87333]">14-second</span> replies eliminate that delay.
                    </p>
                </div>
            </section>

        </main>
    )
}
