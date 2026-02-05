export default function SchedulePage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center py-24 px-6 font-sans">

            <div className="z-10 w-full max-w-4xl bg-white p-8 md:p-12 border border-stone-200 shadow-xl rounded-sm relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-800" />

                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Let's fix your inbox.</h1>
                    <p className="text-stone-500 font-light text-lg">
                        Select a time for your 15-minute Venue Audit.
                    </p>
                </div>

                {/* Cal.com Embed Container */}
                <div className="aspect-[16/10] w-full bg-stone-50 border border-stone-100 flex items-center justify-center rounded-sm overflow-hidden">
                    <iframe
                        src="https://cal.com/venue-engine/audit"
                        className="w-full h-full border-0"
                        title="Venue Audit"
                    />
                </div>

                {/* Fallback for Non-Tech Users */}
                <div className="text-center mt-8 pt-6 border-t border-stone-100">
                    <p className="text-stone-500 text-sm mb-2">Having trouble with the calendar?</p>
                    <a
                        href="mailto:samuel@venueengine.co?subject=Booking%20Request%20-%20Venue%20Engine"
                        className="text-amber-800 hover:text-amber-900 underline underline-offset-4 text-sm font-medium transition-colors"
                    >
                        Email us directly →
                    </a>
                </div>
            </div>
        </main>
    )
}
