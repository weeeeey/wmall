/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON/:path*`,
            },
        ];
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

module.exports = nextConfig;
