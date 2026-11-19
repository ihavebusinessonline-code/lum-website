import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './app/image-loader.ts',
    deviceSizes: [384, 640, 828, 1080],
    imageSizes: [256],
  },
};

export default config;
