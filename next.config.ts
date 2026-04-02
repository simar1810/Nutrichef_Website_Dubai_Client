import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calo.app',
      },
      {
        protocol: 'https',
        hostname: 'cdncaloapp.com',
      },
      {
        protocol: 'https',
        hostname: 'api-blog.calo.app',
      }
    ],
  },
};

export default nextConfig;
