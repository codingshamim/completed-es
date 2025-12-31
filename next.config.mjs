/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.ignoreWarnings = [{ message: /Failed to parse source map/ }];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**/*.png",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**/*.jpg",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**/*.webp",
      },
      // SSLCommerz payment gateway images
      {
        protocol: "https",
        hostname: "sandbox.sslcommerz.com",
        pathname: "/gwprocess/v4/image/gw/**",
      },
    ],
  },
};

export default nextConfig;
