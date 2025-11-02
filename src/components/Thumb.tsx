"use client";

import { useState } from "react";

export default function Thumb({ src, alt = "" }: { src: string; alt?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="aspect-[4/3] w-full rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
      {ok ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setOk(false)}
        />
      ) : null}
    </div>
  );
}
