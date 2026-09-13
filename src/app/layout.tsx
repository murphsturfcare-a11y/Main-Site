import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Montserrat, Open_Sans } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';
import { COMPANY_DESCRIPTION } from '@/lib/seo/constants';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import AttributionCapture from '@/components/analytics/AttributionCapture';
import Script from 'next/script';
import { CONSENT_INITIALIZATION_SCRIPT } from '@/lib/analytics/consent';
import { GTMHead, GTMBody } from '@/components/analytics/GoogleTagManager';

const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'));
const MobileStickyQuote = dynamic(() => import('@/components/ui/MobileStickyQuote'));
const CookieConsent = dynamic(
  () => import('@/components/analytics/CookieConsent').then(mod => ({ default: mod.CookieConsent }))
);

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '900'],
});

const openSans = Open_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2D5016',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://murphysturf.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    template: "%s | Murphy's Turf",
  },
  description:
    "Artificial turf cleaning, debris removal, grooming, pet odor treatment, and maintenance services. Serving Murrieta, Huntington Beach, Martinez, Sacramento, and Palm Desert. Get a free quote today!",
  keywords: [
    'artificial turf cleaning California',
    'turf cleaning Murrieta',
    'professional turf cleaning',
'pet turf cleaning Huntington Beach',
    'turf disinfect deodorize Martinez',
    'turf maintenance Sacramento',
    'pet turf cleaning Southern California',
  ],
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    description: COMPANY_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    siteName: "Murphy's Turf",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Murphy's Turf - Professional Artificial Turf Cleaning",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Script id="google-consent" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: CONSENT_INITIALIZATION_SCRIPT }} />
        <GoogleAnalytics />
        <Suspense fallback={null}><AttributionCapture /></Suspense>
        <GTMHead />
        <GTMBody />
        <Header />
        <main className="flex-1 pt-24 lg:pt-28 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <MobileStickyQuote />
        <CookieConsent />
        {/* GHL form_embed.js removed — replaced with native LeadForm + Netlify function */}
        <JsonLd schema={generateLocalBusinessSchema()} />
      </body>
    </html>
  );
}
