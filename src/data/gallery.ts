// Existing site photographs, captioned by visible content rather than an
// unverified before/after pairing, job location, or measured treatment result.
interface GalleryPhoto {
  src: string;
  alt: string;
  date?: { dateTime: string; label: string };
}

export const turfGalleryPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/gallery-12.jpeg', alt: 'Curved backyard turf beside a patio and gravel beds' },
  { src: '/images/gallery/gallery-13.jpeg', alt: 'Side-yard artificial turf bordered by landscape rock' },
];

// User-supplied photographs approved for both the Murrieta and OC / LA galleries.
// Descriptions identify the visible scene without assigning an individual job city.
const september2026 = { dateTime: '2026-09', label: 'September 2026' };
const recentResidentialPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/residential-turf-yard-01.webp', alt: 'Artificial turf backyard beside a raised planter, hot tub, and covered patio', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-02.webp', alt: 'Wide artificial turf lawn with grooming lines, a raised planter, and white fencing', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-03.webp', alt: 'Artificial turf lawn beside an olive tree, concrete patio, and pool', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-04.webp', alt: 'Artificial turf surrounding concrete stepping slabs beside a poolside patio', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-05.webp', alt: 'Artificial turf lawn bordered by hedges, an olive tree, and hillside fencing', date: september2026 },
];

export function locationGalleryPhotos(slug: string) {
  return slug === 'murrieta' || slug === 'huntington-beach'
    ? [...recentResidentialPhotos, ...turfGalleryPhotos]
    : turfGalleryPhotos;
}
