// Existing site photographs with descriptive alt text.
interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  // Service-area target, not a verified ZIP for the photographed property.
  serviceZip?: string;
  date?: { dateTime: string; label: string };
}

export const turfGalleryPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/gallery-12.jpeg', alt: 'Curved backyard turf beside a patio and gravel beds' },
  { src: '/images/gallery/gallery-13.jpeg', alt: 'Side-yard artificial turf bordered by landscape rock' },
];

// Photos 1–2 show one yard; photos 3–5 show another. Keep each yard's caption
// consistent across its angles and across the homepage and regional galleries.
// Month stamps reflect the originals' embedded capture dates, not job completion dates.
const september2026 = { dateTime: '2026-09', label: 'September 2026' };
const october2026 = { dateTime: '2026-10', label: 'October 2026' };
const patioYardCaption = 'Turf Cleaning - Temecula, CA';
const poolsideYardCaption = 'Turf Cleaning - Murrieta, CA';
export const recentResidentialPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/residential-turf-yard-01.webp', alt: 'Artificial turf backyard beside a raised planter, hot tub, and covered patio', caption: patioYardCaption, serviceZip: '92592', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-02.webp', alt: 'Wide artificial turf lawn with grooming lines, a raised planter, and white fencing', caption: patioYardCaption, serviceZip: '92592', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-03.webp', alt: 'Artificial turf lawn beside an olive tree, concrete patio, and pool', caption: poolsideYardCaption, serviceZip: '92563', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-04.webp', alt: 'Artificial turf surrounding concrete stepping slabs beside a poolside patio', caption: poolsideYardCaption, serviceZip: '92563', date: september2026 },
  { src: '/images/gallery/residential-turf-yard-05.webp', alt: 'Artificial turf lawn bordered by hedges, an olive tree, and hillside fencing', caption: poolsideYardCaption, serviceZip: '92563', date: september2026 },
];

export const palmDesertPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/palm-desert-turf-october-2026.webp', alt: 'Artificial turf surrounding a backyard pool and raised spa with palm trees in Palm Desert', caption: 'Turf Cleaning - Palm Desert, CA', serviceZip: '92211', date: october2026 },
];

export const orangeCountyPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/turf-cleaning-newport-beach-september-2026.webp', alt: 'Artificial turf beside a backyard pool and spa with palm trees and string lights in Newport Beach', caption: 'Turf Cleaning - Newport Beach, CA', serviceZip: '92661', date: september2026 },
  { src: '/images/gallery/turf-cleaning-culver-city-october-2026.webp', alt: 'Artificial turf lawn alongside a paved patio, white fencing, and canopy in Culver City', caption: 'Turf Cleaning - Culver City, CA', serviceZip: '90232', date: october2026 },
  { src: '/images/gallery/turf-cleaning-fountain-valley-october-2026.webp', alt: 'Artificial turf backyard bordered by a curved stone patio, shrubs, and wooden fencing in Fountain Valley', caption: 'Turf Cleaning - Fountain Valley, CA', serviceZip: '92708', date: october2026 },
];

export const bayAreaPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/turf-cleaning-walnut-creek-september-2026.webp', alt: 'Artificial turf lawn beside a swing set and landscaped hillside in Walnut Creek', caption: 'Turf Cleaning - Walnut Creek, CA', serviceZip: '94598', date: september2026 },
];

export const sacramentoPhotos: GalleryPhoto[] = [
  { src: '/images/gallery/turf-cleaning-rocklin-september-2026.webp', alt: 'Artificial turf surrounding a raised deck and covered outdoor seating area in Rocklin', caption: 'Turf Cleaning - Rocklin, CA', serviceZip: '95765', date: september2026 },
  { src: '/images/gallery/turf-cleaning-folsom-october-2026.webp', alt: 'Artificial turf surrounding concrete stepping slabs, a patio umbrella, and a fire pit in Folsom', caption: 'Turf Cleaning - Folsom, CA', serviceZip: '95630', date: october2026 },
];

export const homepageGalleryPhotos = [...recentResidentialPhotos, ...palmDesertPhotos, ...orangeCountyPhotos, ...bayAreaPhotos, ...sacramentoPhotos];

export function locationGalleryPhotos(slug: string) {
  if (slug === 'palm-desert') {
    return [...palmDesertPhotos, ...turfGalleryPhotos];
  }
  if (slug === 'huntington-beach') return [...recentResidentialPhotos, ...orangeCountyPhotos, ...turfGalleryPhotos];
  if (slug === 'murrieta') return [...recentResidentialPhotos, ...turfGalleryPhotos];
  if (slug === 'martinez') return [...bayAreaPhotos, ...turfGalleryPhotos];
  if (slug === 'sacramento') return [...sacramentoPhotos, ...turfGalleryPhotos];
  return turfGalleryPhotos;
}
