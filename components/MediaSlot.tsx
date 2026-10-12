import type { Media, Ratio, Tone } from '@/content/site';
import { LoopVideo } from './LoopVideo';

const ASPECT: Record<Ratio, string> = {
  '4/3': 'aspect-4/3',
  '16/9': 'aspect-16/9',
  '4/5': 'aspect-4/5',
};

const TONE: Record<Tone, { text: string; border: string; bg: string }> = {
  neon: { text: 'text-neon', border: 'border-neon', bg: 'bg-neon' },
  surgical: { text: 'text-surgical', border: 'border-surgical', bg: 'bg-surgical' },
};

/**
 * Fixed-ratio frame for a looping video or a screenshot, with a HUD overlay.
 * While `media.src` is undefined it renders a labelled placeholder, so the
 * layout is final before the real file exists. To fill a slot, drop the file
 * in /public/media and set `src` (and `poster` for video) in content/site.ts.
 */
export function MediaSlot({ media, className }: { media: Media; className?: string }) {
  const tone = TONE[media.tone];
  const kindLabel = media.kind === 'video' ? 'Video' : 'Imagen';
  const tick = `absolute h-3 w-3 ${tone.border}`;

  return (
    <figure data-media-slot={media.id} className={className}>
      <div
        data-media-frame
        role={media.src ? undefined : 'img'}
        aria-label={media.src ? undefined : `${kindLabel} pendiente: ${media.alt}`}
        className={`relative overflow-hidden border border-steel bg-carbon ${ASPECT[media.ratio]}`}
      >
        {media.src && media.kind === 'video' && (
          <LoopVideo src={media.src} poster={media.poster} label={media.alt} />
        )}
        {media.src && media.kind === 'image' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.src} alt={media.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}

        {/* HUD overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-xs uppercase tracking-widest">
          <span className={`${tick} left-3 top-3 border-l border-t`} />
          <span className={`${tick} right-3 top-3 border-r border-t`} />
          <span className={`${tick} bottom-3 left-3 border-b border-l`} />
          <span className={`${tick} bottom-3 right-3 border-b border-r`} />
          <span className={`absolute left-6 top-6 bg-void px-2 py-1 ${tone.text}`}>{media.id}</span>
          <span className="absolute right-6 top-6 hidden bg-void px-2 py-1 text-clinical sm:block">{media.hud}</span>
          <span className="absolute bottom-6 left-6 bg-void px-2 py-1 text-muted">
            {kindLabel} {media.ratio.replace('/', ':')}
            {!media.src && ' / Pendiente'}
          </span>
          {/* Scan line: travels the full height of the frame. */}
          <span className="absolute inset-x-0 top-0 h-full motion-safe:animate-scan">
            <span className={`block h-px opacity-60 ${tone.bg}`} />
          </span>
        </div>
      </div>
      <figcaption className="mt-4 flex gap-4 text-xs leading-relaxed text-muted">
        <span className={`shrink-0 uppercase tracking-widest ${tone.text}`}>{media.id}</span>
        <span>{media.caption}</span>
      </figcaption>
    </figure>
  );
}
