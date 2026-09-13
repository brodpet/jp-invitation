import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Antonio & Axzel — January 9, 2027',
  description:
    'Antonio Patalinghug III and Axzel Rosel Gallares invite you to their wedding on January 9, 2027 in Talisay City, Cebu.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Antonio & Axzel — Wedding Invitation',
    description: 'Gather with us in the garden. January 9, 2027 · Talisay City, Cebu.',
    type: 'website',
    locale: 'en_PH',
    siteName: 'Antonio & Axzel',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4eee2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
