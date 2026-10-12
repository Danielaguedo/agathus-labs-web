import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { MotionProvider } from '@/components/MotionProvider';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

const data = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-data',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agathus Labs — Precisión digital. Manufactura real.',
  description:
    'Agathus Labs: laboratorio de manufactura digital y bioingeniería en Arequipa, Perú. Segmentación de imágenes médicas, diseño CAD paramétrico e impresión 3D industrial.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${data.variable}`}>
      <body className="min-h-screen bg-void font-mono text-clinical antialiased">
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;clip-path:none!important;transform:none!important}'}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
