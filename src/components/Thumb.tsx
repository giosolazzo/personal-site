"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** square size in px (default 56) */
  size?: number;
  className?: string;
};

export default function Thumb({ src, alt, size = 56, className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  );
}
