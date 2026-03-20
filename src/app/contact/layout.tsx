import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Murphy's Turf Care for a free lawn care quote. Call, email, or fill out our contact form. Serving Los Angeles, Murrieta, Martinez, and Sacramento.",
  openGraph: {
    title: "Contact Us | Murphy's Turf Care",
    description:
      "Reach out to Murphy's Turf Care for professional lawn care services across California. Free quotes and estimates available.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
