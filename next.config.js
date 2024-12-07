/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }];
        return config;
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
}

module.exports = nextConfig 