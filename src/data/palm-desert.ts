import { locations } from './locations';

// Geographic references used to check neighborhood names and context. These
// establish places, not customer relationships or a business office.
export const palmDesertGeographicSources = [
  'https://www.palmdesert.gov/home/showpublisheddocument/34391/638332407119730000',
  'https://rivco4.org/district-communities',
  'https://www.cityofindianwells.org/our-city/about/country-club-living',
  'https://planning.rctlma.org/sites/g/files/aldnop416/files/migrated/Portals-14-devproc-guidelines-bermuda-dunes-bermuda-dunes-design-guidelines-05-13-08.pdf',
  'https://www.laquintaca.gov/business/design-and-development/planning-division/historic-preservation',
  'https://www.indio.org/departments/community-development-department/gis-map',
  'https://mccmeetingspublic.blob.core.usgovcloudapi.net/coachelaca-meet-1378210504264e9b8553cb248655b747/ITEM-Attachment-001-30bcb916760e45d1aa0eccd4777d085d.pdf',
];

export interface DesertContentSection {
  title: string;
  body: string;
}

export interface DesertPageContent {
  summary: string;
  sections: DesertContentSection[];
  faqs: { question: string; answer: string }[];
}

export interface PalmDesertArea {
  slug: string;
  name: string;
  placeType: 'City' | 'Place';
  neighborhoods: string[];
  coverage: string;
  residential: DesertPageContent;
  commercial: DesertPageContent;
}

export const PALM_DESERT_REGION_SLUG = 'palm-desert';
// Dedicated Palm Desert inquiry line confirmed by the business (2026-09-13). Read from
// the region data so pages, call picker and schema share one source. Do not infer a new office address.
export const PALM_DESERT_PHONE = locations.find((location) => location.slug === PALM_DESERT_REGION_SLUG)?.phone ?? '';

