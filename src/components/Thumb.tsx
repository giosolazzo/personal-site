"use client";

import Image from "next/image";
import * as React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function Thumb({ src, alt, className }: Props) {
  const [fallback, setFallback] = React.useState(false);

  return (
    <div
      className={
        "aspect-square w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 " +
        (className ?? "")
      }
    >
      {!fallback ? (
        <Image
          src={src}
          alt={alt}
          width={160}
          height={160}
          className="h-full w-full object-cover"
          onError={() => setFallback(true)}
          priority
        />
      ) : (
        <div className="h-full w-full grid place-items-center text-xs text-zinc-400">
          image
        </div>
      )}
    </div>
  );
}
