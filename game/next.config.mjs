/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "out",
  output: "export",
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/, // Handle audio file types
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]", // Keep the original name and extension
          outputPath: "static/audio/", // Save in this folder during build
          publicPath: "/_next/static/audio/", // Serve from this path
        },
      },
    });

    return config;
  },
};

export default nextConfig;
