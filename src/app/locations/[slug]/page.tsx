import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  ArrowRight,
  Star,
  ChevronRight,
  CheckCircle,
  PawPrint,
  Leaf,
  ThumbsUp,
  Droplets,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import FAQ from '@/components/sections/FAQ';
import LeadForm from '@/components/forms/LeadForm';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  name: string;
  neighborhood: string;
  rating: number;
  text: string;
}

interface LocationData {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  neighborhoods: string[];
  testimonials: Testimonial[];
  metaTitle: string;
  metaDescription: string;
  serviceAreaDescription: string;
  climateNote: string;
  formId: string;
  mapQuery: string;
  mapEmbedUrl?: string;
  localContentHeading: string;
  localContentIntro: string;
  localChallenges: { title: string; description: string }[];
  localWhyUs: string;
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/gallery/service-pet-hair-debris.jpeg',
    shortDescription:
      'Commercial-grade extraction of pet hair, leaves, dirt, and embedded debris from turf fibers and infill.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/gallery/service-turf-blooming-v2.png',
    shortDescription:
      'Restore flattened fibers and break up compacted infill for better drainage and appearance.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
    shortDescription:
      'Professional-grade disinfecting that eliminates bacteria, pet odors, mold, and mildew at their source.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/gallery/service-turf-deodorizing.png',
    shortDescription:
      'Scheduled weekly or bi-weekly pet waste removal to keep your turf clean and hygienic.',
  },
];

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Schedule Your Estimate',
    description: 'We visit your property',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Enjoy your fresh, clean turf',
  },
];

const galleryImages = [
  { src: '/images/gallery/gallery-01.png', alt: "Murphy's Turf cleaning project — before and after" },
  { src: '/images/gallery/gallery-02.png', alt: "Murphy's Turf cleaning project — turf disinfecting" },
  { src: '/images/gallery/gallery-12.jpeg', alt: "Murphy's Turf — backyard turf with curved patio edge" },
  { src: '/images/gallery/gallery-13.jpeg', alt: "Murphy's Turf — side yard turf with rock border" },
  { src: '/images/gallery/gallery-14.jpeg', alt: "Murphy's Turf — poolside turf with stepping stones" },
  { src: '/images/gallery/gallery-15.jpeg', alt: "Murphy's Turf — backyard putting green by pool" },
  { src: '/images/gallery/gallery-16.jpeg', alt: "Murphy's Turf — front yard turf with dog" },
  { src: '/images/gallery/gallery-05.png', alt: "Murphy's Turf cleaning project — turf restoration" },
];

