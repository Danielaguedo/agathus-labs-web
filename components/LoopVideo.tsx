'use client';

import { useEffect, useRef } from 'react';

type LoopVideoProps = { src: string; poster?: string; label: string };

/** Muted background loop. Under reduced motion it stays on the poster frame. */
export function LoopVideo({ src, poster, label }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
