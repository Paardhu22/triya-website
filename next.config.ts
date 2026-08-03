import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography only — remove once real property images land in /public.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
