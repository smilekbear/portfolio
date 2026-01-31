import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output:"standalone",
    images: {
        remotePatterns: [
            // knowledge bucket
            {
                protocol: "https",
                hostname: "smilekbear-knowledge.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**",
            },
            // profile bucket
            {
                protocol: "https",
                hostname: "smilekbear.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**",
            },
        ],
        // fallback
        domains: [
            "smilekbear-knowledge.s3.ap-northeast-2.amazonaws.com",
            "smilekbear.s3.ap-northeast-2.amazonaws.com",
        ],
    },
};

export default nextConfig;