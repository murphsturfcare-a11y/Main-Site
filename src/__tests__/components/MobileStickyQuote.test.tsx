import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

import MobileStickyQuote from '@/components/ui/MobileStickyQuote';

describe('MobileStickyQuote', () => {
  it('Call Now opens a picker with a tel: link for each location', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /call now/i }));

    const hrefs = screen.getAllByRole('link').map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual([
      'tel:9513313300',
      'tel:9513313300',
      'tel:9253380048',
      'tel:9164325033',
    ]);
  });

  it('Get Free Quote opens a picker linking to each location quote form', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /get free quote/i }));

    const hrefs = screen.getAllByRole('link').map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual([
      '/locations/huntington-beach#quote-form',
      '/locations/murrieta#quote-form',
      '/locations/martinez#quote-form',
      '/locations/sacramento#quote-form',
    ]);
  });

  it('has fixed positioning classes', () => {
    const { container } = render(<MobileStickyQuote />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('fixed');
    expect(wrapper.className).toContain('bottom-0');
    expect(wrapper.className).toContain('left-0');
    expect(wrapper.className).toContain('right-0');
    expect(wrapper.className).toContain('z-50');
  });

  it('has lg:hidden class for desktop hiding', () => {
    const { container } = render(<MobileStickyQuote />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('lg:hidden');
  });

  it('renders Phone icon area (Call Now text)', () => {
    render(<MobileStickyQuote />);
    expect(screen.getByText(/call now/i)).toBeInTheDocument();
  });

  it('renders Get Free Quote text', () => {
    render(<MobileStickyQuote />);
    expect(screen.getByText(/get free quote/i)).toBeInTheDocument();
  });
});
