/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  reactStrictMode: true,

  // 1. Enable Standalone Mode (Reduces size by ~70%)
  output: 'standalone',

  // 2. Keep your Sanity Image config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      }
    ]
  },

  // 3. Compression Settings
  experimental: {
    // Treat these as external to avoid Webpack bloat
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node', '@huggingface/transformers'],

    // AGGRESSIVELY exclude heavy files from the deployment zip
    outputFileTracingExcludes: {
      '*': [
        // Exclude heavy AI binaries (saves ~200MB)
        './node_modules/onnxruntime-node/**/*',
        './node_modules/sharp/**/*',
        
        // Exclude system binaries
        './node_modules/@swc/core-linux-x64-gnu',
        './node_modules/@swc/core-linux-x64-musl',
        './node_modules/@esbuild/linux-x64',
        './node_modules/terser',
        './node_modules/webpack',
        
        // Exclude source maps and docs
        './node_modules/**/*.map',
        './node_modules/**/*.md',
      ],
    },
  },
}

module.exports = nextConfig