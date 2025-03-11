/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:state',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 