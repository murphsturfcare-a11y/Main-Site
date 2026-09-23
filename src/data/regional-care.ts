// Geographic coverage follows locations.ts. These sources distinguish cities
// and county communities; the care guidance describes property conditions to
// check, not claimed local project history or measured treatment outcomes.
export const regionalGeographicSources = [
  'https://rivco.gov/cities',
  'https://www.contracosta.ca.gov/1243/View-Cities-Communities-of-Contra-Costa',
  'https://www.saccounty.gov/us/en/County-Information-and-Maps.html',
  'https://planning.saccounty.gov/us/en/planning-environmental-review/resources/library/maps.html',
];

export interface RegionalCare {
  intro: string;
  climate: string;
  challenges: { title: string; description: string }[];
  commercial: string;
}

export const regionalCare: Record<string, RegionalCare> = {
  'huntington-beach': {
    intro: 'The Orange County / LA service area covers the coastal corridor and nearby inland communities, including Huntington Beach. A beach-adjacent lawn can receive tracked sand, while a shaded courtyard or an inland pet yard may present a different problem. Describe what is happening at your property so the quote follows the actual surface conditions rather than assuming every Orange County lawn needs the same treatment.',
    climate: 'Compare exposed turf with shaded areas and note whether sand, leaf litter, or persistent dampness is present. Plan cleaning around the condition of the installation and its manufacturer guidance.',
    challenges: [
      { title: 'Tracked sand and landscape grit', description: 'For properties where beach visits or adjoining landscape beds bring grit onto the lawn, identify the entry path and the affected edges. Loose sand should be distinguished from specified infill before removal. Include a close-up and a wider yard photo so a debris-cleaning request can be scoped without assuming the whole lawn needs infill replacement.' },
      { title: 'Shaded courtyards and drainage', description: 'Check whether a shaded strip stays wet after the rest of the turf dries. Tell us when the problem appears, whether water collects at a wall or threshold, and how that area is used. Cleaning surface material may help with upkeep, but persistent pooling or drainage faults deserve a separate assessment.' },
      { title: 'Access beside homes and shared buildings', description: 'A narrow side gate, a courtyard reached through common areas, or a rooftop installation can affect the service plan. Provide the route to the turf, parking instructions, water access, and any building requirements. For specialty installations, share the product and drainage details before work is agreed.' },
      { title: 'Pet areas versus decorative lawns', description: 'Separate regularly used pet zones from low-traffic decorative turf when requesting a quote. Note waste-pickup habits, odor locations, and any products already applied. The maintenance frequency can then reflect how each area is used instead of treating an entire property as one identical surface.' },
    ],
    commercial: 'For coastal hotels, managed courtyards, and inland business properties, map each synthetic surface and its access route. Coordinate guest circulation, vendor hours, utility access, and any rinse-water restrictions with the property manager. A pet-relief area and a decorative entrance lawn can be quoted with different work and service intervals.',
  },
  murrieta: {
    intro: 'The Murrieta service area connects Inland Empire communities from Temecula and French Valley through Riverside and the surrounding cities listed below. Turf care should distinguish everyday pet use, windblown debris, matted traffic paths, and installation problems. Send the property address with the request so the correct regional contact and service coverage can be confirmed.',
    climate: 'During hot or windy periods, note surface conditions, debris sources, and available service windows. Cleaning does not make turf heat-proof, and a dry-looking surface does not replace product-specific return-to-use instructions.',
    challenges: [
      { title: 'Windblown material at the lawn edge', description: 'Look for repeated buildup where turf meets gravel, bare soil, or planted beds. Photograph those transitions and explain whether material returns after wind or other landscape work. Removing debris treats what is on the lawn; a recurring source may also need changes to the surrounding landscape or its maintenance sequence.' },
      { title: 'Concentrated pet-use strips', description: 'A narrow side yard can receive more pet use than the larger lawn beside it. Mark the favored spots, describe current waste pickup, and identify any odor that returns after routine rinsing. This makes a focused cleaning scope possible without assuming every part of the property has the same condition.' },
      { title: 'Slopes and runoff paths', description: 'If the lawn is below a slope or retaining wall, photograph deposits and the direction water travels. Persistent pooling, lifted edges, or an uneven base should be recorded separately from surface dirt. Cleaning or grooming should not be sold as a guaranteed solution to an underlying drainage or installation problem.' },
      { title: 'Plan access around the household', description: 'Provide gate instructions, water access, and the time the yard needs to be available. Keep pets away while work is performed and follow the actual treatment instructions before reopening. If furniture or play equipment blocks the turf, agree who will move it and which areas are included in the visit.' },
    ],
    commercial: 'For Inland Empire facilities, separate shared pet areas, building entrances, and recreation surfaces in the work order. Identify the onsite approver and closure plan for each zone. Schools, gyms, and managed communities should supply their surface specifications and operational requirements; cleaning alone does not establish regulatory compliance or repair an installation defect.',
  },
  martinez: {
    intro: 'The Martinez service area extends across Contra Costa communities and the Tri-Valley. Conditions at a shaded East Bay property can differ from a sunny, exposed yard farther inland. The quote should describe the turf itself: leaf buildup, pet-use spots, traffic wear, and whether water drains as expected.',
    climate: 'Compare sunny and shaded areas when documenting the turf. Note leaf fall, recurring wet spots, and the timing of odor concerns rather than assuming one cleaning interval fits the entire East Bay.',
    challenges: [
      { title: 'Leaves beneath trees and furniture', description: 'Check under outdoor furniture and along planted borders, where debris may be less visible than in the center of the lawn. Include the usual landscape-cleanup routine in your request. Removing loose material before other treatment helps define the work, while a recurring leaf source may call for more frequent routine upkeep.' },
      { title: 'Wet patches in shaded areas', description: 'Record how long the affected patch remains wet after rain or rinsing and whether the same issue appears in exposed areas. Do not assume every discoloration is mold or that a cleaning product will correct poor drainage. Photos and installation details help distinguish removable surface material from a separate repair concern.' },
      { title: 'Pet use across changing conditions', description: 'Describe the number of pets, favored spots, and how quickly odor returns after normal care. A frequently used dog run may need a different scope from decorative turf elsewhere on the property. Product selection, application, and reopening instructions should fit the installation and proposed treatment.' },
      { title: 'Separate installations on one property', description: 'A putting green, pet lawn, and entrance strip can use different turf products and infill. Identify each surface and share any care documentation. The cleaning or grooming method should be chosen for the particular surface, especially where wear, loose seams, or an unknown infill material is present.' },
    ],
    commercial: 'East Bay and Tri-Valley property managers should provide an address-by-address surface inventory, gate or building access details, and the person authorized to approve work. Identify specialty gym or play surfaces separately from landscape turf. A cleaning plan can cover debris, odor, and grooming while leaving structural repairs and facility compliance decisions to their appropriate assessment.',
  },
  sacramento: {
    intro: 'Greater Sacramento coverage includes city and unincorporated communities, plus nearby cities such as West Sacramento, Roseville, and Rocklin. Use the property address when arranging service, especially where the mailing city differs from the neighborhood name. Turf maintenance should follow use, debris, and drainage conditions at that site.',
    climate: 'Review turf condition through seasonal changes in heat, rain, and leaf fall. Tell us about persistent wet spots or compacted paths; cleaning does not guarantee drainage performance or a fixed lifespan extension.',
    challenges: [
      { title: 'Seasonal leaf and debris checks', description: 'Inspect the lawn after nearby trees shed leaves and before debris becomes buried beneath furniture or repeated foot traffic. Photograph borders as well as the center of the lawn. Tell us whether a gardener maintains adjacent beds so debris removal and the other landscape work can be placed in a sensible order.' },
      { title: 'Rain reveals drainage problems', description: 'When water remains after rain, note its location and duration and check whether debris is covering an outlet. Surface cleanup may be appropriate, but the turf base and drainage design also matter. Record these symptoms in the request rather than assuming power brushing will fix every puddle.' },
      { title: 'High-use paths and recreation surfaces', description: 'Compare paths between doors, gates, and play areas with less-used turf. Grooming may improve serviceable matting, while damaged fibers, seams, and base movement need a separate discussion. If the area is a putting green or other specialty surface, provide its product specifications before choosing a maintenance method.' },
      { title: 'Use the street address for routing', description: 'Coverage spans several cities and named communities. Include the street address, neighborhood if helpful, water access, and the approved entrance for a managed property. This gives the team useful scheduling information without relying on a ZIP code to describe the entire service area.' },
    ],
    commercial: 'For Greater Sacramento portfolios, identify each property by address and list the synthetic areas by use. Shared pet zones, playgrounds, fitness turf, and entrance landscaping may require different work and access windows. Confirm the approving manager, closure and reopening responsibilities, and any documentation the property needs before the visit.',
  },
  'palm-desert': {
    intro: 'The Palm Desert service area covers Indian Wells, Bermuda Dunes, La Quinta, Indio, and Coachella, plus Sun City Palm Desert / Desert Palms north of I-10. Turf care should separate windblown dirt from installed infill, and a daily pet area from decorative turf at a seasonal property. Send the street address rather than a mailing city so coverage near the boundary can be confirmed.',
    climate: 'After wind or a dust event, note where material collects and whether it returns before the next visit. Cleaning addresses debris, odor, and turf condition; it does not make a lawn heat-proof or replace the manufacturer guidance.',
    challenges: [
      { title: 'Blown dirt versus installed infill', description: 'Photograph the borders where turf meets gravel, rock, or planted beds, and the gates where dirt enters the lawn. Loose grit and the specified infill are not interchangeable, so identify both before a cleaning method is chosen. Note whether buildup returns after wind, since the source may sit in the surrounding landscape.' },
      { title: 'Odor in the spots pets use most', description: 'Mark the favored corners, fence lines, and side-yard runs, and say how soon odor returns after normal rinsing and waste pickup. A narrow dog run can need focused treatment while the rest of the lawn needs routine cleaning. Tell us which products have been applied before another is added.' },
      { title: 'Standing water, seams, and unknown infill', description: 'Photograph standing water, uneven spots, and lifted edges, and note how long water stays after rain or rinsing. List these separately from odor, debris, and matting so the quote can distinguish cleaning from a seam or base repair. If the installed infill is unclear, ask for a surface assessment.' },
      { title: 'Gated access and seasonal timing', description: 'For a country club or association property, arrange vendor authorization and the approved entrance before the appointment, since access rules vary by community. Confirm outdoor water access and a local contact at the same time. For a seasonal home or rental, give the return date so the reopening instructions fit before anyone arrives.' },
    ],
    commercial: 'For HOA grounds, managed rentals, and hospitality properties, list association turf separately from private yards, keeping dog areas, entrances, and courtyards distinct in the work order. Give each address its vendor entrance, service hours, water access, and the contact who approves the scope. Plan work before busy occupancy periods, and list synthetic putting surfaces separately.',
  },
};

