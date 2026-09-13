import type { Location } from '../types';

export const locations: Location[] = [
  {
    "slug": "huntington-beach",
    "name": "Huntington Beach / LA Area",
    "state": "CA",
    "description": "Artificial turf cleaning in Huntington Beach / LA Area. Request debris removal, grooming, pet odor treatment, or waste pickup based on your property's condition and use. Share the address, approximate turf size, and access details for a quote.",
    "serviceAreaDescription": "Murphy's Turf provides professional artificial turf cleaning throughout the Huntington Beach and greater Los Angeles coastal area, including Newport Beach, Costa Mesa, Long Beach, Seal Beach, Irvine, Fountain Valley, Laguna Beach, Dana Point, San Clemente, Anaheim, and surrounding communities.",
    "neighborhoods": [
      "Huntington Beach",
      "Newport Beach",
      "Costa Mesa",
      "Long Beach",
      "Seal Beach",
      "Irvine",
      "Fountain Valley",
      "Garden Grove",
      "Westminster",
      "Laguna Beach",
      "Dana Point",
      "San Clemente",
      "Anaheim"
    ],
    "phone": "951-331-3300",
    "address": "Huntington Beach, CA service area",
    "metaTitle": "Artificial Turf Cleaning in Huntington Beach & LA Area | Murphy's Turf",
    "metaDescription": "Turf cleaning in Huntington Beach / LA Area: debris removal, grooming, odor treatment and pet waste pickup. Call 951-331-3300 for a free quote."
  },
  {
    "slug": "murrieta",
    "name": "Murrieta / Inland Empire",
    "state": "CA",
    "description": "Artificial turf cleaning in Murrieta / Inland Empire. Request debris removal, grooming, pet odor treatment, or waste pickup based on your property's condition and use. Share the address, approximate turf size, and access details for a quote.",
    "serviceAreaDescription": "Murphy's Turf serves the Inland Empire communities listed here, including Murrieta, Temecula, and French Valley to Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Winchester, Corona, Riverside, Moreno Valley, Eastvale, and Fallbrook.",
    "neighborhoods": [
      "Murrieta",
      "Temecula",
      "French Valley",
      "Menifee",
      "Lake Elsinore",
      "Hemet",
      "Perris",
      "Wildomar",
      "Canyon Lake",
      "Temescal Valley",
      "Winchester",
      "Corona",
      "Riverside",
      "Moreno Valley",
      "San Jacinto",
      "Beaumont",
      "Eastvale",
      "Norco",
      "Fallbrook"
    ],
    "phone": "951-331-3300",
    "address": "Murrieta, CA service area",
    "metaTitle": "Artificial Turf Cleaning in Murrieta & Inland Empire | Murphy's Turf",
    "metaDescription": "Turf cleaning in Murrieta / Inland Empire: debris removal, grooming, odor treatment and pet waste pickup. Call 951-331-3300 for a free quote."
  },
  {
    "slug": "martinez",
    "name": "Martinez / Bay Area",
    "state": "CA",
    "description": "Artificial turf cleaning in Martinez / Bay Area. Request debris removal, grooming, pet odor treatment, or waste pickup based on your property's condition and use. Share the address, approximate turf size, and access details for a quote.",
    "serviceAreaDescription": "Murphy's Turf serves Martinez and the greater Contra Costa County and Tri-Valley area, including Concord, Pleasant Hill, Walnut Creek, Antioch, Brentwood, Lafayette, Danville, San Ramon, Dublin, Livermore, Pleasanton, and surrounding East Bay communities.",
    "neighborhoods": [
      "Martinez",
      "Concord",
      "Pleasant Hill",
      "Walnut Creek",
      "Antioch",
      "Brentwood",
      "Lafayette",
      "Danville",
      "San Ramon",
      "Dublin",
      "Livermore",
      "Pleasanton",
      "Orinda",
      "Alamo",
      "Oakley"
    ],
    "phone": "925-338-0048",
    "address": "Martinez, CA service area",
    "metaTitle": "Artificial Turf Cleaning in Martinez & Bay Area | Murphy's Turf",
    "metaDescription": "Turf cleaning in Martinez / Bay Area: debris removal, grooming, odor treatment and pet waste pickup. Call 925-338-0048 for a free quote."
  },
  {
    "slug": "sacramento",
    "name": "Greater Sacramento",
    "state": "CA",
    "description": "Artificial turf cleaning in Greater Sacramento. Request debris removal, grooming, pet odor treatment, or waste pickup based on your property's condition and use. Share the address, approximate turf size, and access details for a quote.",
    "serviceAreaDescription": "Murphy's Turf serves Greater Sacramento communities, including Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, West Sacramento, Carmichael, Fair Oaks, Rocklin, Granite Bay, and surrounding communities.",
    "neighborhoods": [
      "Sacramento",
      "Elk Grove",
      "Roseville",
      "Folsom",
      "Rancho Cordova",
      "Citrus Heights",
      "West Sacramento",
      "Carmichael",
      "Fair Oaks",
      "Rocklin",
      "Granite Bay",
      "Natomas",
      "Orangevale"
    ],
    "phone": "916-432-5033",
    "address": "Sacramento, CA service area",
    "metaTitle": "Artificial Turf Cleaning in Sacramento, CA | Murphy's Turf",
    "metaDescription": "Turf cleaning in Greater Sacramento: debris removal, grooming, odor treatment and pet waste pickup. Call 916-432-5033 for a free quote."
  },
  {
    "slug": "palm-desert",
    "name": "Palm Desert & Nearby Cities",
    "state": "CA",
    "description": "Artificial turf cleaning for Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella. We help homeowners and property managers address pet odor, windblown debris, and flattened turf, with service planning for gated communities and seasonal homes.",
    "serviceAreaDescription": "Serving Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio, Coachella, and neighborhoods within this service area, including Sun City Palm Desert / Desert Palms. Send your property address to confirm coverage near the outer boundary.",
    "neighborhoods": [
      "Palm Desert",
      "Indian Wells",
      "Bermuda Dunes",
      "La Quinta",
      "Indio",
      "Coachella"
    ],
    "phone": "951-331-3300",
    "address": "Palm Desert, CA service area",
    "metaTitle": "Artificial Turf Cleaning in Palm Desert, CA | Murphy's Turf",
    "metaDescription": "Turf cleaning in Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio & Coachella. Pet odor, debris removal and turf care. Request a free quote."
  }
];

export function residentialLocationParams(): { slug: string; subLocation: string }[] {
  return locations.flatMap((location) =>
    location.neighborhoods.flatMap((name) => {
      const citySlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return citySlug === location.slug
        ? []
        : [{ slug: location.slug, subLocation: `turf-cleaning-in-${citySlug}` }];
    }),
  );
}
