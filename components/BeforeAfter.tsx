// components/BeforeAfterStatic.tsx
import Image from "next/image";

export default function BeforeAfterStatic({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="rounded-xl border border-white/10"
      />

      {/* Left label */}
      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Before
      </span>

      {/* Right label */}
      <span className="absolute top-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded">
        After
      </span>
    </div>
  );
}
