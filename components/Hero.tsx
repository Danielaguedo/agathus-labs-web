import { divisions, hero, quote } from '@/content/site';
import { MediaSlot } from './MediaSlot';
import { Parallax } from './Parallax';
import { Reveal, Rule } from './Reveal';

const INDEX = [
  ...divisions.map(({ id, index, title }) => ({ id, index, title })),
  { id: quote.id, index: quote.index, title: quote.nav },
];
// Unequal split of the 12-col grid for the index strip.
const INDEX_SPAN = ['lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2'];

/** 7/5: headline left, offset video panel right, index strip underneath. */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="scroll-mt-20">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-x-8 gap-y-16 px-6 py-24 lg:py-32">
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
              <span aria-hidden="true" className="h-2 w-2 bg-surgical" />
              {hero.label}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="mt-8 break-words font-sans text-5xl font-bold leading-none tracking-tight text-clinical sm:text-7xl xl:text-8xl"
            >
              {hero.titleTop}
              <br />
              <span className="text-muted">{hero.titleBottom}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-12 max-w-xl text-sm leading-relaxed text-muted">{hero.body}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-12 flex">
            <a
              href={`#${quote.id}`}
              className="group block outline-offset-4 transition-transform duration-150 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon motion-safe:active:scale-[0.98]"
            >
              <span className="chamfer block bg-neon-deep p-px transition-colors duration-150 ease-out group-hover:bg-neon">
                <span className="chamfer flex h-14 items-center gap-4 bg-neon-deep px-8 text-xs font-medium uppercase tracking-widest text-clinical">
                  {hero.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 ease-out motion-safe:group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <Parallax distance={40} className="col-span-12 sm:col-span-8 lg:col-span-5 lg:mt-24">
          <Reveal delay={0.16}>
            <MediaSlot media={hero.media} />
          </Reveal>
        </Parallax>

        <nav aria-label="Índice" className="col-span-12">
          <Rule tone="neon" />
          <ol className="grid grid-cols-12 gap-x-8 text-xs uppercase tracking-widest">
            {INDEX.map((item, i) => (
              <li key={item.id} className={`col-span-12 border-b border-steel lg:border-b-0 ${INDEX_SPAN[i]}`}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-14 items-center gap-4 py-4 text-clinical outline-offset-0 transition-colors duration-150 ease-out hover:text-neon focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon"
                >
                  <span className="text-neon">{item.index}</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
