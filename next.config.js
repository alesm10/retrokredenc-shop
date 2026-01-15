/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: pokud je web v subadresáři (např. /retrokredenc na NAS nebo /repo-name na GitHub Pages)
  // Pro lokální vývoj nechte prázdné nebo zakomentované
  // Pro NAS: basePath: '/retrokredenc'
  // Pro GitHub Pages: basePath: '/repo-name'
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // assetPrefix: pro assets (obrázky, CSS, JS) - mělo by být stejné jako basePath
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix pro cesty s mezerami
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
