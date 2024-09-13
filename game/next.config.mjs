/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "out",
  output: "export",
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
