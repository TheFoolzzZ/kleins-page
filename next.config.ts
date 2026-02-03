import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'fb10b3921cc049d695743eeab389fbd2.prod.enter.pro', // For project preview functionality if needed
      }
    ],
  },
};

export default nextConfig;
