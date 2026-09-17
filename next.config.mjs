/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images in /public — no remote patterns needed for stock we downloaded
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
