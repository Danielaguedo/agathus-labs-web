// All page copy and media slots live here. Components only lay it out.

export type Tone = 'neon' | 'surgical';
export type Ratio = '4/3' | '16/9' | '4/5';

export type Media = {
  /** Slot id shown in the HUD, e.g. "MS-01". */
  id: string;
  kind: 'video' | 'image';
  ratio: Ratio;
  /** Path under /public. Leave undefined until the real file exists. */
  src?: string;
  /** Video only: still frame shown before playback. */
  poster?: string;
  /** What the media shows — used as alt text / aria-label. */
  alt: string;
  caption: string;
  /** Short label for the HUD's top-right corner. */
  hud: string;
  tone: Tone;
};

export type Spec = { label: string; value: string };

export type Division = {
  id: string;
  index: string;
  nav: string;
  audience: string;
  title: string;
  body: string;
  specs: Spec[];
  media: Media;
  /** Column split on the 12-col grid: numeral / text / media. */
  layout: 'text-media' | 'media-text' | 'text-narrow-media';
  tone: Tone;
};

export const hero = {
  label: 'Digital Precision. Real Manufacturing.',
  titleTop: 'Precisión digital.',
  titleBottom: 'Manufactura real.',
  body: 'Convertimos archivos en objetos: de una tomografía a un modelo anatómico, de un diseño CAD a una pieza mecánica que funciona.',
  cta: 'Cotizar Proyecto',
  media: {
    id: 'MS-00',
    kind: 'video',
    ratio: '4/5',
    src: undefined, // → '/media/hero-p1s.mp4'
    poster: undefined, // → '/media/hero-p1s.jpg'
    alt: 'Impresora Bambu Lab P1S imprimiendo una pieza, plano cerrado del cabezal',
    caption: 'Bambu Lab P1S en impresión. Video en bucle, sin audio.',
    hud: 'FDM / En curso',
    tone: 'neon',
  } satisfies Media,
};

export const divisions: Division[] = [
  {
    id: 'segmentacion',
    index: '01',
    nav: 'Segmentación',
    audience: 'B2B / Cirujanos',
    title: 'Segmentación de Imágenes Médicas',
    body: 'Convertimos estudios DICOM en modelos anatómicos 3D. El cirujano recibe la anatomía de su paciente como un objeto físico que puede sostener, medir y estudiar antes de operar.',
    specs: [
      { label: 'Entrada', value: 'Estudio DICOM' },
      { label: 'Proceso', value: 'Segmentación en 3D Slicer' },
      { label: 'Salida', value: 'Modelo anatómico impreso' },
    ],
    media: {
      id: 'MS-01',
      kind: 'image',
      ratio: '4/3',
      src: undefined, // → '/media/slicer-segmentacion.png'
      alt: 'Captura de 3D Slicer con un estudio DICOM segmentado en vistas axial, sagital, coronal y 3D',
      caption: 'Segmentación de un estudio DICOM en 3D Slicer.',
      hud: '3D Slicer / DICOM',
      tone: 'surgical',
    },
    layout: 'text-media',
    tone: 'surgical',
  },
  {
    id: 'cad',
    index: '02',
    nav: 'CAD',
    audience: 'Industria',
    title: 'Diseño CAD Paramétrico',
    body: 'Diseñamos piezas mecánicas funcionales a partir de una idea, un plano o una pieza existente. El modelo es paramétrico: si una medida cambia, la pieza se actualiza.',
    specs: [
      { label: 'Entrada', value: 'Idea o requerimiento' },
      { label: 'Proceso', value: 'Modelado paramétrico' },
      { label: 'Salida', value: 'Modelo listo para fabricar' },
    ],
    media: {
      id: 'MS-02',
      kind: 'image',
      ratio: '16/9',
      src: undefined, // → '/media/cad-parametrico.png'
      alt: 'Captura del modelo CAD paramétrico de una pieza mecánica con sus cotas',
      caption: 'Modelo CAD paramétrico de una pieza mecánica, con cotas.',
      hud: 'CAD / Paramétrico',
      tone: 'neon',
    },
    layout: 'media-text',
    tone: 'neon',
  },
  {
    id: 'impresion',
    index: '03',
    nav: 'Impresión 3D',
    audience: 'Industria / Empresas',
    title: 'Impresión 3D Industrial',
    body: 'Fabricamos prototipos y piezas hechas para montarse, moverse y trabajar. También tarjetas corporativas con NFC integrado: se acerca al teléfono y entrega el contacto.',
    specs: [
      { label: 'Entrada', value: 'Modelo 3D' },
      { label: 'Proceso', value: 'Impresión FDM' },
      { label: 'Salida', value: 'Pieza funcional' },
    ],
    media: {
      id: 'MS-03',
      kind: 'video',
      ratio: '4/5',
      src: undefined, // → '/media/pieza-terminada.mp4'
      poster: undefined, // → '/media/pieza-terminada.jpg'
      alt: 'Pieza impresa en 3D recién terminada, retirada de la cama de impresión',
      caption: 'Pieza terminada al salir de la cama de impresión.',
      hud: 'FDM / Pieza final',
      tone: 'neon',
    },
    layout: 'text-narrow-media',
    tone: 'neon',
  },
];

export const quote = {
  id: 'contacto',
  index: '04',
  nav: 'Cotización',
  title: 'Cotizar un proyecto',
  body: 'Cada cotización parte de un archivo o de una idea. Esto es lo que necesitamos recibir según el servicio.',
  requirements: [
    { label: '01', value: 'Estudio DICOM' },
    { label: '02', value: 'Idea o requerimiento' },
    { label: '03', value: 'Modelo 3D' },
  ],
  // No public contact channel yet — replace when there is one.
  channel: 'Pendiente de publicar',
};

export const footer = {
  tagline: 'Precisión digital. Manufactura real.',
  legal: '© 2026 Agathus Corp.',
  place: 'Arequipa, Perú.',
};
