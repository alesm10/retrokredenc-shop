/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ['image/webp'],
    qualities: [60, 75],
    minimumCacheTTL: 86400,
  },
}

module.exports = nextConfig