// Each note addresses a supported geographic distinction, not a fictional
// customer, neighborhood project, or claim about every property in a city.
const cityGroups = [
  { cities: ['Huntington Beach','Newport Beach','Long Beach','Seal Beach','Laguna Beach','Dana Point','San Clemente'], title: 'For a property near the coast', text: 'If sand is tracked onto the lawn, show the path from the entrance to the affected area and identify the existing infill. A beach-adjacent property may also have tight access or shared outdoor space. Include those details in the quote; being in a coastal city does not mean every lawn needs the same treatment.' },
  { cities: ['Costa Mesa','Irvine','Fountain Valley','Garden Grove','Westminster','Anaheim'], title: 'For inland Orange County properties', text: 'This address is routed through the Huntington Beach / LA service area, but the cleaning scope follows your property. Focus on pet use, shaded areas, landscaping debris, and access rather than assuming a beach-sand problem. A courtyard or business entrance can be assessed separately from a backyard pet lawn.' },
  { cities: ['French Valley','Temescal Valley','Winchester','Fallbrook'], title: 'Confirm the community and access route', text: 'Provide the street address and community name together, especially if your mailing address uses a nearby city. Include any long driveway, gated entrance, or separate turf areas in the request. The Murrieta regional number handles the inquiry and can confirm coverage and the service scope for that address.' },
  { cities: ['Murrieta','Temecula','Menifee','Lake Elsinore','Hemet','Perris','Wildomar','Canyon Lake','Corona','Riverside','Moreno Valley','San Jacinto','Beaumont','Eastvale','Norco'], title: 'Plan the work by turf area', text: 'For an Inland Empire property, identify the pet-use strip, decorative lawn, and recreation surface separately. Send close-ups of any matted paths or deposits along landscape borders. If access involves an association gate or a sloped route, include that in the request so it can be considered before scheduling.' },
  { cities: ['Dublin','Livermore','Pleasanton','San Ramon','Danville'], title: 'Tri-Valley service coordination', text: 'These inquiries use the Martinez / Bay Area contact. Supply the property address, the type of synthetic surface, and any association or building-access requirements. For a portfolio spanning several Tri-Valley addresses, separate the work and access instructions by site rather than assuming the same maintenance schedule or vendor entrance applies everywhere.' },
  { cities: ['Martinez','Concord','Pleasant Hill','Walnut Creek','Antioch','Brentwood','Lafayette','Orinda','Alamo','Oakley'], title: 'Compare shade, leaf fall, and pet use', text: 'Within the Contra Costa coverage area, the useful comparison is between parts of your own property. Photograph a recurring wet patch, leaf accumulation, or pet-use area alongside an unaffected section. Those observations help distinguish routine debris removal, odor treatment, and any separate drainage or repair concern.' },
  { cities: ['Carmichael','Fair Oaks','Granite Bay','Natomas','Orangevale'], title: 'Use your neighborhood with the full address', text: 'These named communities are served through the Greater Sacramento area. Include the street address and access contact rather than relying on the neighborhood label alone. If you manage more than one property, record turf size, intended use, and water access for each address so the work order is specific.' },
  { cities: ['Palm Desert','Indian Wells','Bermuda Dunes','La Quinta','Indio','Coachella'], title: 'Separate desert debris from the installed surface', text: 'For a desert property, photograph the borders where windblown dirt collects and note how soon it returns after wind. Record standing water, lifted edges, and unknown infill separately from odor or matting. In a gated or country club community, include the approved vendor entrance, the local contact, and the return date for a seasonal home.' },
  { cities: ['Sacramento','Elk Grove','Roseville','Folsom','Rancho Cordova','Citrus Heights','West Sacramento','Rocklin'], title: 'Coordinate seasonal and regular upkeep', text: 'For this Greater Sacramento service address, note whether the main issue changes after rain, leaf fall, or repeated use of the same path. Record drainage concerns separately from debris or matting. Your quote can then identify the appropriate cleaning work and any condition that needs another kind of assessment.' },
];

export function cityCareContext(city: string) {
  return cityGroups.find((group) => group.cities.includes(city));
}
