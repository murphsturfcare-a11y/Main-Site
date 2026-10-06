// Existing site photographs with descriptive alt text.
interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  date?: { dateTime: string; label: string };
}

export const turfGalleryPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/gallery-12.jpeg', alt: 'Curved backyard turf beside a patio and gravel beds' },
  { src: '/images/gallery/gallery-13.jpeg', alt: 'Side-yard artificial turf bordered by landscape rock' },
];

// User-supplied photographs and captions, paired in the supplied order and
// approved for both the Murrieta and OC / LA galleries.
const october2026 = { dateTime: '2026-10', label: 'October 2026' };
const recentResidentialPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/residential-turf-yard-01.webp', alt: 'Artificial turf backyard beside a raised planter, hot tub, and covered patio', caption: 'Turf Cleaning - Redondo Beach, CA 90277', date: october2026 },
  { src: '/images/gallery/residential-turf-yard-02.webp', alt: 'Wide artificial turf lawn with grooming lines, a raised planter, and white fencing', caption: 'Turf Cleaning - Temecula, CA', date: october2026 },
  { src: '/images/gallery/residential-turf-yard-03.webp', alt: 'Artificial turf lawn beside an olive tree, concrete patio, and pool', caption: 'Turf Cleaning - Murrieta, CA', date: october2026 },
  { src: '/images/gallery/residential-turf-yard-04.webp', alt: 'Artificial turf surrounding concrete stepping slabs beside a poolside patio', caption: 'Turf Cleaning - Manhattan Beach, CA', date: october2026 },
  { src: '/images/gallery/residential-turf-yard-05.webp', alt: 'Artificial turf lawn bordered by hedges, an olive tree, and hillside fencing', caption: 'Turf Cleaning - Anaheim, CA', date: october2026 },
];

export function locationGalleryPhotos(slug: string) {
  return slug === 'murrieta' || slug === 'huntington-beach'
    ? [...recentResidentialPhotos, ...turfGalleryPhotos]
    : turfGalleryPhotos;
}
