import type { Division } from '@/content/site';
import { MediaSlot } from './MediaSlot';
import { Parallax } from './Parallax';
import { Reveal, Rule } from './Reveal';
import { SpecList } from './SpecList';

// Column spans on the 12-col grid after the 2-col numeral.
const LAYOUT = {
  'text-media': { text: 'lg:col-span-5', media: 'lg:col-span-5', mediaFirst: false },
  'media-text': { text: 'lg:col-span-4', media: 'lg:col-span-6', mediaFirst: true },
  'text-narrow-media': { text: 'lg:col-span-7', media: 'lg:col-span-3', mediaFirst: false },
} as const;

const TONE_TEXT = { neon: 'text-neon', surgical: 'text-surgical' } as const;

export function DivisionSection({ division }: { division: Division }) {
  const layout = LAYOUT[division.layout];
  const tone = TONE_TEXT[division.tone];
  const titleId = `${division.id}-title`;

  const media = (
    <Parallax
      distance={16}
      className={`col-span-12 ${layout.media} ${layout.mediaFirst ? 'order-last lg:order-none' : ''} ${
        division.media.ratio === '4/5' ? 'max-w-sm lg:max-w-none' : ''
      }`}
    >
      <Reveal delay={0.16}>
        <MediaSlot media={division.media} />
      </Reveal>
    </Parallax>
  );

  return (
    <article id={division.id} aria-labelledby={titleId} className="scroll-mt-20">
      <Rule />
      <div className="grid grid-cols-12 gap-x-8 gap-y-12 py-24 lg:py-32">
        <Parallax distance={24} className="col-span-12 lg:col-span-2">
          <Reveal>
            <p aria-hidden="true" className={`text-6xl leading-none ${tone}`}>
              {division.index}
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-muted">{division.audience}</p>
          </Reveal>
        </Parallax>

        {layout.mediaFirst && media}

        <div className={`col-span-12 ${layout.text}`}>
          <Reveal delay={0.08}>
            <h3
              id={titleId}
              className="break-words font-sans text-4xl font-bold leading-tight tracking-tight text-clinical sm:text-5xl"
            >
              {division.title}
            </h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">{division.body}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-16 max-w-md">
            <SpecList specs={division.specs} />
          </Reveal>
        </div>

        {!layout.mediaFirst && media}
      </div>
    </article>
  );
}
