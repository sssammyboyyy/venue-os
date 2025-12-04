import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#10b981", // Emerald 500
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          borderRadius: "4px", // Slight rounding like a microchip
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        V
      </div>
    ),
    { ...size }
  )
}