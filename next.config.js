/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

let nextConfig;

if (process.env.NODE_ENV === "production") {
  nextConfig = {
    env: {
      DATABASE_URL: process.env.DATABASE_URL_PROD,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_PROD,
      GITHUB_ID: process.env.GITHUB_ID_PROD,
      GITHUB_SECRET: process.env.GITHUB_SECRET_PROD,
      NEXT_API_URL: process.env.NEXT_API_URL_PROD,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL_PROD,
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
} else {
  nextConfig = {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      NEXT_API_URL: process.env.NEXT_API_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
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
}

module.exports = withBundleAnalyzer(nextConfig);
