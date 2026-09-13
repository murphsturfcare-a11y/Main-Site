import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServiceOverview from '@/components/sections/ServiceOverview';

const serviceNames = [
  'Pet Hair & Debris Removal',
  'Blooming & De-Compacting',
  'Disinfect & Deodorize',
  'Poop Scooping & Removal',
];

const serviceSlugs = [
  'pet-hair-debris',
  'blooming-decompacting',
  'disinfect-deodorize',
  'poop-scooping',
];

const serviceDescriptions = [
  'Thorough removal of pet hair, fur, and debris from your artificial turf as part of a defined surface-cleaning scope.',
  "Restore your turf's natural look and feel with our professional blooming and de-compacting service that revives flattened fibers.",
  'Discuss pet odor treatment, turf compatibility, and product-specific cleaning and return-to-use instructions.',
  'Regular pet waste cleanup and removal to maintain a hygienic outdoor space for your family.',
];

describe('ServiceOverview', () => {
  it('renders section heading', () => {
    render(<ServiceOverview />);
    expect(
      screen.getByText('Our Turf Cleaning Services'),
    ).toBeInTheDocument();
  });

  it('renders all 4 service names', () => {
    render(<ServiceOverview />);
    for (const name of serviceNames) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it('renders all 4 service descriptions', () => {
    render(<ServiceOverview />);
    for (const desc of serviceDescriptions) {
      expect(screen.getByText(desc)).toBeInTheDocument();
    }
  });

  it('renders links to each service page', () => {
    render(<ServiceOverview />);
    const learnMoreLinks = screen.getAllByText(/Learn More/);
    expect(learnMoreLinks).toHaveLength(4);

    for (const slug of serviceSlugs) {
      const link = learnMoreLinks.find(
        (el) => el.closest('a')?.getAttribute('href') === `/services/${slug}`,
      );
      expect(link).toBeDefined();
    }
  });
});
