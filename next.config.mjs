/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external images if needed in the future
    remotePatterns: [],
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
