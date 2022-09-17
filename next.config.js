/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: 'https://gateway.lizhi.io/:path*',
      },
    ]
  },
}

module.exports = nextConfig
