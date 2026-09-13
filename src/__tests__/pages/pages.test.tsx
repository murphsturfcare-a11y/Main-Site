import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock next/navigation (used by some pages for notFound, useRouter, etc.)
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// ─────────────────────────────────────────────────────────────
// 1. Home Page
// ─────────────────────────────────────────────────────────────
describe('Home Page', () => {
  it('renders the main heading and Palm Desert service-area link', async () => {
    const HomePage = (await import('@/app/page')).default;
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Palm Desert/i })[0]).toHaveAttribute('href', '/locations/palm-desert');
  });
});

// ─────────────────────────────────────────────────────────────
// 2. Services Page
// ─────────────────────────────────────────────────────────────
describe('Services Page', () => {
  it('renders without crashing and displays "Our Services" heading', async () => {
    const ServicesPage = (await import('@/app/services/page')).default;
    render(<ServicesPage />);
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 4. Services [slug] Page
// ─────────────────────────────────────────────────────────────
describe('Services [slug] Page', () => {
  it('renders a valid service detail page', async () => {
    const Page = (await import('@/app/services/[slug]/page')).default;
    render(await Page({ params: Promise.resolve({ slug: 'disinfect-deodorize' }) }));
    expect(screen.getByRole('heading', { level: 1, name: /Disinfect.*Deodorize/ })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 5. Locations Page
// ─────────────────────────────────────────────────────────────
describe('Locations Page', () => {
  it('renders without crashing and displays "Serving California" heading', async () => {
    const LocationsPage = (await import('@/app/locations/page')).default;
    render(<LocationsPage />);
    expect(screen.getByText(/Serving California/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 6. Locations [slug] Page
// ─────────────────────────────────────────────────────────────
describe('Locations [slug] Page', () => {
  it('renders a valid location detail page', async () => {
    const Page = (await import('@/app/locations/[slug]/page')).default;
    render(await Page({ params: Promise.resolve({ slug: 'palm-desert' }) }));
    expect(screen.getByRole('heading', { level: 1, name: /Palm Desert/ })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 7. Blog Page
// ─────────────────────────────────────────────────────────────
describe('Blog Page', () => {
  it('renders without crashing and displays "Murphy" and "Blog" text', async () => {
    const BlogPage = (await import('@/app/blog/page')).default;
    render(<BlogPage />);
    expect(screen.getAllByText(/Murphy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Blog/i).length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────
// 8. Blog [slug] Page
// ─────────────────────────────────────────────────────────────
describe('Blog [slug] Page', () => {
  it('renders a valid blog post page', async () => {
    const Page = (await import('@/app/blog/[slug]/page')).default;
    render(await Page({ params: Promise.resolve({ slug: 'artificial-turf-cleaning-palm-desert' }) }));
    expect(screen.getByRole('heading', { level: 1, name: /Palm Desert/ })).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 9. Privacy Policy Page
// ─────────────────────────────────────────────────────────────
describe('Privacy Policy Page', () => {
  it('renders without crashing and displays "Privacy Policy" heading', async () => {
    const PrivacyPolicyPage = (await import('@/app/privacy-policy/page')).default;
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Privacy Policy/i }),
    ).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 10. Terms of Service Page
// ─────────────────────────────────────────────────────────────
describe('Terms of Service Page', () => {
  it('renders without crashing and displays "Terms of Service" heading', async () => {
    const TermsOfServicePage = (await import('@/app/terms-of-service/page')).default;
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Terms of Service/i }),
    ).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 11. Not Found Page
// ─────────────────────────────────────────────────────────────
describe('Not Found Page', () => {
  it('renders without crashing and displays "404" text', async () => {
    const NotFoundPage = (await import('@/app/not-found')).default;
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