const locationFaqs = [
  {
    question: 'How often should artificial turf be cleaned?',
    answer:
      'We recommend professional cleaning every 4-6 weeks for homes with pets. For turf without pets, a quarterly deep clean is usually sufficient.',
  },
  {
    question: 'Are your cleaning products safe for pets and kids?',
    answer:
      'Absolutely. Our cleaning solution is chlorine-based with no bleach or ammonia. It leaves no harmful residue, making it safe for pets, children, and the environment.',
  },
  {
    question: 'What does your turf cleaning process include?',
    answer:
      'Our process includes pet hair and debris removal, de-weeding, magnet sweep for metal objects, blooming and de-compacting, and a full disinfect and deodorize treatment.',
  },
  {
    question: 'How long does a cleaning take?',
    answer:
      'Most residential cleanings take 45 minutes to 1.5 hours depending on size and services included. Your turf is safe to use as soon as it dries, usually 1-2 hours.',
  },
  {
    question: 'Do I need to be home during service?',
    answer:
      "No, you don't need to be home. We just need access to the turf area and a water source. We'll send a notification when the job is done.",
  },
  {
    question: 'Do you offer maintenance plans?',
    answer:
      'Yes, we offer weekly, bi-weekly, monthly, and quarterly maintenance plans. Regular plans keep costs predictable and your turf clean year-round.',
  },
];

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = {
  'huntington-beach': {
    city: 'Huntington Beach',
    slug: 'huntington-beach',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    neighborhoods: [
      'Huntington Beach',
      'Newport Beach',
      'Costa Mesa',
      'Long Beach',
      'Seal Beach',
      'Irvine',
      'Fountain Valley',
      'Garden Grove',
      'Westminster',
      'Laguna Beach',
      'Dana Point',
      'San Clemente',
      'Anaheim',
    ],
    testimonials: [
      {
        name: 'Jessica Moreno',
        neighborhood: 'Newport Beach',
        rating: 5,
        text: "Our Newport Beach backyard turf was developing a musty smell from the marine layer moisture and our two labs weren't helping. Murphy's Turf came out with their deep cleaning treatment and the difference was unbelievable. No more mold smell, no pet odor, and the fibers look like new. They understand coastal turf challenges better than anyone we've worked with.",
      },
      {
        name: 'Derek Lawson',
        neighborhood: 'Huntington Beach',
        rating: 5,
        text: "Living near the beach, our turf collects sand constantly and the salt air creates issues other companies don't know how to handle. Murphy's Turf deep extraction removed sand we didn't even know was in there, and the deep cleaning treatment left everything disinfected and fresh. Highly recommend for any coastal homeowner.",
      },
      {
        name: 'Nina Patel',
        neighborhood: 'Costa Mesa',
        rating: 5,
        text: "We have a large pet area in our Costa Mesa backyard that three dogs use daily. The smell was terrible by summer. Murphy's Turf poop scooping service combined with their monthly deep cleaning treatment completely solved the problem. Our yard is actually pleasant to be in again. Outstanding service from start to finish.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Huntington Beach & LA Area | Murphy's Turf",
    metaDescription:
      "Professional artificial turf cleaning in Huntington Beach, Newport Beach, Costa Mesa, Long Beach & Seal Beach. Professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving the LA coastal corridor and Orange County — from Long Beach and Seal Beach through Huntington Beach, Newport Beach, Costa Mesa, Irvine, Fountain Valley, Laguna Beach, Dana Point, San Clemente, and Anaheim.',
    climateNote:
      'Coastal fog and marine layer promote mold, while afternoon sun bakes pet contaminants into infill.',
    formId: 'HYkmRFcmdQ1GD7aEpXzq',
    mapQuery: "Murphy's+Turf+Huntington+Beach+CA",
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=17738077160014500110&output=embed",
    localContentHeading: "Why Huntington Beach Artificial Turf Needs Specialized Care",
    localContentIntro:
      "Huntington Beach sits directly on the Pacific Ocean, which means every artificial turf installation in our service area deals with challenges that inland properties never see. The combination of salt air, wind-blown sand, marine layer moisture, and year-round outdoor use creates a unique set of maintenance demands. Murphy's Turf has cleaned thousands of synthetic lawns along the coastal corridor from Long Beach down through San Clemente, and we have refined our process specifically for the conditions that coastal Orange County properties face. Surf City USA homeowners love their outdoor space, and keeping that turf clean, fresh, and safe for families and pets is what we do every day.",
    localChallenges: [
      {
        title: "Salt Air & Coastal Wind",
        description:
          "Properties within a few miles of the Huntington Beach pier get constant exposure to salt-laden marine air. Salt deposits accumulate on turf fibers, accelerate material degradation, and leave a whitish residue that dulls the turf's color. Onshore winds also carry fine beach sand that works its way into the infill layer, mixing with engineered crumb rubber or silica and clogging drainage. Regular freshwater rinsing is essential, and our professional de-compacting treatment removes the salt and sand buildup that homeowner garden hoses cannot reach.",
      },
      {
        title: "Marine Layer & June Gloom",
        description:
          "From May through July, Huntington Beach experiences the famous 'June Gloom' — thick morning fog that keeps outdoor surfaces damp until early afternoon. This extended moisture exposure creates ideal conditions for mold, mildew, and algae growth, especially in shaded areas near structures or under mature landscaping. Our chlorine-based disinfecting treatment prevents mold establishment and eliminates existing colonies before they spread. Coastal properties benefit from monthly sanitization during the marine layer season.",
      },
      {
        title: "Beach Lifestyle & Pet Traffic",
        description:
          "Huntington Beach is one of the most dog-friendly cities in Southern California, with its famous Dog Beach drawing owners and pets from across the region. Many HB residents have multiple dogs, and the warm coastal climate means year-round backyard use. Pet urine combined with sand tracked in from beach visits creates a specific contamination pattern our team is highly experienced with. Our pet hair and debris removal service, combined with our disinfecting treatment, keeps coastal turf fresh and family-safe.",
      },
      {
        title: "HOA & Property Value Standards",
        description:
          "Properties in Huntington Harbour, Seacliff, Brightwater, and other Huntington Beach communities often have HOA landscaping standards that expect a consistently manicured appearance. Artificial turf that looks matted, discolored, or dirty can draw compliance notices and affect property values. Our blooming and de-compacting service restores fiber height and uniformity so your turf always looks its best. Regular quarterly service keeps HB homes looking beach-community perfect.",
      },
    ],
    localWhyUs:
      "Murphy's Turf serves Huntington Beach, Newport Beach, Costa Mesa, Long Beach, Seal Beach, Irvine, Fountain Valley, Garden Grove, Westminster, Laguna Beach, Dana Point, San Clemente, and Anaheim from our Orange County operations. Our trucks are on coastal OC streets daily, and our technicians live in the communities they serve. We understand the specific challenges of beachfront living, the demands of coastal microclimates, and the expectations of Orange County homeowners. When you call Murphy's Turf, you are working with a team that has built its reputation on delivering the cleanest artificial turf in the LA coastal corridor. Every service comes with our 30+ years of professional cleaning expertise and our commitment to pet-safe, family-friendly products that actually work.",
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    neighborhoods: [
      'Temecula',
      'French Valley',
      'Menifee',
      'Lake Elsinore',
      'Hemet',
      'Perris',
      'Wildomar',
      'Canyon Lake',
      'Temescal Valley',
      'Winchester',
      'Corona',
      'Riverside',
      'Moreno Valley',
      'San Jacinto',
      'Beaumont',
      'Eastvale',
      'Norco',
      'Fallbrook',
    ],
    testimonials: [
      {
        name: 'Brian Callahan',
        neighborhood: 'Temecula',
        rating: 5,
        text: "We moved to Temecula from the coast and had no idea how different turf maintenance would be in the Inland Empire heat. The pet smell was unbearable by mid-July. Murphy's Turf deep cleaning treatment completely eliminated the odor and their blooming service made our matted turf look brand new. These guys are the real deal — 30 years of experience shows.",
      },
      {
        name: 'Maria Sandoval',
        neighborhood: 'Menifee',
        rating: 5,
        text: "After trying two other companies that gave us generic treatments, we switched to Murphy's Turf. The difference was immediate — their professional-grade cleaning actually works where other products failed. Our Menifee backyard turf is the best it's ever looked and smelled. When you care about clean turf, these are the people to call.",
      },
      {
        name: 'Tyler Richardson',
        neighborhood: 'French Valley',
        rating: 5,
        text: "Our new turf in French Valley was already starting to smell after just one summer with our dogs. Murphy's Turf came out, did the full deep cleaning treatment plus de-compacting, and within a few hours our backyard went from embarrassing to the best on the block. Being headquartered locally really makes a difference in response time too.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Murrieta & Inland Empire | Murphy's Turf HQ",
    metaDescription:
      "Murphy's Turf headquarters in Murrieta. Professional artificial turf cleaning, pet odor removal & professional-grade disinfecting for the Inland Empire & Temecula Valley. Get a free quote today.",
    serviceAreaDescription:
      'Serving the entire Inland Empire from Temecula and French Valley through Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Winchester, Corona, Riverside, Moreno Valley, Eastvale, and Fallbrook.',
    climateNote:
      'Summer temps exceed 100°F regularly, baking pet waste into infill and accelerating bacterial growth.',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    mapQuery: '26323+Jefferson+Avenue+Murrieta+CA+92562',
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=4930650047464481625&output=embed",
    localContentHeading: "Murrieta Artificial Turf Cleaning: Built for Inland Empire Heat",
    localContentIntro:
      "Murphy's Turf was founded in Murrieta, and our headquarters at 26323 Jefferson Avenue is the nerve center of our Inland Empire operations. We know this region because we live here — through the 110-degree summer afternoons, the Santa Ana wind events, the dry autumn months, and everything in between. Inland Empire artificial turf faces challenges that coastal companies simply do not understand, and our cleaning protocols have been refined over years of serving Murrieta, Temecula, Menifee, Lake Elsinore, Hemet, and the entire Riverside and San Diego County Inland Empire region. When Inland Empire homeowners call Murphy's Turf, they are calling the local experts who built their business on the specific demands of this climate.",
    localChallenges: [
      {
        title: "Triple-Digit Summer Heat",
        description:
          "From June through September, Murrieta and the surrounding Inland Empire regularly see temperatures above 100°F, with heat waves pushing past 110°F. This extreme heat fundamentally changes how artificial turf contamination works. Bacterial growth in pet urine accelerates dramatically — what would take days to develop odor in cooler climates happens in hours here. Cleaning solutions evaporate before they can work if applied during peak heat, and turf surface temperatures can exceed 150°F. Our team applies treatments during early morning or evening hours and uses higher-volume processes calibrated for the heat.",
      },
      {
        title: "Pet Waste Intensification",
        description:
          "Murrieta is an extremely family-oriented community with high pet ownership rates. Inland Empire heat combined with dog urine creates the most challenging contamination scenario we deal with anywhere in our California service area. The heat bakes pet waste residue deep into the infill, intensifies ammonia and mercaptan odors, and accelerates the bacterial process that produces them. Our chlorine-based disinfecting treatment reaches the deep infill contamination that no surface cleaning can touch, and our technicians know exactly how to approach multi-pet households in 100-degree weather.",
      },
      {
        title: "Santa Ana Winds & Agricultural Dust",
        description:
          "The Inland Empire experiences periodic Santa Ana wind events that carry dust, debris, and fine particulates from undeveloped hillsides and surrounding agricultural areas. Between these events, the general dry climate means there is always some level of airborne dust settling on outdoor surfaces. This particulate accumulation fills gaps between infill granules, reduces drainage, and combines with organic contamination to create a dense, hard-to-clean layer. Our professional de-compacting and blooming service removes this buildup that accumulates faster here than in coastal areas.",
      },
      {
        title: "Wine Country & Rural Property Challenges",
        description:
          "Temecula Valley wine country and the surrounding rural properties bring unique turf cleaning challenges — from the vineyard dust that blows across the valley to the larger turf installations common on acreage properties. Corona, Riverside, Moreno Valley, and Eastvale also have sprawling residential developments with significant turf installations. Whether you have a compact backyard in French Valley or a multi-thousand square foot installation in Temecula, Murphy's Turf has the equipment and expertise to handle properties of any size across the Inland Empire.",
      },
    ],
    localWhyUs:
      "As the founding Murphy's Turf location, our Murrieta headquarters anchors our Inland Empire service. We serve Temecula, French Valley, Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Temescal Valley, Winchester, Corona, Riverside, Moreno Valley, San Jacinto, Beaumont, Eastvale, Norco, and Fallbrook with the same professional-grade cleaning process we have built our reputation on. Our crews know the neighborhoods, the communities, and the specific maintenance needs that Inland Empire turf faces through brutal summers and dry winters. Call the team that literally wrote the playbook on cleaning synthetic grass in this climate — Murphy's Turf has been headquartered in Murrieta since day one, and we are not going anywhere.",
  },

  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(925) 338-0048',
    email: 'info@murphysturf.com',
    neighborhoods: [
      'Concord',
      'Pleasant Hill',
      'Walnut Creek',
      'Antioch',
      'Brentwood',
      'Lafayette',
      'Danville',
      'San Ramon',
      'Dublin',
      'Livermore',
      'Pleasanton',
      'Orinda',
      'Alamo',
      'Oakley',
    ],
    testimonials: [
      {
        name: 'Richard Yamamoto',
        neighborhood: 'Walnut Creek',
        rating: 5,
        text: "Our Walnut Creek property had mold growing in the shaded areas of our turf from the Bay Area moisture. Murphy's Turf deep cleaning treatment eliminated every trace of it and their disinfecting protocol killed the bacteria our dogs had been tracking around. They understand East Bay microclimates better than any company we've worked with.",
      },
      {
        name: "Colleen O'Malley",
        neighborhood: 'Concord',
        rating: 5,
        text: "We had tried cleaning our Concord turf ourselves for years with store-bought products that never worked. Murphy's Turf came out, explained exactly what was living in our infill, and did their full deep cleaning treatment. The difference was dramatic — genuinely clean and fresh smelling turf for the first time since installation. Their 30 years of experience really shows.",
      },
      {
        name: 'Arjun Mehta',
        neighborhood: 'Pleasant Hill',
        rating: 5,
        text: "After years of trying to manage our Pleasant Hill lawn ourselves, we finally called Murphy's Turf. Best decision we made. They identified that our turf had compacted infill and embedded debris causing drainage issues, then did their blooming and deep cleaning treatment. The turnaround has been remarkable — our turf looks and drains like new. Worth every penny.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Martinez & East Bay | Murphy's Turf",
    metaDescription:
      "East Bay artificial turf cleaning experts. Murphy's Turf serves Martinez, Walnut Creek, Pleasant Hill, Concord, Antioch & Brentwood with professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving Contra Costa County and the Tri-Valley — from Martinez through Concord, Pleasant Hill, Walnut Creek, Antioch, Brentwood, Lafayette, Danville, San Ramon, Dublin, Livermore, and Pleasanton.',
    climateNote:
      'Bay Area microclimates range from damp coastal fog near the strait to hot, dry conditions inland.',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    mapQuery: "Murphy's+Turf+Martinez+CA",
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=14996248927137245841&output=embed",
    localContentHeading: "East Bay & Contra Costa County Artificial Turf Cleaning",
    localContentIntro:
      "Murphy's Turf serves the East Bay from our Martinez office, covering Contra Costa County and the Tri-Valley with a cleaning approach tailored to the Bay Area's famously variable microclimates. Unlike other regions where a single cleaning protocol works across the service area, the East Bay demands flexibility. Our crews might start their morning cleaning a fog-dampened turf in Martinez and finish the afternoon working a sun-baked property in Walnut Creek — and both require different approaches. This is turf cleaning designed by people who understand that driving 20 minutes inland in the East Bay can mean a 20-degree temperature swing and a completely different set of maintenance challenges.",
    localChallenges: [
      {
        title: "Bay Fog & Delta Moisture",
        description:
          "Martinez sits along the Carquinez Strait, where bay and delta influences keep outdoor surfaces damp for extended periods. Morning fog often persists into mid-morning, and the general humidity near the water creates ideal conditions for mold, mildew, and algae growth on artificial turf. Properties in Benicia, Port Costa, Rodeo, and the Martinez waterfront neighborhoods face these challenges year-round, with spring and early summer being the worst. Our monthly chlorine-based disinfecting prevents mold establishment in the shaded and moisture-prone areas that define waterfront East Bay living.",
      },
      {
        title: "Inland Heat Pockets",
        description:
          "Drive 15 miles inland from Martinez and you enter a completely different climate. Walnut Creek, Concord, Danville, San Ramon, Dublin, Livermore, and Pleasanton see summer temperatures in the mid-90s to low 100s, with Antioch and Brentwood in East Contra Costa often hotter. These inland Tri-Valley and East County properties need heat-specific maintenance protocols — early morning or evening cleaning, increased rinse volume, and more frequent professional service during summer months. Our team adjusts treatment timing based on your specific neighborhood, not a generic regional average.",
      },
      {
        title: "Oak Leaf & Tree Debris",
        description:
          "The East Bay is famous for its oak-studded hills, from the Briones wilderness around Martinez to the established neighborhoods of Lafayette, Orinda, and Alamo. All those trees mean constant leaf drop and organic debris accumulation on artificial turf. Oak leaves are particularly problematic because they decompose slowly and contain tannins that can stain turf fibers. Our pet hair and debris removal service uses commercial-grade equipment to extract leaf litter from deep in the turf pile, preventing the decomposition that creates bacterial food sources and staining.",
      },
      {
        title: "Tri-Valley HOA & Professional Households",
        description:
          "Walnut Creek, Danville, San Ramon, Dublin, and the Tri-Valley communities have high concentrations of professional households and HOA-governed neighborhoods with strict landscaping standards. Homeowners here expect immaculate property appearance and have no tolerance for matted, discolored, or smelly turf. Our quarterly professional service keeps Tri-Valley turf at the appearance standard these communities demand, with blooming treatments that restore fiber height and deep cleaning that maintains color and freshness.",
      },
    ],
    localWhyUs:
      "Our Martinez office serves Concord, Pleasant Hill, Walnut Creek, Antioch, Brentwood, Lafayette, Danville, San Ramon, Dublin, Livermore, Pleasanton, Orinda, Alamo, and Oakley with professional artificial turf cleaning tailored to East Bay conditions. Murphy's Turf has been servicing Contra Costa County long enough to know every microclimate quirk, every HOA expectation, and every common turf problem from Martinez to Livermore. Our technicians bring the same professional-grade cleaning process we use across California, calibrated for the Bay Area's unique demands. Whether you are dealing with Martinez fog, Walnut Creek heat, or Antioch summers, we have the experience and local knowledge to keep your turf clean and fresh year-round.",
  },

  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 432-5033',
    email: 'info@murphysturf.com',
    neighborhoods: [
      'Elk Grove',
      'Roseville',
      'Folsom',
      'Rancho Cordova',
      'Citrus Heights',
      'West Sacramento',
      'Carmichael',
      'Fair Oaks',
      'Rocklin',
      'Granite Bay',
      'Natomas',
      'Orangevale',
    ],
    testimonials: [
      {
        name: 'Greg Thomsen',
        neighborhood: 'Elk Grove',
        rating: 5,
        text: "The pet smell on our Elk Grove turf was so bad we stopped using the backyard entirely. Two dogs and Sacramento summers are a brutal combination. Murphy's Turf deep cleaning treatment completely eliminated the odor — not masked it, eliminated it. We can actually enjoy our outdoor space again. They genuinely know Sacramento turf challenges.",
      },
      {
        name: 'Priya Venkatesh',
        neighborhood: 'Roseville',
        rating: 5,
        text: "Our Roseville turf looked terrible after three years of Central Valley heat — fibers matted flat, infill compacted hard. Murphy's Turf blooming and de-compacting service was transformative. The turf looks like it was installed last week. Combined with professional-grade disinfecting, our backyard is clean, fresh, and beautiful again. Phenomenal service.",
      },
      {
        name: 'Danielle Foster',
        neighborhood: 'Folsom',
        rating: 5,
        text: "We signed up for Murphy's Turf monthly maintenance plan for our Folsom property — poop scooping plus quarterly deep cleaning treatment. The consistency has been outstanding. Our turf always looks and smells clean, our kids play on it without concern, and we never have to think about it. Their 30+ years of experience means they know exactly what they're doing.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Sacramento, CA | Murphy's Turf",
    metaDescription:
      "Sacramento's professional artificial turf cleaning. Murphy's Turf serves Elk Grove, Roseville, Folsom & Rancho Cordova with professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving the entire Sacramento metropolitan area, including Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, West Sacramento, Carmichael, Fair Oaks, Rocklin, Granite Bay, and Orangevale.',
    climateNote:
      'Central Valley heat regularly exceeds 105°F, rapidly crystallizing pet urine and multiplying bacteria.',
    formId: 'E4GmpR4mgHj6kL4dFr2w',
    mapQuery: "Murphy's+Turf+Sacramento+CA",
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=16737636760996869549&output=embed",
    localContentHeading: "Sacramento & Central Valley Artificial Turf Cleaning",
    localContentIntro:
      "Sacramento homeowners have embraced artificial turf at a higher rate than almost anywhere in California, and for good reason. The Central Valley's combination of extreme summer heat, minimal rainfall, and water conservation mandates makes natural lawn maintenance both expensive and impractical. Synthetic grass solves those problems beautifully — but only if it is properly maintained. Murphy's Turf brings professional artificial turf cleaning to the entire Sacramento metropolitan area, from Elk Grove in the south to Granite Bay in the north, with cleaning protocols calibrated for the unique challenges of Central Valley conditions. Our team understands what 105-degree summer afternoons do to synthetic lawns, and we have the process and equipment to keep your Sacramento turf clean and fresh despite the heat.",
    localChallenges: [
      {
        title: "Central Valley Extreme Heat",
        description:
          "Sacramento summers are brutal for artificial turf. June through September routinely sees temperatures above 100°F, with heat waves pushing past 110°F in places like Elk Grove, Natomas, and West Sacramento. This extreme heat causes turf surface temperatures to exceed 150°F on dark-colored installations, accelerates every contamination process, and makes cleaning timing critical. Our Sacramento crews schedule service for early morning or evening hours when cleaning solutions can actually work before evaporating, and we increase water volumes to compensate for rapid evaporation. This heat-specific approach delivers results that generic cleaning protocols cannot match.",
      },
      {
        title: "Agricultural Dust & Pollen",
        description:
          "The Central Valley is one of the most productive agricultural regions in the world, and that agricultural activity creates airborne dust and pollen that settles on every outdoor surface in the Sacramento area. Properties in Rancho Cordova, Folsom, Fair Oaks, and the eastern suburbs see particularly heavy pollen accumulation during spring, while the general dry climate means dust is a year-round concern. This particulate load fills infill gaps, reduces drainage, and creates a dull surface appearance that homeowner rinsing cannot address. Our de-compacting service removes the embedded dust that standard cleaning leaves behind.",
      },
      {
        title: "Water Conservation Balance",
        description:
          "Sacramento homeowners chose artificial turf specifically to conserve water, and many are understandably cautious about using water for cleaning. The good news is that efficient turf maintenance uses roughly 80-90% less water than maintaining a natural lawn the same size. Our cleaning process is calibrated to use water efficiently — rinsing during cool hours when evaporation is minimized, focusing volume on contaminated areas rather than spraying uniformly, and relying on our chlorine-based cleaning solution to do the heavy lifting so less water is needed for final rinsing. Sacramento clients see clean turf without the water bills that natural grass would demand.",
      },
      {
        title: "Growing Suburban Footprint",
        description:
          "The Sacramento metro area has some of California's fastest-growing suburbs, from Elk Grove and Roseville to Rocklin and Lincoln. These master-planned communities have extensive artificial turf installations in both residential and HOA-common areas. Families in these neighborhoods often have multiple pets, active children, and high expectations for property appearance. Our residential cleaning plans are designed for these Sacramento-area households, with flexible scheduling that fits busy family calendars and consistent service quality that keeps turf looking its best year-round.",
      },
    ],
    localWhyUs:
      "Murphy's Turf serves the greater Sacramento area from our local office, covering Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, West Sacramento, Carmichael, Fair Oaks, Rocklin, Granite Bay, Natomas, and Orangevale with the same professional-grade cleaning process we have built our reputation on across California. Our Sacramento crews understand Central Valley heat because they work in it every summer, and our cleaning protocols are refined specifically for the conditions that Sacramento artificial turf faces. Whether you need a one-time deep cleaning or want to set up a recurring maintenance plan, Murphy's Turf is the trusted choice for Sacramento homeowners who take their outdoor space seriously. Call us for a free quote and find out why Sacramento families trust Murphy's Turf with their synthetic lawns.",
  },
};

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    { slug: 'huntington-beach' },
    { slug: 'murrieta' },
    { slug: 'martinez' },
    { slug: 'sacramento' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locationData[slug];
  if (!location) {
    return { title: 'Location Not Found' };
  }
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `https://murphysturf.com/locations/${slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      type: 'website',
      url: `https://murphysturf.com/locations/${slug}`,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `Murphy's Turf - ${location.city}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: location.metaTitle,
      description: location.metaDescription,
      images: ['/images/og-image.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locationData[slug];

  if (!location) {
    notFound();
  }

  // FAQPage JSON-LD for rich results and AI citations
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://murphysturf.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://murphysturf.com/locations" },
      { "@type": "ListItem", "position": 3, "name": location.city, "item": `https://murphysturf.com/locations/${slug}` },
    ],
  };

  return (
    <div className="scroll-smooth pb-20 lg:pb-0">
      {/* LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Murphy's Turf - ${location.city}`,
            "description": location.metaDescription,
            "url": `https://murphysturf.com/locations/${slug}`,
            "telephone": location.phone,
            "areaServed": location.neighborhoods.map(n => ({ "@type": "City", "name": n })),
            "image": "https://murphysturf.com/images/og-image.png",
            "priceRange": "$$",
            "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
          }).replace(/</g, '\\u003c'),
        }}
      />
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* ================================================================
          1. HERO WITH EMBEDDED LEAD FORM
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/about-turf-cleaning.png"
            alt={`Professional artificial turf cleaning service in ${location.city}, California`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.city}, {location.state}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: headline + phone */}
            <AnimateOnScroll direction="up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Turf Cleaning &amp; Maintenance
                <br />
                <span className="text-cream">
                  in {location.city}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                30+ Years of Trusted Cleaning for Your Turf &amp; Pets
              </p>
              <a
                href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {location.phone}
              </a>
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <div id="quote-form" className="w-full">
              <AnimateOnScroll direction="up">
                <LeadForm locationCity={location.city} locationSlug={location.slug} />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. SERVICES
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Services in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Professional turf care tailored to {location.city}&apos;s specific climate and conditions.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group bg-cream hover:bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal font-heading mb-2 group-hover:text-forest transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sage font-semibold font-body text-sm group-hover:text-forest transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ================================================================
          3. ABOUT US
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimateOnScroll direction="fade">
              <Image
                src="/images/gallery/about-turf-cleaning.png"
                alt="Murphy's Turf professional turf cleaning"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </AnimateOnScroll>

            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-6">
                Reliable Turf Cleaning &amp; Maintenance
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed text-base mb-8">
                30+ years in cleaning &amp; disinfecting, now applied to your lawn. Our trained
                technicians deliver consistent, satisfaction-guaranteed turf care across{' '}
                {location.city} and surrounding communities.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: PawPrint, label: 'Pet Friendly' },
                  { icon: Leaf, label: 'Eco Friendly' },
                  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100"
                  >
                    <badge.icon className="w-5 h-5 text-sage" />
                    <span className="text-charcoal font-body text-sm font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. THREE-STEP PROCESS
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Simple 3 Step Process
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white font-bold font-heading text-sm shadow-md">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-light font-body">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. PHOTO GALLERY
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading">
              Our Work
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <StaggerItem key={idx}>
                <div className="relative aspect-[5/4] rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll direction="fade" className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Your Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ================================================================
          6. TESTIMONIALS
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              What {location.city} Customers Say
            </h2>
            <p className="text-lg text-charcoal-light font-body">
              Real reviews from real neighbors.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-sage fill-sage"
                      />
                    ))}
                  </div>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-charcoal-light font-body text-xs">
                      {testimonial.neighborhood}, {location.state}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Your Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          6.5 LOCAL CONTENT — unique per city for SEO
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-6">
              {location.localContentHeading}
            </h2>
            <p className="text-base sm:text-lg text-charcoal-light font-body leading-relaxed">
              {location.localContentIntro}
            </p>
          </AnimateOnScroll>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {location.localChallenges.map((challenge) => (
              <StaggerItem key={challenge.title}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 h-full">
                  <h3 className="text-lg sm:text-xl font-bold text-charcoal font-heading mb-3">
                    {challenge.title}
                  </h3>
                  <p className="text-charcoal-light font-body text-sm sm:text-base leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll direction="up">
            <div className="bg-sage/5 border-l-4 border-sage rounded-r-xl p-6 sm:p-8">
              <p className="text-charcoal-light font-body text-sm sm:text-base leading-relaxed">
                {location.localWhyUs}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ================================================================
          7. FAQ
          ================================================================ */}
      <FAQ items={locationFaqs} />

      {/* ================================================================
          8. NEIGHBORHOODS WE SERVE
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
                Neighborhoods We Serve in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => {
                  const neighborhoodSlug = `turf-cleaning-in-${neighborhood.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
                  return (
                    <StaggerItem key={neighborhood} direction="scale">
                      <Link
                        href={`/locations/${location.slug}/${neighborhoodSlug}`}
                        className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="text-charcoal font-body text-sm font-medium">
                          {neighborhood}
                        </span>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Climate Note */}
              <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-6">
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Local Climate</h4>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed">{location.climateNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <AnimateOnScroll direction="fade" className="w-full">
              <iframe
                src={location.mapEmbedUrl || `https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Murphy's Turf - ${location.city}`}
                className="rounded-xl shadow-lg"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          9. BOTTOM CTA + LEAD FORM
          ================================================================ */}
      <section id="bottom-form" className="py-14 sm:py-20 bg-forest scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: CTA text + contact info */}
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6">
                Ready for Fresh, Clean Turf in {location.city}?
              </h2>
              <p className="text-white/80 font-body text-lg mb-8">
                Get your free quote today. Our team is ready to make your turf look and
                smell like new.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-sage-light transition-colors font-body text-lg"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  {location.phone}
                </a>
              </div>
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <AnimateOnScroll direction="up" className="w-full">
              <LeadForm locationCity={location.city} locationSlug={location.slug} />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between px-4 pt-3">
          <a
            href="#quote-form"
            className="flex-1 mr-2 bg-sage hover:bg-sage-dark text-white font-bold text-sm min-h-[44px] flex items-center justify-center px-4 rounded-lg text-center font-body transition-colors"
          >
            Get Free Quote
          </a>
          <a
            href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm min-h-[44px] px-4 rounded-lg font-body transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
