/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tomas granskar via Tailscale-hostnamnet (cooxhub:3000) — utan denna
  // blockeras _next-chunksen cross-origin och sidan blir vit.
  allowedDevOrigins: ['cooxhub'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dlgygfs0a/**' },
    ],
  },
};

export default nextConfig;
