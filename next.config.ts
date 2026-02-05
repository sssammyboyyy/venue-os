import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`)

const nextConfig: NextConfig = {
  /* config options here */
};

export default async function config() {
  /*
  if (process.env.NODE_ENV === "development") {
      await setupDevPlatform();
  }
  */
  return nextConfig;
}
