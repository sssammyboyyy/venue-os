export function SMSProof() {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden font-sans transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* iOS Header */}
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center text-xs font-bold text-stone-500">
                        JS
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-stone-900 leading-none">Jessica Smith</span>
                        <span className="text-[10px] text-stone-400">Wedding Inquiry</span>
                    </div>
                </div>
                <div className="text-[10px] text-stone-300">Today 9:41 AM</div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 bg-white min-h-[220px]">

                {/* Lead Message */}
                <div className="flex flex-col items-start max-w-[85%]">
                    <div className="bg-stone-100 text-stone-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                        Hi, do you have any Saturdays left in Oct 2026?
                    </div>
                    <div className="text-[10px] text-stone-300 mt-1 ml-1">Delivered 9:41 AM</div>
                </div>

                {/* Automated Reply */}
                <div className="flex flex-col items-end max-w-[90%] ml-auto">
                    <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-md text-sm">
                        Hi Jessica! Yes, we have Oct 3 and Oct 24 open. Want me to send over the pricing guide? - Venue Engine
                    </div>
                    <div className="flex items-center gap-1 mt-1 mr-1">
                        <span className="text-[10px] text-stone-400 font-medium">Sent instantly</span>
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
