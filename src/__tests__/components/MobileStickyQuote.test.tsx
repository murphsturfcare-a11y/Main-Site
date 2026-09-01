import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

import MobileStickyQuote from '@/components/ui/MobileStickyQuote';

describe('MobileStickyQuote', () => {
  it('clicking Call Now opens a picker with tel: links for each location', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /call now/i }));

    expect(screen.getByText('Call Your Local Office')).toBeInTheDocument();
    const telLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('tel:'));
    expect(telLinks).toHaveLength(4);
    const hrefs = telLinks.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('tel:9513313300');
    expect(hrefs).toContain('tel:9253380048');
    expect(hrefs).toContain('tel:9164325033');
  });

  it('clicking Get Free Quote opens a picker linking to each location quote form', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /get free quote/i }));

    expect(screen.getByText('Select Your Area')).toBeInTheDocument();
    for (const slug of ['huntington-beach', 'murrieta', 'martinez', 'sacramento']) {
      const links = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href') === `/locations/${slug}#quote-form`);
      expect(links).toHaveLength(1);
    }
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
