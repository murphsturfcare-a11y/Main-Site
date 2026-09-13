import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '@/components/sections/Hero';

describe('Hero', () => {
  it('renders the headline text', () => {
    render(<Hero />);
    const headlineWords = ['When', 'You', 'Care', 'About', 'Clean', 'Turf,', 'Call', 'Murphy\u2019s', 'Turf'];
    for (const word of headlineWords) {
      expect(screen.getByText(word)).toBeInTheDocument();
    }
  });

  it('renders CTA button with correct href', () => {
    render(<Hero />);
    const cta = screen.getByText('Get Your Free Quote');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '/locations');
  });

  it('renders hero image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Beautiful clean artificial turf');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/hero.jpg');
  });

  it('does not display unsourced business statistics', () => {
    const { container } = render(<Hero />);
    expect(container.textContent).not.toContain('Happy Customers');
    expect(container.textContent).not.toContain('Satisfaction Rate');
  });

  it('renders subtitle text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Worried about your pets ruining your turf/),
    ).toBeInTheDocument();
  });
});
