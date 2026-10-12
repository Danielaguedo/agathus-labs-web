/**
 * Ágata en corte sagital. Mitad izquierda = bandas concéntricas; mitad
 * derecha = cortes horizontales (capas FDM / slices DICOM); núcleo en violeta.
 */
export function Logo() {
  return (
    <span className="flex items-center gap-4">
      <svg className="h-10 w-auto" viewBox="46 0 68 60" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="logo-l">
            <rect x="0" y="0" width="78" height="60" />
          </clipPath>
          <clipPath id="logo-r">
            <rect x="82" y="0" width="78" height="60" />
          </clipPath>
          <clipPath id="logo-tri">
            <polygon points="80,2 112,58 48,58" />
          </clipPath>
        </defs>
        <g clipPath="url(#logo-l)" fill="none" strokeWidth="1">
          <polygon points="80,2 112,58 48,58" stroke="#939ca8" vectorEffect="non-scaling-stroke" />
          <polygon points="80,12.5 103,52.8 57,52.8" stroke="#3a444f" vectorEffect="non-scaling-stroke" />
          <polygon points="80,22.9 94.1,47.6 65.9,47.6" stroke="#3a444f" vectorEffect="non-scaling-stroke" />
          <polygon points="80,31.9 86.4,43.1 73.6,43.1" fill="#a78bfa" />
        </g>
        <g clipPath="url(#logo-r)">
          <g clipPath="url(#logo-tri)" fill="none" stroke="#3a444f" strokeWidth="1">
            <path
              d="M80 16H112M80 22H112M80 28H112M80 34H112M80 40H112M80 46H112M80 52H112"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <polygon
            points="80,2 112,58 48,58"
            fill="none"
            stroke="#939ca8"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <polygon points="80,31.9 86.4,43.1 73.6,43.1" fill="#a78bfa" />
        </g>
      </svg>
      <span className="flex flex-col">
        <span className="font-sans text-lg font-bold uppercase leading-none tracking-widest">Agathus</span>
        <span className="mt-1 text-xs lowercase leading-none tracking-widest text-muted">labs</span>
      </span>
    </span>
  );
}
