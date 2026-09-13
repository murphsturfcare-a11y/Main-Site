import { render, screen } from '@testing-library/react';
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery';
import { turfGalleryPhotos } from '@/data/gallery';

describe('Turf gallery', () => {
  it('shows distinct existing photographs with descriptive captions', () => {
    render(<BeforeAfterGallery />);
    expect(screen.getByRole('heading', { name: 'Turf Gallery' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(turfGalleryPhotos.length);
    expect(new Set(turfGalleryPhotos.map((photo) => photo.src)).size).toBe(turfGalleryPhotos.length);
    for (const photo of turfGalleryPhotos) {
      expect(screen.getByAltText(photo.alt)).toHaveAttribute('src', photo.src);
      expect(screen.getByText(photo.alt)).toBeInTheDocument();
    }
  });
});
