/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
          {
            source: '/signup',
            destination: 'https://www.everythai.net/account',
            permanent: false,
            basePath: false
          },
        ]
      },
};

export default nextConfig;