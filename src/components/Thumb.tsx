"use client";

import Image from "next/image";

export default function Thumb({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={
        "relative aspect-square rounded-lg overflow-hidden bg-zinc-900/60 border border-zinc-800 " +
        className
      }
    >
      {/* If the image isn’t uploaded yet, this still renders a nice holder */}
      <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
    </div>
  );
}
