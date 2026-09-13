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
    expect(screen.getByText('Care for Pet Yards')).toBeInTheDocument();
    expect(screen.getByText('Surface-Specific Care')).toBeInTheDocument();
    expect(screen.getByText('Clear Service Scope')).toBeInTheDocument();
  });

  it('renders all 3 benefit descriptions', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByText(
        /Plan around pet use and follow the treatment instructions/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Share your turf and infill information/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Confirm the areas, work, and access details/i
      )
    ).toBeInTheDocument();
  });

  it('renders icons with aria-hidden', () => {
    const { container } = render(<WhyChooseUs />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(3);
  });
});
