import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography only — see src/lib/unsplashLoader.ts. Remove
    // both entries once real property images land in /public.
    loader: "custom",
    loaderFile: "./src/lib/unsplashLoader.ts",
  },
};

export default nextConfig;
