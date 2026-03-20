import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Map,
  Leaf,
  Droplets,
  Bug,
  Sprout,
  Wind,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { notFound } from 'next/navigation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  name: string;
  neighborhood: string;
  rating: number;
  text: string;
}

interface ServiceItem {
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
}

interface LocationData {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  heroSubtitle: string;
  description: string[];
  neighborhoods: string[];
  testimonials: Testimonial[];
  metaTitle: string;
  metaDescription: string;
  climateNote: string;
  serviceAreaDescription: string;
}

// ---------------------------------------------------------------------------
// Shared services (same across all locations)
// ---------------------------------------------------------------------------

const services: ServiceItem[] = [
  {
    name: 'Lawn Cleaning',
    slug: 'lawn-cleaning',
    icon: 'leaf',
    shortDescription:
      'Professional turf cleaning to remove debris, thatch, and buildup for a healthier, greener lawn.',
  },
  {
    name: 'Aeration',
    slug: 'aeration',
    icon: 'wind',
    shortDescription:
      'Core aeration to relieve compaction, improve drainage, and allow nutrients to reach the root zone.',
  },
  {
    name: 'Seeding',
    slug: 'seeding',
    icon: 'sprout',
    shortDescription:
      'Overseeding and new lawn establishment with premium grass varieties suited for California climates.',
  },
  {
    name: 'Fertilization',
    slug: 'fertilization',
    icon: 'droplets',
    shortDescription:
      'Custom fertilization programs designed around soil tests and seasonal nutrient needs.',
  },
  {
    name: 'Pest Control',
    slug: 'pest-control',
    icon: 'bug',
    shortDescription:
      'Targeted pest and grub management to protect your lawn from damage without harsh chemicals.',
  },
  {
    name: 'Seasonal Maintenance',
    slug: 'seasonal-maintenance',
    icon: 'calendar',
    shortDescription:
      'Year-round maintenance plans including spring revitalization, summer heat protection, and fall preparation.',
  },
];

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = {
  'los-angeles': {
    city: 'Los Angeles',
    slug: 'los-angeles',
    state: 'CA',
    phone: '(213) 555-7890',
    email: 'la@murphysturfcare.com',
    heroSubtitle:
      "Professional lawn care for LA's diverse neighborhoods and Mediterranean climate. From coastal Santa Monica to inland Pasadena, our team delivers water-smart turf solutions tailored to Southern California's unique growing conditions.",
    description: [
      "Los Angeles presents one of the most complex lawn care environments in the country. The city's sprawling geography — stretching from the Pacific coast through the basin and up into foothill communities — creates a patchwork of microclimates that can vary dramatically within just a few miles. Coastal neighborhoods like Santa Monica and Mar Vista enjoy cooler temperatures moderated by ocean breezes and marine layer, while inland areas like Pasadena and Burbank experience significantly hotter summers and wider temperature swings. At Murphy's Turf Care, our LA team understands these distinctions at a granular level. We build custom treatment plans for each property based on its specific microclimate, sun exposure, soil composition, and irrigation setup. Whether your lawn sits in the shade of Silver Lake's hillsides or bakes in the full sun of the San Fernando Valley, we have the expertise to keep it thriving.",
      "Water conservation is the defining challenge of lawn care in Los Angeles. LADWP watering restrictions limit outdoor irrigation to specific days and durations, and drought conditions have made Angelenos more conscious than ever about every gallon they use. Murphy's Turf Care embraces this reality by designing lawn care programs that maximize turf health while minimizing water consumption. We use warm-season grass varieties like Bermuda and St. Augustine that require less water than traditional cool-season lawns, and our aeration services improve soil permeability so that every drop of irrigation water reaches the root zone instead of running off into the gutter. Our fertilization programs use slow-release formulations that feed steadily over weeks rather than creating flush growth that demands extra watering. For customers exploring alternatives, we also consult on drought-tolerant turf varieties and hybrid approaches that blend natural grass with water-efficient landscaping.",
      "The Santa Ana winds add another layer of complexity to LA lawn care. These hot, dry offshore winds can arrive without warning between October and March, desiccating lawns and stressing turf grasses already dealing with limited irrigation. Our seasonal maintenance programs prepare lawns for Santa Ana events with deep watering schedules, anti-desiccant treatments, and root-zone moisture management. Year-round, our LA team monitors weather patterns and adjusts treatment timing to work with the city's roughly 284 sunny days and 35 days of measurable rain. From the celebrity estates of Beverly Hills to the bungalow lawns of Echo Park, Murphy's Turf Care delivers consistent, professional results that keep Los Angeles green, healthy, and water-responsible.",
    ],
    neighborhoods: [
      'Hollywood',
      'Santa Monica',
      'Beverly Hills',
      'Pasadena',
      'Long Beach',
      'Burbank',
      'Glendale',
      'West Hollywood',
      'Silver Lake',
      'Echo Park',
      'Mar Vista',
      'Culver City',
    ],
    testimonials: [
      {
        name: 'Jessica Moreno',
        neighborhood: 'Pasadena',
        rating: 5,
        text: "Our Pasadena lawn was turning brown every summer no matter how much we watered. Murphy's Turf Care did a soil analysis, switched us to a warm-season blend, and set up an aeration schedule. Our water bill went down and our lawn has never looked better. They really understand how to work with LA's climate, not against it.",
      },
      {
        name: 'Derek Lawson',
        neighborhood: 'Santa Monica',
        rating: 5,
        text: "Living near the coast, our lawn dealt with salt air and the marine layer constantly. Murphy's team recommended specific grass varieties that handle coastal conditions and built a fertilization program around the cooler microclimate here. Two seasons in and our neighbors keep asking who takes care of our yard. Highly recommend.",
      },
      {
        name: 'Nina Patel',
        neighborhood: 'Silver Lake',
        rating: 5,
        text: "We have a steep hillside lawn in Silver Lake that other companies refused to even quote. Murphy's Turf Care not only took it on but designed a maintenance program that prevents erosion and keeps the grass lush. Their crew is professional, punctual, and genuinely knowledgeable about Southern California turf. Outstanding service from start to finish.",
      },
    ],
    metaTitle: "Lawn Care & Turf Cleaning in Los Angeles, CA | Murphy's Turf Care",
    metaDescription:
      "LA's trusted lawn care professionals. Murphy's Turf Care offers aeration, seeding, fertilization, pest control, and seasonal maintenance across Hollywood, Santa Monica, Pasadena, Beverly Hills, and more.",
    climateNote:
      'Los Angeles features a Mediterranean climate with approximately 284 sunny days and only 35 days of measurable rain per year. Microclimates vary widely from the cool coast to the hot inland valleys. LADWP watering restrictions and Santa Ana wind events are key factors in lawn care planning.',
    serviceAreaDescription:
      'Our Los Angeles service area covers the greater LA metro from Santa Monica and Mar Vista on the Westside through Hollywood, Silver Lake, and Echo Park in the center, up to Pasadena, Burbank, and Glendale in the foothills, and south to Culver City and Long Beach.',
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturfcare.com',
    heroSubtitle:
      'Our Headquarters — Serving the Inland Empire & Temecula Valley. Murphy\'s Turf Care was founded right here in Murrieta, and our deepest roots are in the communities of Southwest Riverside County.',
    description: [
      "Murrieta is home to Murphy's Turf Care, and no other lawn care company knows this region as intimately as we do. Located in the heart of Southwest Riverside County, Murrieta and the surrounding Temecula Valley present a distinctive set of challenges for homeowners who want beautiful, healthy lawns. Summer temperatures regularly exceed 100 degrees Fahrenheit, the Santa Ana winds sweep through the Temecula Gap with punishing force, and the region's heavy clay soil resists water absorption while baking into near-concrete hardness during the dry months. Our team lives and works in these neighborhoods — from the master-planned community of Greer Ranch to the established streets of California Oaks — and we have spent years perfecting treatment protocols that deliver green, resilient lawns despite these demanding conditions.",
      "Water management is central to every lawn care program we design in Murrieta. The Eastern Municipal Water District (EMWD) sets irrigation guidelines that Murrieta homeowners must follow, and our treatment plans are built to maximize the effectiveness of every allowed watering session. Our core aeration services break through the compacted clay that is ubiquitous across the Inland Empire, allowing water to penetrate deep into the root zone rather than pooling on the surface or running off. We pair aeration with slow-release fertilization programs that promote deep root growth, which makes turf more drought-tolerant and better able to survive the intense heat of July, August, and September. For newer communities like Warm Springs and Bear Creek, where builder-grade landscapes often struggle within the first year, we offer establishment programs that get young lawns rooted and thriving before their first full Murrieta summer.",
      "Beyond the heat and clay soil, Murrieta lawns contend with the Santa Ana winds that funnel through the Temecula Gap, sometimes gusting above 60 miles per hour. These events strip moisture from turf, deposit dust and debris, and can flatten or damage grass blades. Our seasonal maintenance programs include post-Santa Ana recovery treatments, deep cleaning services to remove wind-blown debris, and anti-stress applications that help lawns bounce back quickly. Whether you live in the hillside homes of Los Alamos Hills with panoramic views, the family-friendly streets of French Valley, or the resort-style community of The Oaks, Murphy's Turf Care has the local knowledge and professional equipment to keep your Murrieta lawn looking its best year-round. As our headquarters city, Murrieta customers also benefit from the fastest response times and most flexible scheduling in our entire service network.",
    ],
    neighborhoods: [
      'French Valley',
      'Greer Ranch',
      'The Oaks',
      'Los Alamos Hills',
      'California Oaks',
      'Copper Canyon',
      'Warm Springs',
      'Bear Creek',
    ],
    testimonials: [
      {
        name: 'Brian Callahan',
        neighborhood: 'Greer Ranch',
        rating: 5,
        text: "We moved to Greer Ranch from the coast and had no idea how different lawn care would be out here. The clay soil was rock-hard and our grass was dying by mid-July. Murphy's Turf Care did a deep aeration, amended the soil, and put us on their seasonal program. Three summers in and our lawn stays green even in August. These guys are the real deal.",
      },
      {
        name: 'Maria Sandoval',
        neighborhood: 'California Oaks',
        rating: 5,
        text: "After trying two other lawn care companies that gave us generic treatments, we switched to Murphy's Turf Care. The difference was immediate — they actually tested our soil, explained the clay issues, and built a plan around the EMWD watering schedule. Our California Oaks lawn is the best it's ever looked and we're using less water. Can't recommend them enough.",
      },
      {
        name: 'Tyler Richardson',
        neighborhood: 'French Valley',
        rating: 5,
        text: "Our new construction lawn in French Valley was struggling badly after the first Santa Ana season. Murphy's Turf Care came out, assessed the damage, and set up a recovery program that included aeration, overseeding with heat-tolerant varieties, and their fertilization plan. Within a few months our lawn went from embarrassing to the best on the block. Being local really makes a difference.",
      },
    ],
    metaTitle: "Lawn Care & Turf Cleaning in Murrieta, CA | Murphy's Turf Care HQ",
    metaDescription:
      "Murrieta's hometown lawn care provider. Murphy's Turf Care headquarters serves the Inland Empire and Temecula Valley with aeration, seeding, fertilization, pest control, and seasonal maintenance.",
    climateNote:
      'Murrieta features a hot semi-arid climate with summer temperatures regularly exceeding 100°F, mild winters in the 40s-60s, and minimal rainfall. Heavy clay soil, Santa Ana winds through the Temecula Gap, and EMWD water conservation guidelines are primary considerations for lawn care.',
    serviceAreaDescription:
      'Our Murrieta service area covers all of Murrieta from French Valley and Warm Springs in the north through Greer Ranch, The Oaks, and California Oaks in the center, down to Bear Creek and the Temecula border in the south, and east to Los Alamos Hills and Copper Canyon.',
  },

  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(925) 555-3456',
    email: 'bayarea@murphysturfcare.com',
    heroSubtitle:
      'Serving Martinez & the Greater Bay Area. Our Contra Costa County team delivers expert lawn care calibrated for the fog, marine layer, and unique microclimates of the East Bay.',
    description: [
      "Martinez sits at the edge of the Carquinez Strait where the Sacramento River Delta meets San Francisco Bay, and this geography creates one of the most fascinating microclimate environments in all of California. Morning fog and marine layer regularly roll through the strait, keeping coastal-facing neighborhoods cooler and more humid than communities just a few ridgelines inland. The delta breezes that flow through Martinez and into the East Bay valleys moderate afternoon temperatures but also create uneven drying patterns across lawns. Murphy's Turf Care has built our Bay Area operation around these nuances. Our Martinez team understands that a lawn in the Alhambra Valley faces different conditions than a property in downtown Martinez, and that a yard in nearby Walnut Creek has different needs than one in Benicia just across the water. Every treatment plan we design starts with a thorough assessment of your property's specific exposure to fog, wind, sun, and soil type.",
      "Soil composition in the Martinez area presents both challenges and opportunities. Much of Contra Costa County sits on heavy clay soil that retains moisture during the wet season but becomes compacted and nearly impermeable during the dry months. This clay base means that without proper aeration, irrigation water and rainfall sit on the surface rather than reaching root zones, leading to shallow root development and turf that struggles as soon as the dry season arrives. Murphy's Turf Care addresses this with our core aeration program, strategically timed to coincide with the transition from wet to dry seasons. We also recommend and apply soil amendments that improve clay structure over time, gradually creating a more balanced growing medium. For properties near the delta and along the Pacheco Creek corridor, we see more varied soil profiles including alluvial deposits that drain quickly — these lawns benefit from our targeted fertilization programs that prevent nutrient leaching and maintain steady growth through the long, dry California summer.",
      "Water conservation is a central concern for Bay Area homeowners, and EBMUD (East Bay Municipal Utility District) guidelines shape how our customers irrigate their lawns. Murphy's Turf Care designs every treatment plan with water efficiency as a core principle. Our aeration services ensure maximum water penetration, our fertilization programs promote deep root growth that reduces watering frequency, and we consult on irrigation scheduling that works within EBMUD allowances. The Bay Area's mild year-round temperatures — rarely freezing and seldom exceeding 95 degrees in Martinez — allow for a long growing season that responds well to consistent, science-based care. Whether you are maintaining a sprawling estate in the Alhambra Valley, a craftsman bungalow lot in downtown Martinez, or a suburban property in Pleasant Hill or Concord, Murphy's Turf Care brings professional-grade Bay Area lawn care to your doorstep.",
    ],
    neighborhoods: [
      'Downtown Martinez',
      'Alhambra Valley',
      'Pleasant Hill',
      'Concord',
      'Walnut Creek',
      'Benicia',
      'Pacheco',
      'Lafayette',
    ],
    testimonials: [
      {
        name: 'Richard Yamamoto',
        neighborhood: 'Walnut Creek',
        rating: 5,
        text: "Our Walnut Creek property sits in a hot microclimate that dries out the lawn by June every year. Murphy's Turf Care built a program around deep aeration and slow-release fertilization that has completely transformed our yard. They understand the Bay Area microclimates better than any company we've worked with. Our lawn stays green well into October now.",
      },
      {
        name: 'Colleen O\'Malley',
        neighborhood: 'Downtown Martinez',
        rating: 5,
        text: "We have an older home in Martinez with heavy clay soil that nothing seemed to grow well in. Murphy's team tested the soil, explained exactly what amendments were needed, and started us on a comprehensive treatment plan. Within two seasons our lawn went from patchy and struggling to thick and healthy. They really know this area's soil challenges.",
      },
      {
        name: 'Arjun Mehta',
        neighborhood: 'Pleasant Hill',
        rating: 5,
        text: "After years of trying to manage our Pleasant Hill lawn ourselves, we finally called Murphy's Turf Care. Best decision we made. They identified that our irrigation was inefficient, our soil was severely compacted, and we were using the wrong fertilizer schedule for our microclimate. The turnaround has been remarkable — lush, even, and green. Worth every penny.",
      },
    ],
    metaTitle: "Lawn Care & Turf Cleaning in Martinez & Bay Area, CA | Murphy's Turf Care",
    metaDescription:
      "Bay Area lawn care experts. Murphy's Turf Care serves Martinez, Walnut Creek, Pleasant Hill, Concord, and Contra Costa County with aeration, seeding, fertilization, pest control, and seasonal maintenance.",
    climateNote:
      'Martinez features a Mediterranean climate strongly influenced by fog, marine layer, and delta breezes from the Carquinez Strait. Temperatures are mild year-round, rarely freezing or exceeding 95°F. Heavy clay soil is prevalent, and EBMUD water conservation guidelines shape irrigation practices throughout the region.',
    serviceAreaDescription:
      'Our Martinez service area covers Contra Costa County from Benicia and the Carquinez Strait in the north through downtown Martinez and Pacheco, south to Pleasant Hill and Walnut Creek, and west to Lafayette. We also serve the Alhambra Valley and Concord communities.',
  },

  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 555-7890',
    email: 'sacramento@murphysturfcare.com',
    heroSubtitle:
      "Professional Lawn Care for Sacramento & the Central Valley. Our Sacramento team specializes in heat-resilient turf management for the capital region's extreme summers and unique river delta soil conditions.",
    description: [
      "Sacramento's Central Valley location creates a climate that is as rewarding as it is demanding for lawn care. The capital city enjoys abundant sunshine and a long growing season that can produce truly spectacular lawns, but the flip side is summer heat that routinely pushes past 105 degrees Fahrenheit, sometimes for weeks at a stretch. These extreme temperatures stress turf grasses to their limits, accelerating moisture loss and pushing root systems deeper in search of water. Murphy's Turf Care has developed our Sacramento program specifically for these conditions. Our team uses warm-season grass varieties and heat-adapted blends that are proven performers in the Central Valley, and our fertilization schedules are calibrated to feed lawns during the cooler shoulder seasons when nutrient uptake is most efficient, rather than pushing growth during the brutal summer months when grass is simply trying to survive.",
      "The Sacramento region's soil tells the story of its two great rivers. Properties near the Sacramento and American River confluences sit on rich alluvial deposits — sandy loam that drains well but can leach nutrients quickly without proper management. Move away from the river corridors into neighborhoods like Natomas, Arden-Arcade, and Citrus Heights, and the soil transitions to heavier clay compositions that compact under the summer heat and resist water absorption. Murphy's Turf Care conducts soil testing for every Sacramento customer because the difference between a river-influenced property in East Sacramento and a clay-heavy lot in Elk Grove can dictate entirely different treatment approaches. Our aeration services are especially critical in the clay-soil areas, where breaking through compaction layers is essential for water penetration and root development. In the sandy-loam zones, we focus on nutrient retention strategies and organic matter amendments that build the soil's ability to hold both moisture and fertilizer.",
      "Winter brings its own set of challenges to Sacramento lawns. The Central Valley's infamous tule fog settles in from November through February, creating cold, damp conditions that can promote fungal diseases like brown patch and dollar spot in vulnerable turf. These dense fog events, combined with dramatic temperature swings from freezing overnight lows to mild afternoon highs, create a stress cycle that weakens lawns heading into spring. Murphy's Turf Care addresses this with our winter maintenance program, which includes fungicide treatments for at-risk lawns, careful mowing height management to prevent moisture trapping, and early spring recovery applications that help turf bounce back as the fog lifts and temperatures begin to climb. From the tree-lined avenues of Land Park and the charming streets of Midtown to the growing communities of Folsom, Rancho Cordova, and Roseville, our Sacramento team delivers year-round professional lawn care that keeps your property looking its best through every season the Central Valley throws at it.",
    ],
    neighborhoods: [
      'East Sacramento',
      'Land Park',
      'Midtown',
      'Natomas',
      'Elk Grove',
      'Folsom',
      'Rancho Cordova',
      'Arden-Arcade',
      'Citrus Heights',
      'Roseville',
    ],
    testimonials: [
      {
        name: 'Greg Thomsen',
        neighborhood: 'East Sacramento',
        rating: 5,
        text: "East Sac has beautiful old homes but the mature trees and river-influenced soil make lawn care tricky. Murphy's Turf Care figured out our unique soil profile and built a treatment plan that accounts for the shade, the sandy loam, and the nutrient leaching issues. Our lawn has never been this consistently green, even in August. They genuinely know Sacramento.",
      },
      {
        name: 'Priya Venkatesh',
        neighborhood: 'Elk Grove',
        rating: 5,
        text: "The clay soil in Elk Grove had defeated us for years. We'd water and water but the lawn still browned out every summer. Murphy's Turf Care did a deep double-pass aeration, amended the soil, and started us on their seasonal fertilization program. The difference was visible within weeks. Our grass stays green through the heat now and we're actually using less water. Phenomenal service.",
      },
      {
        name: 'Danielle Foster',
        neighborhood: 'Folsom',
        rating: 5,
        text: "We were dealing with tule fog damage and brown patch every winter in our Folsom lawn. Murphy's Turf Care diagnosed the problem, set up a preventive fungicide program for the fog season, and adjusted our fall maintenance schedule. This past winter was the first time in five years we didn't lose patches of grass to disease. Their knowledge of Sacramento-specific lawn issues is impressive.",
      },
    ],
    metaTitle: "Lawn Care & Turf Cleaning in Sacramento, CA | Murphy's Turf Care",
    metaDescription:
      "Sacramento's professional lawn care provider. Murphy's Turf Care serves East Sacramento, Land Park, Elk Grove, Folsom, Rancho Cordova, and the greater capital region with aeration, seeding, fertilization, and seasonal maintenance.",
    climateNote:
      'Sacramento features a hot-summer Mediterranean climate with extreme heat often exceeding 105°F in summer and mild winters characterized by dense tule fog from November through February. Soil varies from sandy river-delta loam near the Sacramento and American Rivers to heavy clay in outlying neighborhoods. Dramatic daily temperature swings and winter fungal pressure are key lawn care considerations.',
    serviceAreaDescription:
      'Our Sacramento service area covers the greater capital region from Roseville and Citrus Heights in the north through Arden-Arcade and East Sacramento in the center, down to Elk Grove in the south, and east to Folsom and Rancho Cordova along the American River corridor. We also serve the Natomas, Land Park, and Midtown neighborhoods.',
  },
};

