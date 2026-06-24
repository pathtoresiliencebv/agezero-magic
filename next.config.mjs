/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      // Map / and any subpath (except _next, api, files) to /magic/...
      { source: "/", destination: "/magic" },
      { source: "/:path(.*)", destination: "/magic/:path" },
    ];
  },
};
export default nextConfig;
