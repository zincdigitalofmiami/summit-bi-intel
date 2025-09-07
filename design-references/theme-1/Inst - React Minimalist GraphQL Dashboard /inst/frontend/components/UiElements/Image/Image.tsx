import React from 'react';
import { Img } from 'react-image';
import Image from 'next/image';

import placeholder from 'assets/images/placeholder.jpg';

const Placeholder = () => <img src={placeholder} alt="product img loader" />;

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ddd" offset="20%" />
      <stop stop-color="#f7f7f7" offset="50%" />
      <stop stop-color="#ddd" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#fff" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const NextImage = ({
  src,
  alt = 'placeholder',
  className,
  style,
  width,
  height,
}: {
  src?: string | [string];
  alt?: string;
  className?: string;
  style?: any;
  width: number;
  height: number;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
    />
  );
};

export const ReactImage = ({
  src,
  alt = 'placeholder',
  className,
  style,
}: {
  src?: string | [string];
  alt?: string;
  className?: string;
  style?: any;
  width?: number;
  height?: number;
}) => {
  return (
    <Img
      draggable={false}
      style={style}
      src={src}
      alt={alt}
      loader={<Placeholder />}
      unloader={<Placeholder />}
      className={className}
    />
  );
};
