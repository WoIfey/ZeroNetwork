import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wolfey.s-ul.eu',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
}

export default nextConfig;
