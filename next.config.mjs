/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'http://103.xxx.xxx.xxx:8080/:path*', // Ganti dengan IP & port backend Fajar
      },
    ]
  },
};

export default nextConfig;
