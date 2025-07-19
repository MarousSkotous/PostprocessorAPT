/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // vypne minifikaci, aby React házel neminifikované chyby
  swcMinify: false,
};

export default nextConfig;