export const palmDesertAreas: PalmDesertArea[] = [
  {
    slug: 'palm-desert',
    name: 'Palm Desert',
    placeType: 'City',
    neighborhoods: ['South Palm Desert', 'Palm Desert Country Club', 'Palm Valley', 'Desert Falls', 'Indian Ridge', 'Sun City Palm Desert / Desert Palms'],
    coverage: 'Palm Desert is the main service area, with coverage through Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella. We include neighborhoods within this area and the Sun City Palm Desert / Desert Palms community north of I-10. Neighborhood examples below are not an exhaustive list; send your address if you are near the service boundary.',
    residential: {
      summary: "Artificial turf cleaning in Palm Desert for pet odor, debris, and flattened fibers. Request a quote for your yard, gated property, or seasonal home.",
      sections: [
        { title: "Desert debris", body: "Windblown dirt and leaves need different care from installed infill. Share photos of recurring buildup when requesting your quote." },
        { title: "Pet yards", body: "Focus odor treatment on the spots your pets use most, with cleaning and grooming for the rest of the yard as needed." },
        { title: "Seasonal homes", body: "Arrange gate access, water access, and a local contact for cleaning before your seasonal return or next guest arrival." },
      ],
      faqs: [
        { question: 'Which communities are included in the Palm Desert service area?', answer: 'Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella are included, along with neighborhoods within the service area. The northern coverage includes Sun City Palm Desert / Desert Palms. Send your street address to confirm an appointment near the outer edge.' },
        { question: 'Do you clean turf in Sun City Palm Desert?', answer: 'Sun City Palm Desert / Desert Palms is included in the Palm Desert coverage area. Provide the property address and community access instructions when requesting a quote so the service visit can be coordinated.' },
        { question: 'Can cleaning make artificial turf cooler in summer?', answer: 'Cleaning is for debris, odor, and turf condition; it does not make a synthetic lawn heat-proof. Plan outdoor use around actual surface conditions and follow the turf manufacturer’s care guidance. Discuss cleaning access and scheduling separately from when people or pets will use the yard.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in Palm Desert for HOA grounds, managed rentals, and hospitality properties. Request a maintenance quote based on each area’s use and condition.",
      sections: [
        { title: "HOA common areas", body: "Identify association turf separately from private yards so your quote covers the dog areas, entrances, and courtyards you manage." },
        { title: "Seasonal occupancy", body: "Plan cleaning before busy occupancy periods, with more attention to daily pet areas than lightly used decorative turf." },
        { title: "Property access", body: "Share vendor entrances, service hours, and onsite contacts for each property. Confirm who will handle closures and reopening." },
      ],
      faqs: [
        { question: 'Can one quote cover several Palm Desert properties?', answer: 'Yes, request a portfolio quote with each address, approximate turf area, use type, and access restrictions. We can assess the properties together while keeping the work and service frequency clear for each site.' },
        { question: 'Do you clean synthetic turf at country club communities?', answer: 'You can request cleaning for artificial turf in common areas or managed properties within the service area. Identify the synthetic surfaces and provide the association’s access requirements, the areas included in the request, and the person authorized to approve the work.' },
        { question: 'What determines the recurring maintenance schedule?', answer: 'Pet use, foot traffic, debris buildup, surface condition, and the property’s operating hours guide the schedule. A heavily used dog area and a low-traffic entrance lawn should be assessed separately.' },
      ],
    },
  },
  {
    slug: 'indian-wells',
    name: 'Indian Wells',
    placeType: 'City',
    neighborhoods: ['Indian Wells Country Club', 'Desert Horizons', 'Toscana', 'Eldorado', 'The Vintage Club', 'The Reserve'],
    coverage: 'We cover Indian Wells neighborhoods and residential communities within the Palm Desert service area, including properties around Highway 111 and the city’s country club communities. For a gated property, share the service entrance and authorization contact with your address.',
    residential: {
      summary: "Artificial turf cleaning in Indian Wells for pet yards, poolside borders, and decorative lawns. Request care suited to your turf and your community’s access requirements.",
      sections: [
        { title: "Pools and patios", body: "Include turf edges beside paving, pool coping, and landscape beds in your quote, along with furniture that may need moving." },
        { title: "Putting greens and pet lawns", body: "Identify each turf type so cleaning and grooming suit the installed surface. Flag loose seams or worn fibers for separate assessment." },
        { title: "Country club access", body: "For Desert Horizons, Toscana, or another gated community, arrange vendor authorization and a local contact before your appointment." },
      ],
      faqs: [
        { question: 'Do you serve gated communities in Indian Wells?', answer: 'Yes, properties within Indian Wells coverage can request service. Include the full address, authorized entrance, vendor registration requirements, and an access contact when booking. Access rules vary by community.' },
        { question: 'Can I book cleaning for a putting green and a pet lawn together?', answer: 'Include both in the quote request, with separate measurements and photos. The turf construction and intended use should be reviewed for each surface; they may need different cleaning or grooming methods.' },
        { question: 'Will cleaning fix a loose seam beside my patio?', answer: 'A loose seam is a repair issue. Send a close-up photo so it can be distinguished from dirt, odor, or matting. Cleaning should not be presented as a replacement for correcting damaged installation details.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in Indian Wells for managed communities, guest areas, and pet spaces. Plan service around vendor access, nearby finishes, and guest schedules.",
      sections: [
        { title: "Guest areas", body: "Identify equipment access, movable furniture, and adjacent finishes. Agree on a service window and who will reopen the area." },
        { title: "Specialty synthetic surfaces", body: "List artificial lawns and putting surfaces separately, with manufacturer guidance where available. Natural golf-course grass is outside this cleaning scope." },
        { title: "Recurring odor", body: "Mark pet-use zones and recurring odor locations so the quote addresses affected areas and gives your team a clear maintenance record." },
      ],
      faqs: [
        { question: 'Can a property manager coordinate the visit without the owner present?', answer: 'A property manager can serve as the access and approval contact. Provide permission to access the turf, the approved work scope, utility details, and who will receive any follow-up questions.' },
        { question: 'Does this service include natural golf-course turf?', answer: 'These pages describe artificial turf cleaning. Identify synthetic common areas, pet spaces, or recreation surfaces in your request; natural grass maintenance is a different scope.' },
        { question: 'Can work be planned around guest arrival times?', answer: 'Include arrivals and operating hours in the request. Confirm the available service window and reopening requirements during scheduling rather than relying on a fixed drying-time assumption.' },
      ],
    },
  },
  {
    slug: 'bermuda-dunes',
    name: 'Bermuda Dunes',
    placeType: 'Place',
    neighborhoods: ['Bermuda Dunes Country Club', 'Country Club Drive corridor', 'Washington Street corridor', '42nd Avenue neighborhoods'],
    coverage: 'Bermuda Dunes is an unincorporated Riverside County community between Palm Desert, Indio, and La Quinta, south of I-10. We include its neighborhoods within the Palm Desert service area. Send the actual property address rather than relying only on a mailing-city name, especially around community boundaries.',
    residential: {
      summary: "Artificial turf cleaning in Bermuda Dunes for pet yards, front lawns, and outdoor gathering spaces. Request help with windblown debris, odor, or flattened turf.",
      sections: [
        { title: "Landscape grit", body: "Photos of turf borders help distinguish loose landscape grit from installed infill and identify where debris keeps entering the lawn." },
        { title: "Side-yard pet areas", body: "A narrow dog run may need focused odor treatment even when the rest of your lawn only needs routine cleaning." },
        { title: "Community access", body: "Send the street address and approved entrance, especially when your Bermuda Dunes property uses a neighboring city’s mailing address." },
      ],
      faqs: [
        { question: 'Is Bermuda Dunes part of your Palm Desert service area?', answer: 'Yes. Bermuda Dunes and its neighborhoods are included. If the mailing address uses a nearby city name, send the street address and community name so we can confirm the correct location and access.' },
        { question: 'Can you remove sand without removing all the turf infill?', answer: 'The existing turf and infill should be checked before choosing a cleaning method. Share the product information if available. Loose debris and intentional infill are not interchangeable, and the work should preserve the installation’s specified requirements.' },
        { question: 'Should I add more infill before a cleaning visit?', answer: 'Ask for a surface assessment first if you are unsure what is already installed. Adding an unknown material can complicate the work. Photos and the manufacturer’s infill specification are more helpful starting points.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in Bermuda Dunes for HOA grounds, managed properties, and business pet areas. Coordinate cleaning with landscape work and the areas you maintain.",
      sections: [
        { title: "Landscape schedules", body: "Schedule turf cleaning after pruning or blowing where possible, so neighboring landscape work does not immediately cover the surface again." },
        { title: "Shared and private turf", body: "Separate association dog areas and entrance lawns from resident yards, with measurements and an approving contact for each scope." },
        { title: "Site details", body: "Provide the exact address, service entrance, and available water access. Flag utility restrictions before scheduling a Bermuda Dunes property." },
      ],
      faqs: [
        { question: 'What should an HOA include in a Bermuda Dunes quote request?', answer: 'Send a property plan or photos, turf measurements by zone, pet-use details, the areas under association responsibility, and vendor access requirements. Include a contact who can approve the scope.' },
        { question: 'Can landscaping and turf cleaning be scheduled together?', answer: 'Share the existing landscape-maintenance schedule when requesting service. The sequence should keep fresh cuttings or blown debris from landing on turf immediately after cleaning.' },
        { question: 'Do you need an outdoor water source?', answer: 'Tell us what water access is available and any restrictions before scheduling. If access is unavailable, the service requirements need to be reviewed with the team during the quote process.' },
      ],
    },
  },
  {
    slug: 'la-quinta',
    name: 'La Quinta',
    placeType: 'City',
    neighborhoods: ['La Quinta Cove', 'La Quinta Village', 'North La Quinta', 'PGA West area'],
    coverage: 'Coverage includes La Quinta neighborhoods within the Palm Desert service area, from the Cove and Village to North La Quinta and the PGA West area. Share the address for properties near the southern or eastern edge so coverage and the correct access route can be confirmed.',
    residential: {
      summary: "Artificial turf cleaning in La Quinta for pet yards, everyday backyards, and seasonal homes. Request a quote for Cove properties, gated communities, or guest-ready outdoor spaces.",
      sections: [
        { title: "Compact yards", body: "For Cove yards or narrow side gates, share an access photo so the visit can account for steps, furniture, and hose routes." },
        { title: "Guest arrivals", body: "Include your return or turnover date when booking, allowing time for cleaning and the service’s reopening instructions before guests arrive." },
        { title: "Recreation turf", body: "List putting greens separately from landscape turf. Identify uneven areas or open seams so cleaning and repair needs can be assessed separately." },
      ],
      faqs: [
        { question: 'Do you cover La Quinta Cove and North La Quinta?', answer: 'Yes. La Quinta Cove, the Village, North La Quinta, and neighborhoods within the outlined service area can request cleaning. Share the street address to confirm properties near the outer boundary.' },
        { question: 'Can cleaning be arranged between rental stays?', answer: 'Include the checkout and next-arrival times, access contact, and affected turf areas in the request. The available appointment and product-specific reopening instructions must fit that window.' },
        { question: 'What photos help with a La Quinta turf quote?', answer: 'Send an overall yard photo, close-ups of odor or matting areas, approximate measurements, and the access path. Identify putting greens or other specialty turf separately from landscape grass.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in La Quinta for managed rentals, HOA spaces, and hospitality properties. Request service around guest turnover, gated access, and specialty synthetic surfaces.",
      sections: [
        { title: "Rental turnovers", body: "Have your property team note pet waste, odor locations, and visible damage between stays, then send the findings with your cleaning request." },
        { title: "Putting and landscape turf", body: "Separate synthetic putting greens from higher-pile lawns and pet areas. Share manufacturer guidance so the proposed care fits each surface." },
        { title: "Multiple properties", body: "For sites across the Cove, North La Quinta, and gated communities, provide each address’s vendor hours, entrance, and access contact." },
      ],
      faqs: [
        { question: 'Can you quote a La Quinta rental-property portfolio?', answer: 'Provide each address, separate turf measurements, photos, typical pet use, and turnover or access restrictions. The quote can distinguish one-time cleaning from an ongoing maintenance request by property.' },
        { question: 'Should the property be unoccupied during cleaning?', answer: 'The treatment area needs to be accessible and kept out of use according to the service instructions. Discuss how residents or guests will be separated from the work area before scheduling.' },
        { question: 'Will one maintenance interval suit every property?', answer: 'Not necessarily. A pet-friendly rental with frequent use may need a different plan from a lightly used decorative courtyard. Base each interval on condition, traffic, and the operating calendar.' },
      ],
    },
  },
  {
    slug: 'indio',
    name: 'Indio',
    placeType: 'City',
    neighborhoods: ['Downtown Indio', 'North Indio', 'Central Indio', 'South Indio'],
    coverage: 'We cover Indio neighborhoods within the Palm Desert service area, including residential and managed properties north and south of I-10 and around central Indio. Send the street address for homes on the outer northern or eastern edge; a city name or ZIP code alone does not define the service boundary.',
    residential: {
      summary: "Artificial turf cleaning in Indio for pet yards, family backyards, and guest spaces. Request help with odor, dusty surfaces, or flattened paths before your next gathering.",
      sections: [
        { title: "Busy backyard paths", body: "Identify flattened routes between doors, patios, and gates. Grooming may address matting; torn fibers and lifted edges need separate assessment." },
        { title: "Dust and pet odor", body: "Point out odor hotspots alongside general dust buildup so your quote separates whole-yard debris removal from focused pet-area treatment." },
        { title: "Gatherings and guest stays", body: "Share the date your yard needs to be ready, with enough time for cleaning and the required reopening instructions." },
      ],
      faqs: [
        { question: 'Do you serve Indio properties on both sides of I-10?', answer: 'Indio coverage includes neighborhoods north and south of I-10 within the service area. Provide the property address to confirm locations near the northern or eastern boundary.' },
        { question: 'Can I request cleaning before a backyard event?', answer: 'Yes. Include the event date and when the yard needs to be available. Confirm an appointment that allows the work and required reopening instructions to be completed before the gathering.' },
        { question: 'Should I use a household cleaner on pet odor first?', answer: 'Check the turf manufacturer’s instructions before applying a product. Tell us what has already been used, and avoid mixing cleaners. Photos, pet-use details, and a description of the odor are useful for the quote.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in Indio for managed properties, pet facilities, and outdoor gathering areas. Plan routine care or cleaning around busy periods and event schedules.",
      sections: [
        { title: "Event cleanup", body: "After furniture and equipment are removed, note spills, litter, flattened paths, and damage so the quote reflects the work needed." },
        { title: "Shared pet spaces", body: "Identify heavily used entrances and fence lines, plus an alternate pet area during cleaning. Set maintenance intervals around actual use." },
        { title: "Property portfolios", body: "Keep access gates, utility locations, and operating hours specific to each Indio address, with one approving contact for your portfolio." },
      ],
      faqs: [
        { question: 'Can you quote cleaning around an Indio event schedule?', answer: 'Send the setup, event, and breakdown dates along with the turf area and expected access. Discuss the available service window and inspection needs before assuming work can happen on a particular day.' },
        { question: 'What should staff do between professional cleanings?', answer: 'Keep up routine waste and loose-litter removal using the installation’s care instructions. Record recurring odor, matting, or drainage concerns so the next service review can address specific zones.' },
        { question: 'Does turf cleaning repair damage from temporary equipment?', answer: 'Cleaning and grooming address removable contamination and some surface matting. Tears, open seams, base damage, and permanent fiber damage require a separate assessment.' },
      ],
    },
  },
  {
    slug: 'coachella',
    name: 'Coachella',
    placeType: 'City',
    neighborhoods: ['Downtown Coachella', 'Rancho Las Flores', 'La Colonia', 'Tierra del Sol', 'Paseo de las Palmas'],
    coverage: 'Coverage includes the City of Coachella and its neighborhoods within the eastern part of the Palm Desert service area, including the communities listed below. “Coachella” here means the city, not the entire Coachella Valley. Confirm the property address for locations near the eastern or southern service boundary.',
    residential: {
      summary: "Artificial turf cleaning in the City of Coachella for pet areas, front lawns, and family backyards. Request a quote for odor, debris, or matted turf.",
      sections: [
        { title: "Dust and debris", body: "Show where dirt enters from gates or landscape beds, so recurring buildup can be considered alongside surface cleaning." },
        { title: "Focused yard care", body: "Request a quote for your pet strip, play area, or whole lawn, with separate measurements and the concerns in each space." },
        { title: "Drainage concerns", body: "Include photos of standing water, uneven spots, or lifted edges. These may need a separate assessment alongside your cleaning request." },
      ],
      faqs: [
        { question: 'Do you serve Coachella neighborhoods such as Rancho Las Flores and La Colonia?', answer: 'Yes, those neighborhoods and other properties within the City of Coachella service area can request cleaning. Share the street address to confirm coverage at the outer boundary.' },
        { question: 'Does Coachella coverage mean the whole Coachella Valley?', answer: 'No. This page refers to the City of Coachella. The Palm Desert service area also includes Indian Wells, Bermuda Dunes, La Quinta, Indio, and the northern Sun City Palm Desert / Desert Palms area; addresses outside that coverage require confirmation.' },
        { question: 'Can a smaller pet area be quoted separately from the front lawn?', answer: 'Yes. Provide separate measurements or photos and describe the issue in each space. That lets the quote clearly state which areas and services are included.' },
      ],
    },
    commercial: {
      summary: "Commercial turf cleaning in the City of Coachella for managed housing, business entrances, and shared pet spaces. Request a quote for the synthetic areas you maintain.",
      sections: [
        { title: "Shared outdoor areas", body: "Send measurements, photos, and recurring complaints for your entrance lawn, courtyard, or dog area, with a contact authorized to approve work." },
        { title: "Resident and customer access", body: "Plan access around doors and shared walkways. Confirm temporary closures and reopening instructions before residents or customers use the area." },
        { title: "Cleaning and repairs", body: "List odor, matting, staining, and standing water separately so the quote distinguishes cleaning work from seam or base repairs." },
      ],
      faqs: [
        { question: 'Do you cover commercial properties in the City of Coachella?', answer: 'Yes, request a quote for an address within the city service area. For a property near the eastern or southern edge, the street address is needed to confirm coverage and scheduling.' },
        { question: 'Can a small apartment dog area receive its own quote?', answer: 'Yes. Provide the approximate turf size, pet-use details, access information, and current condition. A small shared pet area can be scoped separately from other landscaping.' },
        { question: 'What if our property has several turf problems?', answer: 'List each concern with photos and its location. Separating odor, debris, matting, and drainage or seam damage helps determine which items belong in the cleaning scope and which need a separate assessment.' },
      ],
    },
  },
];

export function getPalmDesertArea(slug: string): PalmDesertArea | undefined {
  return palmDesertAreas.find((area) => area.slug === slug);
}

export function palmDesertPath(area: PalmDesertArea, commercial = false): string {
  const base = commercial ? '/commercial-turf-cleaning/palm-desert' : '/locations/palm-desert';
  if (area.slug === PALM_DESERT_REGION_SLUG) return base;
  return `${base}/${commercial ? 'commercial-turf-cleaning-in-' : 'turf-cleaning-in-'}${area.slug}`;
}

export function palmDesertPageMetadata(area: PalmDesertArea, commercial = false) {
  return {
    title: `${commercial ? 'Commercial Turf' : 'Artificial Turf'} Cleaning in ${area.name}, CA`,
    description: commercial
      ? `Commercial turf cleaning in ${area.name}, CA for managed properties, pet areas and guest spaces. Discuss access, service scope and recurring care. Get a quote.`
      : `Artificial turf cleaning in ${area.name}, CA. Help with pet odor, debris and flattened turf, plus neighborhood coverage and practical care guidance. Get a quote.`,
    path: palmDesertPath(area, commercial),
  };
}
