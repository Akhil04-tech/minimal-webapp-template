/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Required for Docker deployment: produces a self-contained server.js + minimal node_modules
  output: 'standalone',
}

module.exports = nextConfig
