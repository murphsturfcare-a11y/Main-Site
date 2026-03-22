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
  it('renders without crashing and displays "Murphy" text', async () => {
    const HomePage = (await import('@/app/page')).default;
    render(<HomePage />);
    expect(screen.getByText(/Murphy/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 2. About Page
// ─────────────────────────────────────────────────────────────
describe('About Page', () => {
  it('renders without crashing and displays "Meet the Murphy" heading text', async () => {
    const AboutPage = (await import('@/app/about/page')).default;
    render(<AboutPage />);
    expect(screen.getByText(/Meet the Murphy/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 3. Services Page
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
  // TODO: This page uses `async function` with `params: Promise<{ slug: string }>` and calls `notFound()`.
  // Async server components cannot be rendered directly in vitest. Skipping for now.
  it.todo('renders a valid service detail page');
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
  // TODO: This page uses `async function` with `params: Promise<{ slug: string }>` and calls `notFound()`.
  // Async server components cannot be rendered directly in vitest. Skipping for now.
  it.todo('renders a valid location detail page');
});

// ─────────────────────────────────────────────────────────────
// 7. Blog Page
// ─────────────────────────────────────────────────────────────
describe('Blog Page', () => {
  it('renders without crashing and displays "Murphy" and "Blog" text', async () => {
    const BlogPage = (await import('@/app/blog/page')).default;
    render(<BlogPage />);
    expect(screen.getByText(/Murphy/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 8. Blog [slug] Page
// ─────────────────────────────────────────────────────────────
describe('Blog [slug] Page', () => {
  // TODO: This page uses `async function` with `params: Promise<{ slug: string }>` and calls `notFound()`.
  // Async server components cannot be rendered directly in vitest. Skipping for now.
  it.todo('renders a valid blog post page');
});

// ─────────────────────────────────────────────────────────────
// 9. Privacy Policy Page
// ─────────────────────────────────────────────────────────────
describe('Privacy Policy Page', () => {
  it('renders without crashing and displays "Privacy Policy" heading', async () => {
    const PrivacyPolicyPage = (await import('@/app/privacy-policy/page')).default;
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// 10. Terms of Service Page
// ─────────────────────────────────────────────────────────────
describe('Terms of Service Page', () => {
  it('renders without crashing and displays "Terms of Service" heading', async () => {
    const TermsOfServicePage = (await import('@/app/terms-of-service/page')).default;
    render(<TermsOfServicePage />);
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
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
