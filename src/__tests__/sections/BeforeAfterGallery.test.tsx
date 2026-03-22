import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery';

describe('BeforeAfterGallery', () => {
  it('renders section heading', () => {
    render(<BeforeAfterGallery />);
    expect(screen.getByText('See the Difference')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<BeforeAfterGallery />);
    expect(
      screen.getByText('Real results from real customers'),
    ).toBeInTheDocument();
  });

  it('renders before/after image with correct src and alt', () => {
    render(<BeforeAfterGallery />);
    const img = screen.getByAlt(
      "Before and after turf cleaning by Murphy's Turf",
    );
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/before-after.png');
  });

  it('renders caption text', () => {
    render(<BeforeAfterGallery />);
    expect(
      screen.getByText(
        /30\+ years of experience delivering results you can see/,
      ),
    ).toBeInTheDocument();
  });
});
