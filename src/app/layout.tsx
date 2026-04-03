import type { Metadata, Viewport } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
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
    "California's premier artificial turf cleaning company. We provide pet-safe turf cleaning, disinfecting, deodorizing, and maintenance services. Serving Murrieta, Huntington Beach, Martinez, and Sacramento. Get a free quote today!",
  keywords: [
    'artificial turf cleaning California',
    'turf cleaning Murrieta',
    'professional turf cleaning',
'pet turf cleaning Huntington Beach',
    'turf disinfect deodorize Martinez',
    'turf maintenance Sacramento',
    'pet-safe turf cleaning Southern California',
  ],
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    description:
      "California's premier artificial turf cleaning company, serving communities statewide.",
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
        <GoogleAnalytics />
        <GTMHead />
        <GTMBody />
        <Header />
        <main className="flex-1 pt-24 lg:pt-28 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <MobileStickyQuote />
        <CookieConsent />
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Murphy's Turf",
              "description": "Professional artificial turf cleaning company serving California with pet-safe cleaning technology.",
              "url": "https://murphysturf.com",
              "contactPoint": [
                { "@type": "ContactPoint", "telephone": "+19513313300", "areaServed": ["Huntington Beach", "Murrieta"], "contactType": "customer service" },
                { "@type": "ContactPoint", "telephone": "+19253380048", "areaServed": ["Martinez", "Bay Area"], "contactType": "customer service" },
                { "@type": "ContactPoint", "telephone": "+19164325033", "areaServed": ["Sacramento"], "contactType": "customer service" }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "26323 Jefferson Avenue",
                "addressLocality": "Murrieta",
                "addressRegion": "CA",
                "postalCode": "92562",
                "addressCountry": "US"
              },
              "areaServed": [
                { "@type": "City", "name": "Huntington Beach" },
                { "@type": "City", "name": "Murrieta" },
                { "@type": "City", "name": "Martinez" },
                { "@type": "City", "name": "Sacramento" }
              ],
              "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
              "priceRange": "$$",
              "image": "https://murphysturf.com/images/logo.avif",
              "sameAs": [
                "https://www.instagram.com/murphysturfcare/",
                "https://www.facebook.com/profile.php?id=100090088264095",
                "https://www.youtube.com/@murphysturfcare/featured"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
