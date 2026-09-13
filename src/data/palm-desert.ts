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

// Dedicated Palm Desert inquiry line confirmed by the business (2026-09-13).
// Keep in sync with the palm-desert entry in locations.ts. Do not infer a new office address.
export const PALM_DESERT_PHONE = '925-588-6546';
export const PALM_DESERT_REGION_SLUG = 'palm-desert';

export const palmDesertAreas: PalmDesertArea[] = [
  {
    slug: 'palm-desert',
    name: 'Palm Desert',
    placeType: 'City',
    neighborhoods: ['South Palm Desert', 'Palm Desert Country Club', 'Palm Valley', 'Desert Falls', 'Indian Ridge', 'Sun City Palm Desert / Desert Palms'],
    coverage: 'Palm Desert is the main service area, with coverage through Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella. We include neighborhoods within this area and the Sun City Palm Desert / Desert Palms community north of I-10. Neighborhood examples below are not an exhaustive list; send your address if you are near the service boundary.',
    residential: {
      summary: "Murphy's Turf offers artificial turf cleaning in Palm Desert and nearby communities for pet yards, decorative lawns, and backyard recreation areas. Tell us whether the problem is odor, loose desert debris, or flattened fibers so we can quote the work your yard needs. We also coordinate access for gated communities and seasonal properties.",
      sections: [
        { title: 'A practical plan for desert debris', body: 'Start with what is on the turf and what is mixed into it. Loose leaves and windblown dirt call for debris removal; recurring gritty patches may need closer inspection of nearby landscape beds, infill, and drainage. Photograph the same patch before and after routine yard cleanup. That helps distinguish a one-time wind event from material repeatedly moving onto the lawn.' },
        { title: 'Pet yards and outdoor living spaces', body: 'A dog run beside a patio needs a different maintenance plan from a decorative front lawn. Tell us how many pets use the space, where they usually go, and whether odor returns after rinsing. We can focus the quote on the affected area instead of assuming every square foot needs the same work. Prompt waste pickup remains part of care between appointments.' },
        { title: 'Seasonal homes and gated access', body: 'For a home in Palm Desert Country Club, Indian Ridge, or another managed community, include the approved entrance, access contact, water location, and any permitted service hours. If you are preparing for a seasonal return, allow time to inspect the yard before guests arrive. Cleaning can improve surface condition, but damaged seams, worn fibers, and underlying drainage faults may need a separate repair.' },
      ],
      faqs: [
        { question: 'Which communities are included in the Palm Desert service area?', answer: 'Palm Desert, Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella are included, along with neighborhoods within the service area. The northern coverage includes Sun City Palm Desert / Desert Palms. Send your street address to confirm an appointment near the outer edge.' },
        { question: 'Do you clean turf in Sun City Palm Desert?', answer: 'Sun City Palm Desert / Desert Palms is included in the Palm Desert coverage area. Provide the property address and community access instructions when requesting a quote so the service visit can be coordinated.' },
        { question: 'Can cleaning make artificial turf cooler in summer?', answer: 'Cleaning is for debris, odor, and turf condition; it does not make a synthetic lawn heat-proof. Plan outdoor use around actual surface conditions and follow the turf manufacturer’s care guidance. Discuss cleaning access and scheduling separately from when people or pets will use the yard.' },
      ],
    },
    commercial: {
      summary: 'Commercial turf cleaning in Palm Desert for HOA common areas, managed rental properties, hospitality spaces, and pet-use areas. A useful maintenance plan identifies the surface, traffic pattern, access window, and person responsible for reopening the space. Request a quote for a single property or a group of addresses within the service area.',
      sections: [
        { title: 'Separate common areas from private yards', body: 'A community can have several turf owners and maintenance responsibilities. Before quoting, identify which dog areas, entrance strips, courtyards, and private yards fall under your contract. Provide a marked property plan or photos with approximate measurements. This keeps a board-approved common-area scope distinct from individual homeowner requests and makes competing quotes easier to compare.' },
        { title: 'Plan around seasonal occupancy', body: 'For a seasonal community or guest-facing property, schedule a condition review before your busiest occupancy period. Walk the busiest entrances and pet zones, then note debris, odor reports, worn paths, and damaged edges separately. A lighter-use decorative lawn may need a different interval from a daily pet-relief area. Build the schedule around observed use and condition.' },
        { title: 'Make the service handoff clear', body: 'List the onsite contact, approved vendor entrance, water access, nearby parking, and any quiet hours. Agree who will close the area, notify residents or guests, and confirm reopening according to the treatment instructions. For a property portfolio, attach these details to each address rather than assuming all communities use the same access rules.' },
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
      summary: 'Artificial turf cleaning in Indian Wells should account for the way your outdoor space is used: a small pet yard, a poolside border, and a decorative lawn need different attention. Request debris removal, help with pet odor, or care for flattened fibers, with access arranged around your community and property schedule.',
      sections: [
        { title: 'Small turf spaces beside pools and patios', body: 'The visible edge matters as much as the center of the lawn. Take photos of transitions to paving, pool coping, and landscape beds so the quote includes areas where debris collects. Identify furniture and portable planters that may need moving. Let the crew know about nearby finished surfaces and the turf manufacturer’s cleaning requirements before products or equipment are selected.' },
        { title: 'Match grooming to the installed surface', body: 'A putting green and a longer-pile pet lawn are different installations. Share the turf model if you have it, along with any infill information. Do not assume the same brushing intensity or top-up material is suitable for both. Flat traffic lanes can warrant grooming, while broken seams or permanent fiber wear should be identified before cleaning is proposed as the answer.' },
        { title: 'Prepare a gated or seasonal property', body: 'Indian Wells includes established residential country clubs such as Desert Horizons and Toscana. For a visit, arrange vendor authorization with the person responsible for your property and specify water access. If you are away, provide a local contact who can resolve a locked gate or unavailable utility. Service timing should leave room for the required drying or re-entry instructions before your return.' },
      ],
      faqs: [
        { question: 'Do you serve gated communities in Indian Wells?', answer: 'Yes, properties within Indian Wells coverage can request service. Include the full address, authorized entrance, vendor registration requirements, and an access contact when booking. Access rules vary by community.' },
        { question: 'Can I book cleaning for a putting green and a pet lawn together?', answer: 'Include both in the quote request, with separate measurements and photos. The turf construction and intended use should be reviewed for each surface; they may need different cleaning or grooming methods.' },
        { question: 'Will cleaning fix a loose seam beside my patio?', answer: 'A loose seam is a repair issue. Send a close-up photo so it can be distinguished from dirt, odor, or matting. Cleaning should not be presented as a replacement for correcting damaged installation details.' },
      ],
    },
    commercial: {
      summary: 'Commercial artificial turf cleaning in Indian Wells for managed communities, guest areas, and pet-relief spaces. We help define a service scope around the exact synthetic surfaces you maintain, with attention to vendor access, adjacent finishes, and the time needed before residents or guests return to the area.',
      sections: [
        { title: 'Guest-facing spaces need an access plan', body: 'For a hotel courtyard or shared outdoor lounge, identify the path workers and equipment will use without conflicting with guest circulation. Mark movable furniture, decorative finishes, and nearby food-service areas. Agree on a service window and a reopening contact. A clear handoff helps prevent an area being put back into use before its cleaning instructions have been satisfied.' },
        { title: 'Scope synthetic surfaces accurately', body: 'Country club and resort properties can combine natural grass, artificial landscape turf, and specialty recreation surfaces. A map should label the artificial areas being quoted and their intended use. Exclude natural golf-course turf from a synthetic-turf cleaning scope. Supply manufacturer guidance for putting surfaces or other specialty products instead of assuming a general lawn process fits every installation.' },
        { title: 'Resolve odor complaints by zone', body: 'Record where complaints occur, the time they are noticed, and whether pets regularly use the same spot. Compare those areas with drainage outlets and traffic routes during the site review. This creates a more useful work order than requesting the entire property be sprayed. Retain photos and observations so your next maintenance review can focus on recurring trouble spots.' },
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
      summary: 'Turf cleaning in Bermuda Dunes for residential pet yards, front lawns, and outdoor gathering spaces. Windblown debris and daily pet use can call for different work, so a quote starts with photos and the condition you want addressed. We serve the community through our Palm Desert service area.',
      sections: [
        { title: 'Keep landscape grit separate from infill', body: 'Loose desert landscaping can leave grit along the edge of a synthetic lawn. Before aggressive brushing or adding material, identify what is already in the turf and what is arriving from nearby beds or paths. Photos of the border and the lawn surface help us plan debris removal. A recurring buildup may also need attention from whoever maintains the adjoining landscape.' },
        { title: 'Concentrated pet use in side yards', body: 'A narrow side yard may receive most of a dog’s daily use even when the property has a larger lawn. Mark the favored spots and explain whether odor persists after normal upkeep. The quote can then distinguish routine debris removal from focused odor treatment. Waste pickup and access to the affected strips are important preparation steps; perfume alone does not remove the source material.' },
        { title: 'Use the property address for access', body: 'Bermuda Dunes is a county community rather than an incorporated city. A mailing address or nearby city label may not explain how to reach a gated home. Include the street address, community name if applicable, and a gate contact. For homes near Country Club Drive or Washington Street, specify which entrance is authorized for service vehicles.' },
      ],
      faqs: [
        { question: 'Is Bermuda Dunes part of your Palm Desert service area?', answer: 'Yes. Bermuda Dunes and its neighborhoods are included. If the mailing address uses a nearby city name, send the street address and community name so we can confirm the correct location and access.' },
        { question: 'Can you remove sand without removing all the turf infill?', answer: 'The existing turf and infill should be checked before choosing a cleaning method. Share the product information if available. Loose debris and intentional infill are not interchangeable, and the work should preserve the installation’s specified requirements.' },
        { question: 'Should I add more infill before a cleaning visit?', answer: 'Ask for a surface assessment first if you are unsure what is already installed. Adding an unknown material can complicate the work. Photos and the manufacturer’s infill specification are more helpful starting points.' },
      ],
    },
    commercial: {
      summary: 'Commercial turf cleaning in Bermuda Dunes for HOA grounds, managed properties, and businesses with synthetic pet or recreation areas. The quote should distinguish loose landscape debris, routine traffic wear, and concentrated pet use, then match the work to the property’s access and maintenance responsibilities.',
      sections: [
        { title: 'Coordinate adjoining landscape work', body: 'If blowing, pruning, or landscape-bed maintenance regularly deposits material onto turf, coordinate the order of those tasks with the cleaning visit. Show the boundaries between artificial grass and gravel or planting areas. Removing debris immediately before another contractor blows material back onto the surface creates avoidable repeat work and obscures the source of recurring buildup.' },
        { title: 'Define common-area and homeowner scopes', body: 'For a managed community, list which areas belong to the association and which are privately maintained. A shared pet zone, decorative entrance, and resident backyard should each have an owner for approval and access. Include approximate square footage by zone so the quote reflects actual use rather than treating all synthetic surfaces as one uniform lawn.' },
        { title: 'Document address and utility access', body: 'Because Bermuda Dunes sits beside several neighboring jurisdictions and mailing areas, provide an exact street address and site entrance for every work order. Identify the water source, any hose-routing restrictions, and a responsible onsite contact. If a business has no outdoor utility access, flag that in the initial request so the proposed scope can be assessed before a visit.' },
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
      summary: 'Artificial turf cleaning in La Quinta for everyday backyards, pet spaces, and homes preparing for guests or a seasonal return. From compact Cove yards to larger managed-community properties, the useful starting point is the turf’s condition, its purpose, and how the crew can reach it.',
      sections: [
        { title: 'Compact yards and narrow access', body: 'In a compact yard, turf may sit close to doors, walls, outdoor furniture, and planted borders. Include a photo of the path from the street to the lawn along with the turf itself. Narrow side gates, steps, and hose routes can affect how a cleaning visit is planned. Clearing portable items before the appointment makes the approved work area accessible.' },
        { title: 'Prepare before guests use the yard', body: 'A guest-ready outdoor space needs more than a quick glance at green fibers. Check pet-use areas, shade beneath furniture, and the edges beside paving. Request the visit with enough lead time to address findings and follow the treatment’s reopening instructions. If a property is rented, arrange access through the manager and provide the actual turnover window without assuming immediate reuse.' },
        { title: 'Preserve recreation-surface performance', body: 'Tell us if an area is a putting surface or other specialty synthetic installation. Surface texture, pile height, and infill can differ from the adjacent backyard turf. A cleaning quote should identify those differences before grooming is selected. If the issue is an uneven base, open seam, or worn surface, ask for the condition to be noted separately from removable dirt.' },
      ],
      faqs: [
        { question: 'Do you cover La Quinta Cove and North La Quinta?', answer: 'Yes. La Quinta Cove, the Village, North La Quinta, and neighborhoods within the outlined service area can request cleaning. Share the street address to confirm properties near the outer boundary.' },
        { question: 'Can cleaning be arranged between rental stays?', answer: 'Include the checkout and next-arrival times, access contact, and affected turf areas in the request. The available appointment and product-specific reopening instructions must fit that window.' },
        { question: 'What photos help with a La Quinta turf quote?', answer: 'Send an overall yard photo, close-ups of odor or matting areas, approximate measurements, and the access path. Identify putting greens or other specialty turf separately from landscape grass.' },
      ],
    },
    commercial: {
      summary: 'Commercial turf care in La Quinta for managed rentals, HOA spaces, and hospitality properties. A cleaning plan should fit guest turnover, community access, and the mix of decorative turf, pet areas, and recreation surfaces at the property. Send a site list and the operating windows that matter to your team.',
      sections: [
        { title: 'Build a turnover checklist for turf', body: 'Housekeeping and outdoor maintenance may be handled by different teams. Add a turf condition check to the property handoff: pet waste removed, loose items identified, odor locations noted, and damage photographed. Route those observations to one approving manager. This helps a cleaning quote address a specific issue instead of arriving as an unscoped last-minute turnover request.' },
        { title: 'Keep recreation surfaces distinct', body: 'A property can have a synthetic putting green alongside higher-pile landscape turf and a pet area. List each surface and its manufacturer guidance. Equipment and products should be selected for the surface being serviced, and damage should be recorded before work. Natural golf-course grass is outside this artificial-turf cleaning scope, even when both are on the same property.' },
        { title: 'Plan for multiple entrances and contacts', body: 'For properties spread across the Cove, North La Quinta, and gated developments, attach access instructions to each address. Include permitted vendor hours and the person who can resolve access issues on the day. Let the team know when guests, residents, or other contractors will be onsite so scheduling can account for shared outdoor space.' },
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
      summary: 'Turf cleaning in Indio for pet yards, busy family backyards, and outdoor spaces used by guests. Tell us what has changed since the last cleaning: stronger odor in a favorite pet spot, debris after wind, or flattened paths near the patio. We use that information to define the service request.',
      sections: [
        { title: 'Follow the traffic through the yard', body: 'Foot traffic often follows the same route from a back door to a patio, play space, or gate. Compare those paths with lower-use areas when photographing flattened turf. Grooming can address some matting, but it is not a remedy for torn fibers or a failed base. Mark any lifted edges so the condition can be reviewed before equipment is used.' },
        { title: 'Separate pet odor from general dust', body: 'A lawn can look dusty across its whole surface while having odor concentrated in only a few spots. Identify the pet-use zones and describe your current waste-pickup routine. That makes it easier to distinguish a general debris-cleaning scope from focused treatment. Avoid adding unfamiliar chemicals before the visit; share any products already applied so compatibility can be considered.' },
        { title: 'Plan around visitors and busy weekends', body: 'If the yard is used for gatherings or a guest stay, allow time for an inspection and cleaning before the event. Move temporary furniture and note spills or concentrated wear afterward. A post-visit review can help decide whether the turf needs debris removal, grooming, or a different repair. Do not treat a quick visual improvement as proof that every underlying issue has been resolved.' },
      ],
      faqs: [
        { question: 'Do you serve Indio properties on both sides of I-10?', answer: 'Indio coverage includes neighborhoods north and south of I-10 within the service area. Provide the property address to confirm locations near the northern or eastern boundary.' },
        { question: 'Can I request cleaning before a backyard event?', answer: 'Yes. Include the event date and when the yard needs to be available. Confirm an appointment that allows the work and required reopening instructions to be completed before the gathering.' },
        { question: 'Should I use a household cleaner on pet odor first?', answer: 'Check the turf manufacturer’s instructions before applying a product. Tell us what has already been used, and avoid mixing cleaners. Photos, pet-use details, and a description of the odor are useful for the quote.' },
      ],
    },
    commercial: {
      summary: 'Commercial artificial turf cleaning in Indio for property managers, pet-use facilities, hospitality spaces, and outdoor gathering areas. The right scope separates everyday maintenance from extra traffic during busy operating periods, then assigns clear responsibilities for access, cleanup, and reopening.',
      sections: [
        { title: 'Use before-and-after event inspections', body: 'For an outdoor venue or guest property, photograph the synthetic surface before temporary furniture and equipment are placed. After the busy period, mark spills, embedded litter, flattened paths, and lifted edges separately. This provides a useful cleaning work order and identifies damage that needs a repair discussion. Extra traffic should be assessed from the actual surface condition, not an assumed fixed cleaning package.' },
        { title: 'Create zones for intensive pet use', body: 'A shared relief area or pet-business yard may have concentration at entrances, fence lines, and favorite spots. Label those zones in the request and describe routine staff waste pickup. Agree how the area will be closed during work and what alternate outdoor space users have available. Cleaning frequency should reflect the load on each zone and the facility’s operating schedule.' },
        { title: 'Give every site its own work order', body: 'A portfolio stretching across Indio can include different access gates, utility locations, and hours. Provide a single approving contact while keeping instructions specific to each address. Include whether the lawn is synthetic landscape turf or a specialty sports surface. Accurate scope details support a useful quote and reduce avoidable access problems on the service day.' },
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
      summary: 'Artificial turf cleaning in the City of Coachella for household pet areas, front lawns, and family backyards. Request a quote based on your turf’s size, current condition, and the problem you want resolved. Coachella is part of our Palm Desert coverage alongside Indio, La Quinta, Bermuda Dunes, and Indian Wells.',
      sections: [
        { title: 'Find where loose debris is coming from', body: 'Check the turf borders as well as the lawn itself. Dirt can be tracked in through a gate or moved from adjoining landscape beds, and a repeat entry point may need ongoing routine attention. Photograph the edge and describe when buildup appears. Debris removal can address the material on the surface without claiming to correct the surrounding landscape or prevent future windblown dust.' },
        { title: 'Prioritize the area your family uses most', body: 'If you are deciding what to include in the quote, identify pet-use strips, play areas, and the path from the back door first. Note odor, litter, and matting as separate concerns. You can request a focused scope or a whole-yard assessment; the useful choice depends on the condition and layout, rather than a city-wide assumption about how every yard is used.' },
        { title: 'Know when a cleaning is not a drainage repair', body: 'Persistent standing water, lifting edges, and uneven spots deserve their own inspection. Removing surface debris or addressing compacted material may be part of upkeep, but it does not prove the base or outlet works correctly. Include photos taken when the problem is visible. Keep that concern in the quote request so it is not hidden behind a general request to make the lawn look greener.' },
      ],
      faqs: [
        { question: 'Do you serve Coachella neighborhoods such as Rancho Las Flores and La Colonia?', answer: 'Yes, those neighborhoods and other properties within the City of Coachella service area can request cleaning. Share the street address to confirm coverage at the outer boundary.' },
        { question: 'Does Coachella coverage mean the whole Coachella Valley?', answer: 'No. This page refers to the City of Coachella. The Palm Desert service area also includes Indian Wells, Bermuda Dunes, La Quinta, Indio, and the northern Sun City Palm Desert / Desert Palms area; addresses outside that coverage require confirmation.' },
        { question: 'Can a smaller pet area be quoted separately from the front lawn?', answer: 'Yes. Provide separate measurements or photos and describe the issue in each space. That lets the quote clearly state which areas and services are included.' },
      ],
    },
    commercial: {
      summary: 'Commercial turf cleaning in the City of Coachella for managed housing, business entrances, shared pet spaces, and other synthetic landscape areas. A clear quote starts with an exact address, the areas you are responsible for, and the condition of the turf. This city coverage does not imply service throughout the entire valley.',
      sections: [
        { title: 'Make a useful shared-space work order', body: 'Identify the synthetic entrance lawn, courtyard, or pet area and name the person responsible for approving the work. Include measurements, photos, access hours, and recurring complaints. Separate loose trash or routine pet-waste pickup from the deeper cleaning requested. This gives a property manager a concrete scope to review and helps avoid gaps between onsite upkeep and scheduled service.' },
        { title: 'Plan around residents and customers', body: 'A small common area may also be the main walking route into a property. Discuss how users will pass the work area and who will communicate any temporary closure. Identify nearby vehicles, doors, and hardscape before the visit. Reopening should follow the service instructions for the products and conditions on the day, rather than a promised universal drying time.' },
        { title: 'Separate appearance concerns from repairs', body: 'Record matted traffic routes, staining, odor reports, and standing water as different issues. Cleaning may address some surface conditions while a lifted seam or base problem needs another type of work. Include those observations in the quote request and retain them for your maintenance review. That helps you decide where cleaning belongs in the property’s wider upkeep budget.' },
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
