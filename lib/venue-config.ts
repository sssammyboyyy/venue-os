import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

export const venueConfig = {
  // 1. BRANDING & IDENTITY
  name: "Fairway Systems",
  tagline: "The Operating System for Modern Golf Venues",
  description: "Automate bookings, secure deposits, and fill empty slots with AI-driven revenue operations.",
  
  // 2. LOCALIZATION (Toggle this for US vs SA demos)
  locale: "en-US", // Change to "en-ZA" for South Africa
  currency: "USD", // Change to "ZAR" for South Africa
  timezone: "America/Chicago", // Change to "Africa/Johannesburg"

  // 3. CONTACT
  address: "Austin, TX",
  mapLink: "https://maps.google.com",
  phone: "+1 (512) 555-0123",
  email: "demo@venue-engine.com",

  // 4. BUSINESS LOGIC
  bays: 5,
  depositPercentage: 0.40, 
  
  // 5. PRICING (US Market Rates)
  pricing: {
    baseRate: 60,    // $60/hr
    peakRate: 85,    // $85/hr
    clubRental: 25,
    coaching: 120,
    fourPlayerRate: 35, // Per person
    threePlayerRate: 45, // Per person
  },

  // 6. OPERATING HOURS
  hours: {
    0: { open: 10, close: 22 },
    1: { open: 9, close: 22 },
    2: { open: 9, close: 22 },
    3: { open: 9, close: 22 },
    4: { open: 9, close: 23 },
    5: { open: 9, close: 24 },
    6: { open: 8, close: 24 },
  },
  
  images: {
    logo: "/icon.svg"
  }
}

// --- THIS IS THE EXPORT YOU WERE MISSING ---
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(venueConfig.locale, {
    style: 'currency',
    currency: venueConfig.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}