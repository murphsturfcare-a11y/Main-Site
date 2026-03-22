import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

describe('WhyChooseUs', () => {
  it('renders section heading', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByRole('heading', { name: /why choose murphy.s turf/i })
    ).toBeInTheDocument();
  });

  it('renders all 3 benefit titles', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('100% Pet Friendly')).toBeInTheDocument();
    expect(screen.getByText('Eco Friendly')).toBeInTheDocument();
    expect(screen.getByText('Satisfaction Guaranteed')).toBeInTheDocument();
  });

  it('renders all 3 benefit descriptions', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByText(
        /all our products and methods are completely safe for your furry friends/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /we use environmentally responsible, biodegradable products/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /not happy with our work\? we.ll come back and make it right/i
      )
    ).toBeInTheDocument();
  });

  it('renders icons with aria-hidden', () => {
    const { container } = render(<WhyChooseUs />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(3);
  });
});
