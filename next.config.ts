import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/laravel-tips",
  images: { unoptimized: true },
};

export default nextConfig;
