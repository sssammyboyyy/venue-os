export const venueConfig = {
  // 1. BRANDING (US Style)
  name: "Fairway Systems",
  tagline: "The Operating System for Modern Golf Venues",
  description: "Automate bookings, secure deposits, and fill empty slots with AI-driven revenue operations.",
  currency: "$", 
  
  // 2. CONTACT (US Format)
  address: "Austin, TX", // Keep it vague but US-based for the demo
  mapLink: "https://maps.google.com", 
  phone: "+1 (512) 555-0123",
  email: "hello@fairwaysystems.io",
  
  // 3. HOURS
  hours: {
    weekday: { open: "09:00", close: "22:00" }, // US venues stay open later
    saturday: { open: "08:00", close: "23:00" },
    sunday: { open: "10:00", close: "20:00" }
  },

  // 4. PRICING (US Market Rates)
  pricing: {
    baseRate: 50,   // $50/hr (Solo)
    twoPlayerRate: 45, 
    threePlayerRate: 40,
    fourPlayerRate: 35, // $35 pp/hr is a great deal in the US
    clubRental: 25,     // $25 rental
    depositPercentage: 0.50, // US markets often take 50%
  },

  // 5. RESOURCES
  bays: 5, // US venues tend to be larger
  
  // 6. IMAGES
  images: {
    logo: "/images/logo-placeholder.png"
  }
}

export const OPERATING_HOURS_LOGIC: Record<number, { open: number; close: number }> = {
  0: { open: 10, close: 20 },
  1: { open: 9, close: 22 },
  2: { open: 9, close: 22 },
  3: { open: 9, close: 22 },
  4: { open: 9, close: 22 },
  5: { open: 9, close: 23 },
  6: { open: 8, close: 23 },
}