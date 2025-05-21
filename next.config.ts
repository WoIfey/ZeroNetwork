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
    minimumCacheTTL: 2678400,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;
