/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export (GitHub Pages)
  output: 'export',
  
  // Enable React Strict Mode for better debugging
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
    domains: [], // Add any external image domains here if needed
  },

  // Add basePath if deploying to GitHub Pages subfolder
  basePath: process.env.NODE_ENV === 'production' ? '/career-os-nextjs' : '',

  // Enable trailing slashes for better GitHub Pages compatibility
  trailingSlash: true,

  // Webpack configuration
  webpack: (config) => {
    // Add custom webpack configurations if needed
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },

  // Environment variables
  env: {
    // Add any client-side environment variables here
    APP_VERSION: process.env.npm_package_version,
  },

  // Custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  }
}

module.exports = nextConfig
