import { DivisionSection } from '@/components/DivisionSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { QuoteSection } from '@/components/QuoteSection';
import { Reveal, Rule } from '@/components/Reveal';
import { ScrollProgress } from '@/components/ScrollProgress';
import { divisions } from '@/content/site';

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only text-xs uppercase tracking-widest focus-visible:not-sr-only focus-visible:fixed focus-visible:left-6 focus-visible:top-2 focus-visible:z-40 focus-visible:bg-neon-deep focus-visible:px-4 focus-visible:py-3 focus-visible:text-clinical"
      >
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Header />

      <main id="main">
        <Hero />

        <section id="divisiones" aria-labelledby="divisiones-title">
          <div className="mx-auto max-w-screen-2xl px-6">
            <Rule />
            <div className="grid grid-cols-12 gap-x-8 py-24 lg:py-32">
              <Reveal className="col-span-12 lg:col-span-2">
                <p className="text-xs uppercase tracking-widest text-muted">Servicios</p>
              </Reveal>
              <Reveal delay={0.08} className="col-span-12 mt-6 lg:col-span-7 lg:mt-0">
                <h2
                  id="divisiones-title"
                  className="font-sans text-4xl font-bold leading-tight tracking-tight text-clinical sm:text-6xl"
                >
                  Tres líneas de trabajo. Un mismo laboratorio.
                </h2>
              </Reveal>
            </div>

            {divisions.map((division) => (
              <DivisionSection key={division.id} division={division} />
            ))}
          </div>
        </section>

        <QuoteSection />
      </main>

      <Footer />
    </>
  );
}
