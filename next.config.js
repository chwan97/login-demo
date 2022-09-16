/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log('Rewrites called')
    if (process.env.IS_CHWAN === 'yes') {
      return [
        {
          source: '/api/:path*',
          destination: 'https://gateway.lizhi.io/:path*',
        },
      ]
    }

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
