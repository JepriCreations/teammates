/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    // SVGR Next js config
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: 24 } }],
    })

    return config
  },
}

module.exports = nextConfig
