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
    default: "Murphy's Turf Care | Professional Lawn Care & Turf Cleaning in California",
    template: "%s | Murphy's Turf Care",
  },
  description:
    "California's premier turf cleaning and lawn care company. Professional aeration, seeding, fertilization, pest control, and seasonal maintenance across California. Get a free quote today!",
  keywords: [
    'lawn care California',
    'turf cleaning Los Angeles',
    'aeration Murrieta',
    'lawn maintenance Martinez',
    'fertilization Sacramento',
    'pest control Inland Empire',
    'seasonal lawn care Southern California',
  ],
  openGraph: {
    title: "Murphy's Turf Care | Professional Lawn Care & Turf Cleaning in California",
    description:
      "California's premier turf cleaning and lawn care company serving communities statewide since 2018.",
    type: 'website',
    locale: 'en_US',
    siteName: "Murphy's Turf Care",
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
