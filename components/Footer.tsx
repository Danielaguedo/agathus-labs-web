import { footer } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-steel bg-carbon">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-x-8 px-6 py-12 text-xs uppercase tracking-widest text-muted">
        <p className="col-span-12 text-clinical lg:col-span-2">Agathus Labs</p>
        <p className="col-span-12 mt-2 lg:col-span-6 lg:mt-0">{footer.tagline}</p>
        <p className="col-span-12 mt-2 lg:col-span-4 lg:mt-0 lg:text-right">
          {footer.legal} / {footer.place}
        </p>
      </div>
    </footer>
  );
}
