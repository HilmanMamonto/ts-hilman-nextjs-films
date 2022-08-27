/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["image.tmdb.org", "i.ytimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movie",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
