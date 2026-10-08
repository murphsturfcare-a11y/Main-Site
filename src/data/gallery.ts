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

// Photos 1–2 show one yard; photos 3–5 show another. Keep each yard's caption
// consistent across its angles and across the homepage and regional galleries.
const october2026 = { dateTime: '2026-10', label: 'October 2026' };
const patioYardCaption = 'Turf Cleaning - Temecula, CA';
const poolsideYardCaption = 'Turf Cleaning - Murrieta, CA';
export const recentResidentialPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/residential-turf-yard-01.webp', alt: 'Artificial turf backyard beside a raised planter, hot tub, and covered patio', caption: patioYardCaption, date: october2026 },
  { src: '/images/gallery/residential-turf-yard-02.webp', alt: 'Wide artificial turf lawn with grooming lines, a raised planter, and white fencing', caption: patioYardCaption, date: october2026 },
  { src: '/images/gallery/residential-turf-yard-03.webp', alt: 'Artificial turf lawn beside an olive tree, concrete patio, and pool', caption: poolsideYardCaption, date: october2026 },
  { src: '/images/gallery/residential-turf-yard-04.webp', alt: 'Artificial turf surrounding concrete stepping slabs beside a poolside patio', caption: poolsideYardCaption, date: october2026 },
  { src: '/images/gallery/residential-turf-yard-05.webp', alt: 'Artificial turf lawn bordered by hedges, an olive tree, and hillside fencing', caption: poolsideYardCaption, date: october2026 },
];

export const palmDesertPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/palm-desert-turf-october-2026.webp', alt: 'Artificial turf surrounding a backyard pool and raised spa with palm trees in Palm Desert', caption: 'Turf Cleaning - Palm Desert, CA', date: october2026 },
];

export const homepageGalleryPhotos = [...recentResidentialPhotos, ...palmDesertPhotos];

export function locationGalleryPhotos(slug: string) {
  if (slug === 'palm-desert') {
    return [...palmDesertPhotos, ...turfGalleryPhotos];
  }
  return slug === 'murrieta' || slug === 'huntington-beach'
    ? [...recentResidentialPhotos, ...turfGalleryPhotos]
    : turfGalleryPhotos;
}
