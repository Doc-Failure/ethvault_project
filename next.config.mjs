/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/notes',
        destination: 'http://localhost:4000/notes',
      },
      {
        source: '/api/notes/:path*',
        destination: 'http://localhost:4000/notes/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ]
  },
}

export default nextConfig
