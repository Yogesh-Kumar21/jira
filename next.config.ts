import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  },
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'hv3hs8jv76.ufs.sh',
      port: '',
      pathname: '/f/**'
    },
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      port: '',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'placehold.co',
      port: '',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'jira.atlassian.com',
      port: '',
      pathname: '/**'
    }
  ]
  }
};

export default nextConfig;
