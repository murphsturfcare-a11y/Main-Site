import Image from 'next/image';
import { turfGalleryPhotos as photos } from '@/data/gallery';
export default function BeforeAfterGallery() {
 return <section className="py-16 lg:py-24 bg-cream"><div className="max-w-6xl mx-auto px-4"><h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center">Turf Gallery</h2><p className="text-charcoal-light text-center mt-4 font-body">A closer look at outdoor artificial turf spaces.</p><div className="mt-10 grid sm:grid-cols-2 gap-6">{photos.map((photo) => <figure key={photo.src}><Image src={photo.src} alt={photo.alt} width={900} height={1200} className="w-full aspect-[4/3] object-cover rounded-xl" /><figcaption className="mt-3 text-sm text-charcoal-light font-body">{photo.alt}</figcaption></figure>)}</div></div></section>;
}
