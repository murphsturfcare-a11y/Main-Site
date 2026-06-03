import type { Metadata } from 'next';
import BlogContent from './BlogContent';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners. Learn from Murphy's Turf professionals how to keep your synthetic turf clean, safe, and looking like new.",
  openGraph: {
    title: "Blog | Murphy's Turf",
    description:
      'Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners.',
  },
};

/* --------------------------- DATA --------------------------- */

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-clean-artificial-turf',
    title: 'How to Clean Artificial Turf: The Complete Guide',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-03-15',
    excerpt:
      'Everything you need to know about cleaning artificial turf, from basic rinsing to deep sanitization. We cover tools, techniques, and the professional methods that keep synthetic grass looking and smelling fresh year-round.',
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
  },
  {
    slug: 'removing-pet-odors-artificial-turf',
    title: 'Removing Pet Odors from Artificial Turf: What Actually Works',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2026-03-08',
    excerpt:
      'Pet urine odor on artificial turf is one of the most common complaints from homeowners. Learn which products actually eliminate odors versus just masking them, and why enzyme-based and chlorine tablet solutions outperform everything else.',
    gradient: 'from-amber-500 via-orange-400 to-yellow-400',
  },
  {
    slug: 'how-often-clean-artificial-turf',
    title: 'How Often Should You Clean Your Artificial Turf?',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2026-02-25',
    excerpt:
      'The answer depends on foot traffic, pets, trees, and your local climate. We break down a practical cleaning schedule for California homeowners, from weekly rinses to quarterly deep cleans.',
    gradient: 'from-sky-500 via-blue-400 to-cyan-400',
  },
  {
    slug: 'diy-vs-professional-turf-cleaning',
    title: 'DIY vs Professional Turf Cleaning: Is It Worth Hiring a Pro?',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-02-18',
    excerpt:
      'You can handle basic turf maintenance yourself, but there are times when professional cleaning makes a real difference. We compare costs, results, and effort so you can decide what makes sense for your yard.',
    gradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
  },
  {
    slug: 'artificial-turf-pets-clean-safe',
    title: 'Keeping Artificial Turf Clean and Safe for Pets',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2026-02-10',
    excerpt:
      'Artificial turf and pets are a great combination when you keep up with cleaning. Learn how to manage waste, prevent bacterial buildup, and create a safe play area your dogs will love.',
    gradient: 'from-teal-500 via-emerald-400 to-green-400',
  },
  {
    slug: 'chlorine-based-turf-cleaning',
    title: 'The Science Behind Our Chlorine-Based Cleaning Process',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-02-01',
    excerpt:
      'Our chlorine-based cleaning solution eliminates bacteria and odors without harsh chemicals. Learn how it works, why we chose it over bleach and ammonia, and what makes it safe for pets and kids.',
    gradient: 'from-lime-500 via-green-400 to-emerald-400',
  },
  {
    slug: 'signs-turf-needs-professional-cleaning',
    title: '5 Signs Your Artificial Turf Needs Professional Cleaning',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2026-01-22',
    excerpt:
      'Not sure if your synthetic turf needs professional attention? From lingering odors to matted fibers, these five warning signs mean it is time to call in the experts for a deep clean.',
    gradient: 'from-violet-500 via-purple-400 to-indigo-400',
  },
  {
    slug: 'turf-cleaning-huntington-beach',
    title: 'Artificial Turf Cleaning in Huntington Beach: What Local Homeowners Need to Know',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-01-14',
    excerpt:
      'Huntington Beach homeowners face unique turf cleaning challenges from salt air, sand, and coastal moisture. Here is what you need to know to keep your synthetic turf in top shape by the coast.',
    gradient: 'from-green-500 via-lime-400 to-yellow-400',
  },
  {
    slug: 'turf-cleaning-murrieta-inland-empire',
    title: 'Turf Cleaning in Murrieta & the Inland Empire: Beating the Heat',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-01-06',
    excerpt:
      'Inland Empire heat accelerates bacterial growth and intensifies odors on artificial turf. Learn the specific cleaning strategies Murrieta homeowners need to keep their synthetic lawns fresh through triple-digit summers.',
    gradient: 'from-forest via-sage to-sage-light',
  },
  {
    slug: 'poop-scooping-service-worth-it',
    title: 'Is a Poop Scooping Service Worth It? What Pet Owners Should Know',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2025-12-28',
    excerpt:
      'If you have dogs and artificial turf, pet waste removal is not optional. We break down what professional poop scooping services include, what they cost, and why they matter for turf longevity and hygiene.',
    gradient: 'from-emerald-500 via-teal-400 to-cyan-400',
  },
  {
    slug: 'artificial-turf-bacteria-health-risks',
    title: 'Bacteria on Artificial Turf: Health Risks and How to Eliminate Them',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2025-12-18',
    excerpt:
      'Artificial turf can harbor harmful bacteria if not properly maintained. Learn about the health risks of E. coli, Staph, and other pathogens on synthetic grass and the proven methods to eliminate them.',
    gradient: 'from-red-500 via-orange-400 to-amber-400',
  },
  {
    slug: 'seasonal-turf-maintenance-california',
    title: 'Seasonal Artificial Turf Maintenance for California Homeowners',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2025-12-08',
    excerpt:
      'California weather varies wildly by region and season. This month-by-month maintenance guide helps you stay ahead of seasonal challenges, from summer heat to winter rains, to keep your artificial turf performing its best.',
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
  },
  {
    slug: 'turf-cleaning-bay-area-martinez',
    title: 'Artificial Turf Cleaning in the Bay Area: A Guide for Martinez & East Bay Homeowners',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-20',
    excerpt:
      'Bay Area homeowners face unique turf cleaning challenges from microclimates, coastal fog, and seasonal rain. Learn how Murphy\'s Turf keeps synthetic grass clean across Martinez, Walnut Creek, Concord, and the East Bay.',
    gradient: 'from-sky-600 via-blue-400 to-teal-400',
  },
  {
    slug: 'turf-cleaning-sacramento',
    title: 'Artificial Turf Cleaning in Sacramento: Surviving Central Valley Heat',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-18',
    excerpt:
      'Sacramento homeowners need specialized turf cleaning strategies for Central Valley heat. Learn how to maintain artificial turf through 100-degree summers and keep your synthetic lawn fresh year-round.',
    gradient: 'from-amber-500 via-yellow-400 to-orange-400',
  },
  {
    slug: 'artificial-turf-cleaning-los-angeles',
    title: 'Artificial Turf Cleaning in Los Angeles: What LA Homeowners Need to Know',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-25',
    excerpt:
      'Los Angeles homeowners face unique turf cleaning challenges from smog, heat, and year-round outdoor living. Learn how to keep your artificial turf clean, safe, and fresh in the LA basin.',
    gradient: 'from-purple-500 via-fuchsia-400 to-pink-400',
  },
  {
    slug: 'artificial-turf-cleaning-anaheim',
    title: 'Artificial Turf Cleaning in Anaheim: Keeping Your Synthetic Lawn Fresh in North Orange County',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-22',
    excerpt:
      'Anaheim homeowners need smart turf cleaning strategies for warm inland OC temperatures. Learn how to maintain artificial turf in Anaheim and why professional cleaning makes a difference.',
    gradient: 'from-orange-500 via-red-400 to-rose-400',
  },
  {
    slug: 'artificial-turf-cleaning-riverside',
    title: 'Artificial Turf Cleaning in Riverside: Professional Turf Care for the Inland Empire',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-24',
    excerpt:
      'Riverside homeowners face extreme heat and dry conditions that accelerate turf contamination. Learn how to maintain artificial turf in Riverside and keep your synthetic lawn clean through Inland Empire summers.',
    gradient: 'from-amber-600 via-orange-500 to-red-400',
  },
  {
    slug: 'artificial-turf-cleaning-irvine',
    title: 'Artificial Turf Cleaning in Irvine: Maintaining Pristine Turf in South Orange County',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-23',
    excerpt:
      'Irvine homeowners expect perfect lawns and HOA-compliant landscapes. Learn how professional turf cleaning keeps artificial grass pristine in Irvine\'s warm inland OC climate.',
    gradient: 'from-emerald-500 via-green-400 to-lime-400',
  },
  {
    slug: 'artificial-turf-cleaning-long-beach',
    title: 'Artificial Turf Cleaning in Long Beach: Coastal Meets Urban',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-21',
    excerpt:
      'Long Beach homeowners face a mix of coastal moisture and urban pollution on their artificial turf. Learn the best cleaning strategies for synthetic grass in California\'s 7th largest city.',
    gradient: 'from-cyan-500 via-blue-400 to-indigo-400',
  },
  {
    slug: 'artificial-turf-cleaning-san-diego',
    title: 'Artificial Turf Cleaning in San Diego: Sun, Surf, and Synthetic Grass Care',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-03-26',
    excerpt:
      'San Diego homeowners enjoy year-round sun but face unique turf cleaning challenges. Learn how to maintain artificial turf in San Diego\'s coastal and inland neighborhoods for a clean, fresh lawn.',
    gradient: 'from-blue-500 via-sky-400 to-cyan-400',
  },
  {
    slug: 'artificial-turf-cleaning-orange-county',
    title: 'Artificial Turf Cleaning in Orange County: The Complete Local Guide',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-04-03',
    excerpt:
      'Orange County has one of the highest concentrations of artificial turf in the US. From coastal salt air in Huntington Beach to inland heat in Anaheim, learn the city-by-city cleaning strategies every OC homeowner needs.',
    gradient: 'from-orange-600 via-amber-500 to-yellow-400',
  },
  {
    slug: 'commercial-turf-cleaning-dog-daycares-kennels',
    title: 'Turf Cleaning for Dog Daycares, Boarding Facilities and Kennels: An Operator Guide',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-06-02',
    excerpt:
      'A practical guide to keeping artificial turf clean, odor-free, and sanitary at dog daycares, boarding facilities, and kennels. Learn cleaning frequency, pet-safe disinfecting, and what to look for in a commercial turf cleaning vendor.',
    gradient: 'from-sage via-forest to-forest-dark',
  },
  {
    slug: 'hoa-artificial-turf-maintenance-guide',
    title: 'Artificial Turf Maintenance for HOAs and Property Managers: Costs, Responsibilities and a Vendor Checklist',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-06-01',
    excerpt:
      'A guide for HOA boards and property managers on maintaining common-area artificial turf: who is responsible, what cleaning involves, how to budget, and a checklist for choosing a bonded, insured commercial turf cleaning vendor.',
    gradient: 'from-forest via-sage to-forest-light',
  },
  {
    slug: 'playground-turf-cleaning-schools-preschools',
    title: 'Is Playground Turf Safe? Cleaning and Sanitizing Standards for Schools and Preschools',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-30',
    excerpt:
      'What schools, preschools, and childcare centers need to know about cleaning and sanitizing playground artificial turf. Covers bacteria risks, child-safe cleaning products, frequency, and documentation administrators expect.',
    gradient: 'from-sage via-emerald-500 to-forest',
  },
  {
    slug: 'gym-hotel-event-venue-turf-cleaning',
    title: 'Commercial Turf Cleaning for Gyms, Hotels and Event Venues',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-28',
    excerpt:
      'How gyms, hotels, and event venues keep artificial turf clean, safe, and guest-ready. Covers high-traffic wear, sweat and bacteria in fitness turf, hospitality appearance standards, and building a recurring maintenance plan.',
    gradient: 'from-forest-dark via-forest to-sage',
  },
  {
    slug: 'dog-daycare-turf-cleaning-irvine',
    title: 'Dog Daycare Turf Cleaning in Irvine: Keeping Play Yards Odor-Free Near the Coast',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-27',
    excerpt:
      'How dog daycares, boarding facilities, and pet resorts in Irvine keep artificial turf play yards sanitary and odor-free, with coastal-climate cleaning frequency and Irvine landscape standards.',
    gradient: 'from-sage via-forest to-forest-dark',
  },
  {
    slug: 'commercial-turf-cleaning-anaheim-hotels-venues',
    title: 'Commercial Turf Cleaning in Anaheim: Hotels, Event Lawns and High-Traffic Venues',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-26',
    excerpt:
      'Anaheim hotels, resorts, and event venues near the Convention Center and Resort District rely on guest-ready turf. How foot traffic and inland heat drive a recurring commercial cleaning plan.',
    gradient: 'from-forest-dark via-forest to-sage',
  },
  {
    slug: 'hoa-turf-maintenance-newport-beach',
    title: 'HOA Artificial Turf Maintenance in Newport Beach: Common-Area Care on the Coast',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-25',
    excerpt:
      'How Newport Beach HOAs keep common-area artificial turf clean and compliant, covering coastal salt air, Davis-Stirling responsibilities, budgeting, and a vendor checklist for boards.',
    gradient: 'from-forest via-sage to-forest-light',
  },
  {
    slug: 'preschool-turf-cleaning-huntington-beach',
    title: 'Preschool and Playground Turf Cleaning in Huntington Beach: Safe Surfaces by the Sea',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-24',
    excerpt:
      'How preschools and childcare centers in Huntington Beach keep playground turf clean and child-safe, covering coastal moisture, Community Care Licensing standards, and a sanitizing schedule.',
    gradient: 'from-sage via-emerald-500 to-forest',
  },
  {
    slug: 'hoa-turf-maintenance-temecula',
    title: 'HOA Turf Maintenance in Temecula: Master-Planned Communities and Inland Heat',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-23',
    excerpt:
      'How Temecula HOAs keep common-area artificial turf clean in extreme Inland Empire heat, covering Davis-Stirling responsibilities, budgeting, and a vendor checklist for community boards.',
    gradient: 'from-forest via-sage to-forest-light',
  },
  {
    slug: 'dog-daycare-turf-cleaning-murrieta',
    title: 'Dog Daycare Turf Cleaning in Murrieta: Beating the Inland Empire Heat',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-22',
    excerpt:
      'How dog daycares, boarding facilities, and kennels in Murrieta keep artificial turf sanitary in extreme heat, with deep extraction and a local commercial cleaning schedule.',
    gradient: 'from-sage via-forest to-forest-dark',
  },
  {
    slug: 'school-turf-cleaning-riverside',
    title: 'School and Playground Turf Cleaning in Riverside: Safe Surfaces in the Heat',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-21',
    excerpt:
      'How schools and childcare centers in Riverside keep playground turf clean and child-safe through Inland Empire heat, covering Title 22 standards and sanitizing frequency.',
    gradient: 'from-sage via-emerald-500 to-forest',
  },
  {
    slug: 'gym-fitness-turf-cleaning-corona',
    title: 'Gym and Fitness Turf Cleaning in Corona: Sweat, Bacteria and High-Traffic Floors',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-20',
    excerpt:
      'How gyms and fitness studios in Corona keep artificial turf training areas clean and odor-free, covering sweat-driven bacteria, Inland Empire heat, and a recurring cleaning plan.',
    gradient: 'from-forest-dark via-forest to-sage',
  },
  {
    slug: 'hoa-turf-maintenance-walnut-creek',
    title: 'HOA Turf Maintenance in Walnut Creek: Common-Area Care in the East Bay',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-19',
    excerpt:
      'How Walnut Creek HOAs keep common-area artificial turf clean and compliant, covering East Bay damp and mildew, Davis-Stirling responsibilities, budgeting, and a vendor checklist.',
    gradient: 'from-forest via-sage to-forest-light',
  },
  {
    slug: 'dog-daycare-turf-cleaning-concord',
    title: 'Dog Daycare Turf Cleaning in Concord: Odor Control in the East Bay',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-18',
    excerpt:
      'How dog daycares and kennels in Concord keep artificial turf play yards sanitary and odor-free, covering East Bay moisture, cleaning frequency, and choosing a commercial vendor.',
    gradient: 'from-sage via-forest to-forest-dark',
  },
  {
    slug: 'preschool-turf-cleaning-san-ramon',
    title: 'Preschool Turf Cleaning in San Ramon: Child-Safe Play Yards in the Tri-Valley',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-17',
    excerpt:
      'How preschools and childcare centers in San Ramon keep playground turf clean and child-safe, covering East Bay climate, Community Care Licensing standards, and a sanitizing schedule.',
    gradient: 'from-sage via-emerald-500 to-forest',
  },
  {
    slug: 'gym-hotel-turf-cleaning-pleasanton',
    title: 'Gym and Hotel Turf Cleaning in Pleasanton: Guest-Ready Surfaces in the Tri-Valley',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-16',
    excerpt:
      'How gyms, hotels, and corporate campuses in Pleasanton keep artificial turf clean, odor-free, and guest-ready, covering sweat and foot traffic, appearance standards, and a recurring plan.',
    gradient: 'from-forest-dark via-forest to-sage',
  },
  {
    slug: 'hoa-turf-maintenance-roseville',
    title: 'HOA Turf Maintenance in Roseville: Master-Planned Communities and Valley Heat',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-15',
    excerpt:
      'How Roseville HOAs keep common-area artificial turf clean in Central Valley heat, covering Davis-Stirling responsibilities, budgeting, and a vendor checklist for community boards.',
    gradient: 'from-forest via-sage to-forest-light',
  },
  {
    slug: 'dog-daycare-turf-cleaning-sacramento',
    title: 'Dog Daycare Turf Cleaning in Sacramento: Odor Control in Valley Heat',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-14',
    excerpt:
      'How dog daycares and kennels in Sacramento keep artificial turf play yards sanitary in Central Valley heat, with deep extraction and a recurring commercial cleaning schedule.',
    gradient: 'from-sage via-forest to-forest-dark',
  },
  {
    slug: 'preschool-turf-cleaning-elk-grove',
    title: 'Preschool and Childcare Turf Cleaning in Elk Grove: Safe Play Yards in the Valley',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-13',
    excerpt:
      'How preschools and childcare centers in Elk Grove keep playground turf clean and child-safe through Central Valley heat, covering Title 22 standards and sanitizing frequency.',
    gradient: 'from-sage via-emerald-500 to-forest',
  },
  {
    slug: 'gym-hotel-turf-cleaning-folsom',
    title: 'Gym, Hotel and Event Turf Cleaning in Folsom: Guest-Ready Surfaces in the Valley',
    category: 'Commercial',
    author: "Murphy's Turf Team",
    date: '2026-05-12',
    excerpt:
      'How gyms, hotels, and event venues in Folsom keep artificial turf clean, odor-free, and guest-ready, covering sweat and foot traffic, valley heat, and a recurring commercial cleaning plan.',
    gradient: 'from-forest-dark via-forest to-sage',
  },
];

const categories = ['All', 'Turf Cleaning', 'Pet Care', 'Maintenance Tips', 'Local Guides', 'Commercial'] as const;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Turf Cleaning': { bg: 'bg-sage/15', text: 'text-sage-dark' },
  'Pet Care': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Maintenance Tips': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Local Guides': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Commercial': { bg: 'bg-forest/10', text: 'text-forest' },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ----------------------- CATEGORY COUNTS ----------------------- */

const categoryCounts: Record<string, number> = {};
blogPosts.forEach((post) => {
  categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
});

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function BlogPage() {
  return (
    <>
      {/* ----------------- HERO ----------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-sage/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            Insights &amp; Expertise
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Murphy&apos;s Turf Blog
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-3xl mx-auto">
            Artificial Turf Cleaning Tips, Pet Care Guides &amp; Maintenance Insights for California Homeowners
          </p>
        </AnimateOnScroll>
      </section>

      {/* ----------------- BLOG CONTENT ----------------- */}
      <BlogContent
        posts={blogPosts}
        categories={categories as unknown as string[]}
        categoryColors={categoryColors}
        categoryCounts={categoryCounts}
      />
    </>
  );
}
