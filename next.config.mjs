/** @type {import('next').NextConfig} */
const nextConfig = {
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
