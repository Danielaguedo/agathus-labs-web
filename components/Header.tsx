'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { divisions, quote } from '@/content/site';
import { Logo } from './Logo';

const LINKS = divisions.map(({ id, index, nav }) => ({ id, index, nav }));
const SECTION_IDS = [...LINKS.map((link) => link.id), quote.id];

/** Id of the section currently crossing the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

export function Header() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-0 z-20 border-b border-steel bg-void">
      <div className="mx-auto grid h-20 max-w-screen-2xl grid-cols-12 items-center gap-x-8 px-6">
        <a
          href="#inicio"
          aria-label="Agathus Labs — inicio"
          className="col-span-7 justify-self-start text-clinical outline-offset-4 focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon lg:col-span-3"
        >
          <Logo />
        </a>

        <nav
          aria-label="Principal"
          className="col-span-5 flex h-full items-center justify-end gap-8 text-xs uppercase tracking-widest lg:col-span-9"
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className="relative hidden h-full items-center gap-3 text-muted outline-offset-[-4px] transition-colors duration-150 ease-out hover:text-clinical focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon aria-[current]:text-clinical lg:flex"
            >
              <span className="text-neon">{link.index}</span>
              {link.nav}
              {active === link.id && (
                <motion.span
                  layoutId="nav-marker"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-neon"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              )}
            </a>
          ))}
          <a
            href={`#${quote.id}`}
            className="group block outline-offset-4 transition-transform duration-150 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-neon motion-safe:active:scale-[0.98]"
          >
            <span
              className={`chamfer block p-px transition-colors duration-150 ease-out group-hover:bg-neon ${
                active === quote.id ? 'bg-neon' : 'bg-steel-light'
              }`}
            >
              <span className="chamfer flex h-10 items-center bg-void px-6 text-clinical">Cotizar</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
