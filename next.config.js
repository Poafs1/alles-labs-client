/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'api.dicebear.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'lh3.googleusercontent.com',
      ...(process.env.NEXT_PUBLIC_S3_BUCKET?.split(',') || []),
    ],
  },
  output: 'standalone',
}

module.exports = nextConfig
