/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

let nextConfig;

nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    POSTGRES_PRISMA_URL: process.env.DATABASE_URL,
    POSTGRES_URL_NON_POOLING: process.env.DIRECT_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
