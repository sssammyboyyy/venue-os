import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Venue Engine - Revenue Infrastructure"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage: "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "50px",
            padding: "10px 30px",
            color: "#10b981",
            fontSize: 16,
            letterSpacing: "2px",
            marginBottom: 40,
            textTransform: "uppercase",
          }}
        >
          System Nominal • Accepting Partners
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            background: "linear-gradient(to bottom, #ffffff, #666666)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 0.9,
            textAlign: "center",
            letterSpacing: "-4px",
          }}
        >
          Revenue
          <br />
          Infrastructure.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}