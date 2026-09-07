/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Build time par TypeScript errors ignore karega
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build time par ESLint warnings/errors ignore karega
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;