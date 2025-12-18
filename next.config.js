/** @type {import('next').NextConfig} */
const nextConfig = {
  // Asegurar que las variables de entorno estén disponibles
  env: {
    NEXT_PUBLIC_CULQI_PUBLIC_KEY: process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'github.com'
      },
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org'
      }
    ]
  }
};

module.exports = nextConfig;


