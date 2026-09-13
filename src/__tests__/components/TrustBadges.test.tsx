import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TrustBadges from '@/components/ui/TrustBadges';

describe('TrustBadges', () => {
  it('renders the trust badges section with correct aria-label', () => {
    render(<TrustBadges />);
    expect(
      screen.getByRole('region', { name: 'Service features' }),
    ).toBeInTheDocument();
  });

  it('renders all 4 badge labels', () => {
    render(<TrustBadges />);
    const section = screen.getByRole('region', { name: 'Service features' });
    const badges = section.querySelectorAll('.flex.items-center.gap-2');
    expect(badges).toHaveLength(4);
  });

  it("renders 'Free Quotes' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Free Quotes')).toBeInTheDocument();
  });

  it("renders 'Regional Contacts' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Regional Contacts')).toBeInTheDocument();
  });

  it("renders 'Clear Service Scope' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Clear Service Scope')).toBeInTheDocument();
  });

  it("renders 'Turf Care Guidance' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Turf Care Guidance')).toBeInTheDocument();
  });
});
