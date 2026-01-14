/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/retrokredenc/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
