import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
// utt.impactcdn.com / *.impactradius-event.com serve and report on the
// Impact.com affiliate tracking script loaded in app/layout.tsx.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://*.impactcdn.com https://www.googletagmanager.com${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.impactcdn.com https://*.impactradius-event.com https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  `connect-src 'self' https://*.impactcdn.com https://*.impactradius-event.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isDevelopment ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
      {
        source: "/best/cheapest-whey-protein-per-serving",
        destination: "/best/highest-protein-whey",
        permanent: true,
      },
      {
        source: "/best/highest-protein-per-dollar",
        destination: "/best/highest-protein-concentration",
        permanent: true,
      },
      {
        source: "/best/creatine-cost-per-serving",
        destination: "/best/creatine-serving-size",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
