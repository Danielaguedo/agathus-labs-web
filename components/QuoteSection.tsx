import { quote } from '@/content/site';
import { Reveal, Rule } from './Reveal';
import { SpecList } from './SpecList';

/** 04 — 2 / 6 / 4 */
export function QuoteSection() {
  return (
    <section id={quote.id} aria-labelledby="contacto-title" className="scroll-mt-20 bg-carbon">
      <div className="mx-auto max-w-screen-2xl px-6">
        <Rule tone="neon" />
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 py-24 lg:py-32">
          <Reveal className="col-span-12 lg:col-span-2">
            <p aria-hidden="true" className="text-6xl leading-none text-neon">
              {quote.index}
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-muted">{quote.nav}</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={0.08}>
              <h2
                id="contacto-title"
                className="break-words font-sans text-4xl font-bold leading-tight tracking-tight text-clinical sm:text-6xl"
              >
                {quote.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">{quote.body}</p>
            </Reveal>
          </div>
          <Reveal delay={0.24} className="col-span-12 self-end lg:col-span-4">
            <SpecList
              specs={[...quote.requirements, { label: 'Canal', value: quote.channel }]}
              labelClass="text-neon"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