// ---------------------------------------------------------------------------
// Icon helper
// ---------------------------------------------------------------------------

function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const props = { className: className || 'w-6 h-6' };
  switch (icon) {
    case 'leaf':
      return <Leaf {...props} />;
    case 'wind':
      return <Wind {...props} />;
    case 'sprout':
      return <Sprout {...props} />;
    case 'droplets':
      return <Droplets {...props} />;
    case 'bug':
      return <Bug {...props} />;
    case 'calendar':
      return <Calendar {...props} />;
    default:
      return <Leaf {...props} />;
  }
}

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    { slug: 'los-angeles' },
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
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      type: 'website',
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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-dark/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-body px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              {location.city}, California
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6 leading-tight">
              Turf Cleaning & Lawn Care
              <br />
              <span className="text-cream">
                in {location.city}, CA
              </span>
            </h1>
            <p className="text-lg text-white/80 font-body leading-relaxed max-w-3xl">
              {location.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-forest font-semibold px-8 py-3.5 rounded-lg hover:bg-cream transition-colors font-body shadow-md"
              >
                <Phone className="w-4 h-4" />
                {location.phone}
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-8">
                Professional Lawn Care in {location.city}
              </h2>
              <div className="space-y-6">
                {location.description.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-charcoal-light font-body leading-relaxed text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {/* Climate Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-charcoal font-heading mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sage" />
                  Local Climate Notes
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {location.climateNote}
                </p>
              </div>
              {/* Quick Contact Card */}
              <div className="bg-forest rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold font-heading mb-4">
                  {location.city} Office
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                    className="flex items-center gap-3 text-white/90 hover:text-sage-light transition-colors font-body text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-white/90 hover:text-sage-light transition-colors font-body text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {location.email}
                  </a>
                  <div className="flex items-center gap-3 text-white/90 font-body text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    Mon-Fri 7am-6pm, Sat 8am-4pm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Services Available in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Every service is tailored to {location.city}&apos;s specific soil, climate,
              and growing conditions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-cream hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                  <ServiceIcon icon={service.icon} className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading mb-2 group-hover:text-forest transition-colors">
                  {service.name}
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed mb-4">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sage font-semibold font-body text-sm group-hover:text-forest transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              What {location.city} Customers Say
            </h2>
            <p className="text-lg text-charcoal-light font-body">
              Real reviews from real neighbors in {location.city}.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
              >
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
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-charcoal font-heading text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-charcoal-light font-body text-xs">
                    {testimonial.neighborhood}, {location.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Details & Neighborhoods */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-6">
                Neighborhoods We Serve in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <div
                    key={neighborhood}
                    className="flex items-center gap-2 bg-cream rounded-lg px-4 py-3"
                  >
                    <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                    <span className="text-charcoal font-body text-sm font-medium">
                      {neighborhood}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[350px] sm:h-[400px] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
              <div className="relative flex flex-col items-center gap-4 text-center px-6">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Map className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading">
                  {location.city} Service Area Map
                </h3>
                <p className="text-charcoal-light font-body text-sm max-w-sm">
                  Interactive Google Maps integration showing our complete service
                  coverage across {location.city} and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Contact & Quote Form */}
      <section id="quote-form" className="py-16 sm:py-24 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-6">
                Get a Free Quote in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                Ready to transform your {location.city} lawn? Fill out the form and our
                local team will get back to you within one business day with a custom quote.
                Or reach out directly:
              </p>
              <div className="space-y-4 mb-8">
                <a
                  href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      Call Us
                    </p>
                    <p className="text-sage font-body">{location.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      Email Us
                    </p>
                    <p className="text-sage font-body">{location.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      Business Hours
                    </p>
                    <p className="text-charcoal-light font-body text-sm">
                      Mon-Fri 7:00 AM - 6:00 PM &middot; Sat 8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-charcoal font-heading mb-6">
                Request Your Free Quote
              </h3>
              <form className="space-y-5">
                {/* Hidden/Readonly location field */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                  >
                    Service Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={`${location.city}, ${location.state}`}
                    readOnly
                    className="w-full px-4 py-3 bg-cream border border-gray-200 rounded-lg font-body text-charcoal-light cursor-not-allowed"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Murphy"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(951) 331-3300"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                    <option value="multiple">Multiple Services</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your lawn and what you're looking for..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sage hover:bg-sage-dark text-white font-semibold py-3.5 rounded-lg transition-colors font-body shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  Get My Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-charcoal-light font-body text-center">
                  We typically respond within 1 business day. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Other Locations CTA */}
      <section className="py-12 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white font-heading mb-1">
                We Also Serve Other California Communities
              </h3>
              <p className="text-white/70 font-body text-sm">
                See all locations or contact us if you don&apos;t see your area listed.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white text-forest font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors font-body shadow-sm flex-shrink-0"
            >
              View All Locations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
