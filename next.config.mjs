/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkmlp0ntaheyltso.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
