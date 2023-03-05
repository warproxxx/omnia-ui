/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exchange',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

const withTM = require('next-transpile-modules')(['query-selector-shadow-dom']); // pass the modules you would like to see transpiled


module.exports = nextConfig
module.exports = withTM({});
