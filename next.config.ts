import type { NextConfig } from "next";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    if (!apkUrl) return [];

    return [
      {
        source: "/downloads/unipool.apk",
        destination: apkUrl,
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
    ],
  },
};

export default nextConfig;
