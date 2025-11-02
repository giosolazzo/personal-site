"use client";

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
      className={`overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* plain <img> to avoid any optimizer/domain/path issues */}
      <img src={src} alt={alt} className="w-full h-full object-cover block" />
    </div>
  );
}
