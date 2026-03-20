import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExitIntentPopup from '@/components/ExitIntentPopup';

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const openSans = Open_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    template: "%s | Murphy's Turf",
  },
  description:
    "California's premier artificial turf cleaning company with 30+ years of experience. Professional pet hair removal, turf blooming, disinfecting, and deodorizing services across California. Get a free quote today!",
  keywords: [
    'artificial turf cleaning California',
    'turf cleaning Huntington Beach',
    'pet turf cleaning Murrieta',
    'artificial grass cleaning Martinez',
    'turf maintenance Sacramento',
    'artificial turf deodorizing',
    'pet friendly turf cleaning Southern California',
  ],
  openGraph: {
    title: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    description:
      "California's premier artificial turf cleaning company with 30+ years of experience serving communities statewide.",
    type: 'website',
    locale: 'en_US',
    siteName: "Murphy's Turf",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
