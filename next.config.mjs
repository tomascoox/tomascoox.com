/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dlgygfs0a/image/upload/**',
            },
        ],
    },
};

export default nextConfig;
