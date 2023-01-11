/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'glgnb01.imghost.cafe24.com',
        port: '',
        pathname: '/msdepart/**',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
