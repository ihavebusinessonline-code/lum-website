'use client';

import type { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const name = src.slice(src.lastIndexOf('/') + 1).replace(/\.jpg$/, '');
  return `/images/responsive/${name}-${width}.webp`;
}
