"use client"

import { useState } from "react"
import { venueConfig } from "@/lib/venue-config"

export default function BayStatusDisplay() {
  // DEMO MODE: Always show 3 available bays
  // We use the config to determine how many bays to show
  const bays = Array.from({ length: venueConfig.bays }, (_, i) => ({
    id: i + 1,
    status: "available",
    label: `Simulator ${i + 1}`
  }))

  return (
    <div className="w-full">
      {/* Header Badge */}
      <div className="flex justify-center mb-8">
        <div className="bg-green-600 rounded-full px-8 py-3 shadow-lg flex items-center gap-3 animate-pulse">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </div>
          <h2 className="text-white font-bold text-xl md:text-2xl tracking-wide uppercase">
            {venueConfig.bays} BAYS AVAILABLE NOW
          </h2>
        </div>
      </div>

      {/* Grid of Bays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bays.map((bay) => (
          <div
            key={bay.id}
            className="relative border-2 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-500 border-green-500 bg-green-50/50"
          >
            {/* Status Dot */}
            <div className="h-8 w-8 rounded-full mb-4 shadow-sm transition-colors duration-500 bg-green-500" />

            {/* Bay Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{bay.label}</h3>

            {/* Status Pill */}
            <span className="px-4 py-1 rounded-md text-sm font-bold text-white uppercase tracking-wider transition-colors duration-500 bg-gray-800">
              Available
            </span>

            {/* Helper Text */}
            <span className="mt-3 text-xs font-semibold text-green-700">
              Walk-ins Welcome
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}