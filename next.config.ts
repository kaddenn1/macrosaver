import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/protein",
        destination: "/category/protein",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
