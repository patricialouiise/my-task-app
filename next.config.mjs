/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c2zyebdn.cloudimg.io',
        port: '',
        pathname: '/s/cdn/x/**',
      },
      {
        protocol: 'https',
        hostname: 'divin2sy6ce0b.cloudfront.net',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
