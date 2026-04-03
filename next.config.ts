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
        hostname: 'cdn.calo.app',
      },
      {
        protocol: 'https',
        hostname: 'api-blog.calo.app',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }
    ],
  },
};

export default nextConfig;
