import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Trash2,
  Wind,
  Sprout,
  Droplets,
  Bug,
  CalendarDays,
  Check,
  ArrowRight,
  Phone,
  ChevronRight,
  ShieldCheck,
  Clock,
  ThumbsUp,
  TrendingUp,
  Zap,
  Leaf,
  Sun,
  Snowflake,
  CloudRain,
  Recycle,
  Target,
  Heart,
  Award,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQ {
  question: string;
  answer: string;
}

interface BenefitCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BeforeAfterPair {
  label: string;
  beforeColor: string;
  afterColor: string;
  beforeCaption: string;
  afterCaption: string;
}

interface RelatedService {
  name: string;
  slug: string;
}

interface ServiceData {
  name: string;
  slug: string;
  icon: LucideIcon;
  tagline: string;
  price: number;
  priceLabel?: string;
  metaDescription: string;
  descriptionParagraphs: string[];
  included: string[];
  benefits: BenefitCard[];
  beforeAfter: BeforeAfterPair[];
  faqs: FAQ[];
  relatedServices: RelatedService[];
}

// ---------------------------------------------------------------------------
// Service Data
// ---------------------------------------------------------------------------

const servicesData: Record<string, ServiceData> = {
  'lawn-cleaning': {
    name: 'Lawn Cleaning',
    slug: 'lawn-cleaning',
    icon: Trash2,
    tagline: 'A fresh start for your California lawn',
    price: 49,
    metaDescription:
      "Professional lawn cleaning services in California. Murphy's Turf Care removes debris, dethatches, and deep cleans your turf to restore health and curb appeal throughout the year.",
    descriptionParagraphs: [
      "California lawns endure a lot. Between dry summers, Santa Ana winds, fallen leaves, and the steady accumulation of debris, your turf can end up buried under layers of organic matter that choke out new growth. Murphy's Turf Care professional lawn cleaning service is designed to tackle all of it, restoring your yard to a clean, healthy canvas that is ready to flourish during the growing season.",
      "Our cleaning process goes far beyond raking leaves. We begin with a thorough surface debris removal, picking up branches, trash, animal waste, and anything else that has collected over the off-season. Next, we perform a power dethatching to strip away the dense mat of dead grass and roots sitting between the soil surface and the living blades. Thatch layers thicker than half an inch prevent water, oxygen, and fertilizer from reaching the root zone, so removing them is one of the single most impactful things you can do for your lawn.",
      "Once the debris and thatch are cleared, we trim all lawn edges for a crisp, manicured look, inspect the surface grade for any low spots that could pool water, and apply a light mulching pass to return fine organic matter to the soil. Every job ends with a post-cleanup walk-through so you can see the results firsthand. Whether you are preparing for spring or recovering from a particularly rough season, our lawn cleaning service sets the stage for everything else your turf needs to succeed in California's climate.",
    ],
    included: [
      'Complete surface debris removal',
      'Power dethatching',
      'Precision edge trimming',
      'Leaf and pine needle cleanup',
      'Surface grading inspection',
      'Post-cleanup walk-through inspection',
      'Fine mulching pass',
      'Debris hauling and disposal',
    ],
    benefits: [
      {
        icon: Sparkles,
        title: 'Instant Curb Appeal',
        description:
          'A clean lawn is a beautiful lawn. Remove months of buildup and reveal the vibrant green underneath.',
      },
      {
        icon: Zap,
        title: 'Better Nutrient Absorption',
        description:
          'Dethatching opens the soil surface so water, fertilizer, and oxygen can reach the roots where they matter.',
      },
      {
        icon: ShieldCheck,
        title: 'Disease Prevention',
        description:
          'Matted debris harbors fungal spores and pests. A thorough cleaning reduces the risk of lawn diseases.',
      },
      {
        icon: TrendingUp,
        title: 'Faster Spring Green-Up',
        description:
          'Lawns cleaned before the growing season green up faster and more evenly than those left untreated.',
      },
    ],
    beforeAfter: [
      {
        label: 'Spring Post-Winter Cleanup',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Matted debris after snow melt',
        afterCaption: 'Clean, dethatched, and edged',
      },
      {
        label: 'Cottonwood Season Cleanup',
        beforeColor: 'bg-cream-dark',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Cottonwood fluff covering lawn',
        afterCaption: 'Pristine turf ready for summer',
      },
    ],
    faqs: [
      {
        question: 'How often should I have my lawn professionally cleaned?',
        answer:
          'For most California properties, we recommend a thorough cleaning at least twice per year: once in early spring and again in late fall after the leaves have dropped. Properties surrounded by trees may benefit from an additional mid-summer cleaning.',
      },
      {
        question: 'Is dethatching included in every lawn cleaning?',
        answer:
          'Yes. Every lawn cleaning includes a power dethatching pass. If your thatch layer is unusually thick (over one inch), we may recommend a dedicated deep dethatching service for the best results.',
      },
      {
        question: 'What do you do with the debris you collect?',
        answer:
          'All organic debris is hauled away and composted at a licensed facility. Non-organic waste is disposed of responsibly. Debris removal and disposal costs are included in our pricing with no hidden fees.',
      },
      {
        question: 'Can you clean artificial turf as well?',
        answer:
          'Absolutely. We offer specialized synthetic turf cleaning that includes brushing, sanitizing, and infill redistribution. Contact us for a separate quote tailored to artificial turf maintenance.',
      },
    ],
    relatedServices: [
      { name: 'Aeration', slug: 'aeration' },
      { name: 'Seeding', slug: 'seeding' },
      { name: 'Seasonal Maintenance', slug: 'seasonal-maintenance' },
    ],
  },

  aeration: {
    name: 'Aeration',
    slug: 'aeration',
    icon: Wind,
    tagline: 'Break through compacted soil, unlock your lawn\'s potential',
    price: 89,
    metaDescription:
      "Core aeration services for California lawns. Murphy's Turf Care combats soil compaction so water, oxygen, and nutrients reach your lawn's root zone.",
    descriptionParagraphs: [
      "If you have lived in California for any amount of time, you already know the soil can be tough. Clay composition, foot traffic, and the natural settling that occurs over time leave many California lawns sitting on a near-impenetrable layer of compacted earth. When the soil is compacted, water runs off instead of soaking in, fertilizer sits on the surface instead of feeding roots, and grassroots struggle to expand. Core aeration is the single most effective remedy.",
      "During a core aeration service, our commercial-grade aerators punch thousands of small plugs out of your lawn, each roughly three inches deep. These cores are left on the surface to break down naturally, returning nutrients to the soil while the holes they leave behind provide direct channels for air, water, and fertilizer to penetrate deep into the root zone. In California's climate, where intense sun and water conservation demands stress lawns, maximizing every drop of water and every ounce of nutrient is critical.",
      "We begin every aeration job with a thorough soil assessment. We check moisture levels, identify areas of heavy compaction using a penetrometer, and map out any irrigation lines or utilities to avoid. After aerating, we provide detailed post-aeration watering guidance tailored to your specific soil conditions and the current season. For the best results, we strongly recommend pairing aeration with overseeding and fertilization, as the freshly opened soil creates ideal conditions for seed germination and nutrient uptake.",
    ],
    included: [
      'Pre-aeration soil assessment',
      'Full-lawn core aeration',
      'Compaction mapping',
      'Plug distribution and management',
      'Soil moisture evaluation',
      'Post-aeration watering guidance',
    ],
    benefits: [
      {
        icon: Droplets,
        title: 'Improved Water Penetration',
        description:
          'Aeration holes allow water to soak deep into clay soil instead of pooling on the surface or running off.',
      },
      {
        icon: TrendingUp,
        title: 'Stronger Root Growth',
        description:
          'Loose soil lets roots expand freely, building a deeper, more resilient root system that handles drought better.',
      },
      {
        icon: Leaf,
        title: 'Enhanced Nutrient Uptake',
        description:
          'Fertilizer reaches the root zone directly through aeration channels instead of sitting on compacted soil.',
      },
      {
        icon: ShieldCheck,
        title: 'Reduced Thatch Buildup',
        description:
          'Core aeration introduces soil microbes to the thatch layer, accelerating its natural decomposition.',
      },
    ],
    beforeAfter: [
      {
        label: 'Clay Soil Compaction Relief',
        beforeColor: 'bg-brown/50',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Compacted clay, water pooling',
        afterCaption: 'Aerated lawn absorbing water freely',
      },
      {
        label: 'Thin Lawn Recovery',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Sparse, stressed turf on hard soil',
        afterCaption: 'Dense growth 6 weeks after aeration',
      },
    ],
    faqs: [
      {
        question: 'When is the best time to aerate in California?',
        answer:
          'For warm-season grasses like Bermuda and St. Augustine, late spring through early summer is the ideal aeration window. For cool-season grasses like tall fescue, early fall is best. We do not recommend aerating during the peak heat of summer when lawns are already under stress.',
      },
      {
        question: 'Should I pick up the soil plugs after aeration?',
        answer:
          'No. The plugs break down within one to two weeks and return valuable nutrients and microorganisms to the soil surface. Leaving them in place is an important part of the process.',
      },
      {
        question: 'How often does my lawn need aeration?',
        answer:
          'Most California lawns benefit from aeration once per year. High-traffic areas, heavy clay soils, or lawns that feel spongy from thatch buildup may benefit from twice-annual aeration in both spring and fall.',
      },
      {
        question: 'Can I mow right after aeration?',
        answer:
          'We recommend waiting at least two to three days before mowing after aeration. This gives the soil plugs time to begin breaking down and ensures the aeration holes remain open to receive water and nutrients.',
      },
    ],
    relatedServices: [
      { name: 'Seeding', slug: 'seeding' },
      { name: 'Fertilization', slug: 'fertilization' },
      { name: 'Lawn Cleaning', slug: 'lawn-cleaning' },
    ],
  },

  seeding: {
    name: 'Seeding',
    slug: 'seeding',
    icon: Sprout,
    tagline: 'Establish a lush, drought-resistant California lawn',
    price: 129,
    metaDescription:
      "Professional overseeding and new lawn establishment in California. Murphy's Turf Care uses drought-resistant grass varieties perfectly adapted to California's soil and climate.",
    descriptionParagraphs: [
      "Building a thick, healthy lawn in California requires more than scattering seed and hoping for the best. The combination of intense sun, water conservation demands, varied soil types, and warm temperatures means only certain grass varieties can truly thrive. Murphy's Turf Care seeding service takes the guesswork out of the equation by selecting, preparing, and planting the exact seed blend your property needs to develop a dense, drought-resistant lawn that stands up to California's demanding conditions.",
      "We offer both overseeding for established lawns that have thinned out and full new lawn establishment for bare or severely damaged areas. Every seeding project starts with a soil test to determine pH, nutrient levels, and organic matter content. Based on the results, we select a custom seed blend from proven California performers, including Bermuda grass for its heat tolerance and durability, tall fescue for deep roots and drought tolerance, and St. Augustine for lush, shade-friendly coverage. Seed is applied with precision calibrated equipment to ensure even distribution at the optimal rate.",
      "Proper seedbed preparation is just as important as the seed itself. We prepare the soil surface by removing debris, lightly raking or aerating to create seed-to-soil contact, and applying a starter fertilizer that promotes rapid root development without burning tender new seedlings. After planting, you receive a detailed watering schedule customized for your soil type and the current weather patterns. We also offer follow-up germination monitoring visits to catch any issues early, ensuring your investment takes root and fills in beautifully.",
    ],
    included: [
      'Comprehensive soil testing',
      'Custom seed blend selection',
      'Seedbed preparation and grading',
      'Precision calibrated overseeding',
      'Starter fertilizer application',
      'Customized watering schedule',
      'Germination monitoring visits',
    ],
    benefits: [
      {
        icon: Sun,
        title: 'Drought Resistance',
        description:
          'California-adapted grass varieties develop deep root systems that survive dry spells and watering restrictions.',
      },
      {
        icon: Target,
        title: 'Weed Suppression',
        description:
          'A thick, dense lawn is the best defense against weeds. Overseeding fills thin spots before weeds can colonize.',
      },
      {
        icon: ThumbsUp,
        title: 'Self-Repairing Turf',
        description:
          'Kentucky bluegrass spreads via stolons, naturally filling in small bare patches and wear areas over time.',
      },
      {
        icon: Award,
        title: 'Increased Property Value',
        description:
          'A lush, well-established lawn boosts curb appeal and can increase property value by up to 15 percent.',
      },
    ],
    beforeAfter: [
      {
        label: 'Thin Lawn Overseeding',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Patchy, thin turf with bare spots',
        afterCaption: 'Thick, uniform coverage after overseeding',
      },
      {
        label: 'New Lawn Establishment',
        beforeColor: 'bg-brown/60',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Bare soil after construction',
        afterCaption: 'Fully established lawn at 8 weeks',
      },
    ],
    faqs: [
      {
        question: 'What grass types do you recommend for California?',
        answer:
          'For most California properties, we recommend Bermuda grass for sunny areas and tall fescue for a blend of sun and shade tolerance. This combination provides durability with deep-rooted drought tolerance. For low-water areas, native grasses and drought-tolerant varieties are excellent options that require minimal irrigation once established.',
      },
      {
        question: 'When is the best time to seed in California?',
        answer:
          'For warm-season grasses like Bermuda, late spring through early summer is the prime seeding window. For cool-season grasses like tall fescue, early fall (September through October) is ideal as soil temperatures are warm enough for germination while cooler air temperatures reduce stress on young seedlings.',
      },
      {
        question: 'How long until I can walk on my newly seeded lawn?',
        answer:
          'We recommend keeping foot traffic off newly seeded areas for at least four to six weeks, or until the grass has been mowed twice. Young seedlings are fragile and can be pulled out of the soil easily before their roots are established.',
      },
      {
        question: 'Do I really need a soil test before seeding?',
        answer:
          'Yes, and here is why. California soils vary widely from region to region, and many areas have alkaline or clay-heavy soils that can lock out key nutrients like iron and phosphorus. A soil test lets us amend the soil and select seed varieties that perform well in your specific conditions, dramatically improving germination rates and long-term lawn health.',
      },
    ],
    relatedServices: [
      { name: 'Aeration', slug: 'aeration' },
      { name: 'Fertilization', slug: 'fertilization' },
      { name: 'Seasonal Maintenance', slug: 'seasonal-maintenance' },
    ],
  },

  fertilization: {
    name: 'Fertilization',
    slug: 'fertilization',
    icon: Droplets,
    tagline: 'Custom nutrient programs for California\'s varied soil',
    price: 59,
    metaDescription:
      "Custom lawn fertilization programs for California's varied soil. Murphy's Turf Care uses slow-release formulas and seasonal timing to deliver the right nutrients at the right time.",
    descriptionParagraphs: [
      "California soil varies widely by region, but many areas struggle with the nutrients your lawn needs to thrive. Many California soils can be alkaline or clay-heavy, making essential micronutrients like iron, manganese, and zinc chemically locked in the soil and unavailable to grass roots, even when they are technically present. The result is yellowing turf, stunted growth, and a lawn that never quite reaches its potential despite your best efforts. Murphy's Turf Care fertilization service solves this problem with science-backed, custom nutrient programs designed specifically for the soils and growing conditions across California.",
      "We do not believe in one-size-fits-all fertilizer. Every program begins with a soil pH test so we know exactly what your lawn is working with. From there, we formulate a custom blend of macronutrients (nitrogen, phosphorus, and potassium) and targeted micronutrients (iron, sulfur, and manganese are the most common California deficiencies) delivered in a slow-release granular format. Slow-release formulas feed your lawn gradually over six to eight weeks, preventing the surge-and-crash cycle that comes with cheap, fast-release products. This means steadier growth, less mowing, and a deeper green that lasts.",
      "Timing matters as much as the formula itself. We build a seasonal fertilization schedule that aligns with your lawn's natural growth cycle: a light feeding in early spring to break dormancy, a heavier application in late spring for peak growth, a maintenance round in summer focused on stress tolerance, and a winterizer application in late fall to build root reserves for the cold months ahead. Each visit also includes a pre-emergent or post-emergent weed prevention treatment, so your fertilization program pulls double duty keeping weeds at bay while feeding your turf.",
    ],
    included: [
      'Soil pH and nutrient testing',
      'Custom nutrient blend formulation',
      'Professional slow-release application',
      'Seasonal fertilization schedule (4-5 rounds)',
      'Pre-emergent weed prevention',
      'Micronutrient supplementation (iron, sulfur, manganese)',
    ],
    benefits: [
      {
        icon: Leaf,
        title: 'Deeper, Richer Green',
        description:
          'Targeted iron and nitrogen applications produce a dark green color that lasts weeks, not days.',
      },
      {
        icon: ShieldCheck,
        title: 'Weed Prevention',
        description:
          'Every fertilization visit includes weed control treatments, giving you a one-two punch in a single service.',
      },
      {
        icon: TrendingUp,
        title: 'Stronger Root System',
        description:
          'Slow-release feeding encourages deep root development that improves drought tolerance and winter hardiness.',
      },
      {
        icon: Recycle,
        title: 'Environmentally Responsible',
        description:
          'Slow-release formulas minimize nutrient runoff, protecting California waterways and the local ecosystem.',
      },
    ],
    beforeAfter: [
      {
        label: 'Iron Deficiency Correction',
        beforeColor: 'bg-yellow-200/60',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Yellowing turf from iron chlorosis',
        afterCaption: 'Rich green after custom iron treatment',
      },
      {
        label: 'Full-Season Fertilization Program',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Thin, pale lawn at season start',
        afterCaption: 'Dense, vibrant turf after 4 rounds',
      },
    ],
    faqs: [
      {
        question: 'How many fertilizer applications does my lawn need per year?',
        answer:
          'Most California lawns perform best with four to five applications per year, spaced roughly six to eight weeks apart from early April through late October. Our seasonal schedule is designed to match your lawn type and local growing conditions.',
      },
      {
        question: 'Is your fertilizer safe for kids and pets?',
        answer:
          'Yes. We use professional-grade, slow-release granular fertilizers that are safe for children and pets once watered in and dry, typically within two to four hours of application. We always notify you of any specific re-entry guidelines after each visit.',
      },
      {
        question: 'Why is my lawn yellow even though I fertilize it myself?',
        answer:
          'Yellowing despite fertilization is almost always caused by iron chlorosis, which is common in many California soils. Standard store-bought fertilizers rarely contain enough iron or the right form of iron to correct this. Our custom blends include chelated iron specifically formulated for high-pH soil.',
      },
      {
        question: 'Do you offer organic fertilization options?',
        answer:
          'We do. Our organic program uses natural nutrient sources such as composted poultry litter, bone meal, and kelp extract. While organic programs take slightly longer to show results, they build long-term soil health and microbial activity that pays dividends over time.',
      },
    ],
    relatedServices: [
      { name: 'Aeration', slug: 'aeration' },
      { name: 'Pest Control', slug: 'pest-control' },
      { name: 'Seasonal Maintenance', slug: 'seasonal-maintenance' },
    ],
  },

  'pest-control': {
    name: 'Pest Control',
    slug: 'pest-control',
    icon: Bug,
    tagline: 'Protect your lawn with eco-friendly, targeted treatments',
    price: 79,
    metaDescription:
      "Eco-friendly lawn pest control for California properties. Murphy's Turf Care uses integrated pest management to eliminate grubs, chinch bugs, and sod webworms while protecting beneficial insects.",
    descriptionParagraphs: [
      "A beautiful lawn can be destroyed in a matter of weeks by pests you never even see. Below the surface, white grubs, the larval stage of Japanese beetles and masked chafers, feed on grass roots until entire sections of turf can be peeled back like a carpet. On the surface, chinch bugs drain the sap from grass blades, leaving behind expanding patches of brown, dead turf that are often mistaken for drought damage. And at night, sod webworms chew through grass blades close to the soil line, leaving ragged, thinning areas that get worse with every passing day. Murphy's Turf Care pest control service identifies and eliminates these threats using an integrated pest management approach that is effective, targeted, and environmentally responsible.",
      "Integrated pest management, or IPM, means we do not blanket your entire property with chemicals and call it a day. Instead, we start with a thorough inspection to identify exactly which pests are present, where they are concentrated, and how severe the infestation is. We pull soil samples, examine damaged turf under magnification, and look for telltale signs like grub castings, webworm frass, or chinch bug feeding patterns. Only after we have a clear diagnosis do we apply treatment, and we target it precisely where it is needed. This approach uses less product, costs less, and protects the beneficial insects like earthworms and pollinators that keep your lawn ecosystem healthy.",
      "For homeowners who prefer a fully natural approach, we offer organic pest control options that rely on biological controls like beneficial nematodes for grubs, Bt (Bacillus thuringiensis) for webworms, and neem-based products for surface feeders. Regardless of the treatment path you choose, every pest control service includes a follow-up inspection two to three weeks after application to verify that the treatment is working and no additional action is needed. We also provide preventive barrier treatments that discourage pests from returning, keeping your lawn protected all season long.",
    ],
    included: [
      'Comprehensive pest identification and diagnosis',
      'Targeted treatment application',
      'Preventive perimeter barrier treatment',
      'Follow-up inspection (2-3 weeks post-treatment)',
      'Organic and biological treatment options',
      'Integrated weed management',
    ],
    benefits: [
      {
        icon: Target,
        title: 'Precision Targeting',
        description:
          'We treat the pests that are actually present rather than applying broad-spectrum chemicals to the entire lawn.',
      },
      {
        icon: Recycle,
        title: 'Eco-Friendly Methods',
        description:
          'Our IPM approach minimizes chemical use and protects pollinators, earthworms, and beneficial soil organisms.',
      },
      {
        icon: ShieldCheck,
        title: 'Season-Long Protection',
        description:
          'Preventive barrier treatments keep pests from returning, reducing the need for reactive treatments later.',
      },
      {
        icon: Heart,
        title: 'Safe for Families',
        description:
          'Our products and methods are selected with safety in mind. We offer fully organic options for the most sensitive properties.',
      },
    ],
    beforeAfter: [
      {
        label: 'Grub Damage Restoration',
        beforeColor: 'bg-brown/50',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Turf peeling from grub root damage',
        afterCaption: 'Healthy recovery after grub treatment',
      },
      {
        label: 'Chinch Bug Treatment',
        beforeColor: 'bg-yellow-700/30',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Brown patches from chinch bug feeding',
        afterCaption: 'Full recovery 4 weeks post-treatment',
      },
    ],
    faqs: [
      {
        question: 'How do I know if I have grubs in my lawn?',
        answer:
          'The classic sign of a grub infestation is turf that feels spongy underfoot and can be rolled back from the soil. You may also notice increased activity from skunks, raccoons, or birds digging in your lawn, as these animals feed on grubs. If you suspect grubs, we can confirm with a quick soil pull to check larval counts.',
      },
      {
        question: 'Are your pest control products safe for pets?',
        answer:
          'Yes. All products we use are EPA-registered and labeled for residential use. We recommend keeping pets off treated areas until the product has dried, usually two to four hours. Our organic treatment options are an excellent choice for households with pets who spend a lot of time on the lawn.',
      },
      {
        question: 'When should I treat for grubs in California?',
        answer:
          'Preventive grub treatments are most effective when applied in June or early July, before eggs hatch and larvae begin feeding. Curative treatments for active infestations work best in August and September when grubs are small and close to the surface. Fall grubs that have grown large are much harder to control.',
      },
      {
        question: 'Do you treat for lawn weeds as part of pest control?',
        answer:
          'Yes. Our pest control service includes integrated weed management because weeds often proliferate in areas where pests have weakened the turf. We address both problems simultaneously so your lawn recovers faster and more completely.',
      },
    ],
    relatedServices: [
      { name: 'Fertilization', slug: 'fertilization' },
      { name: 'Lawn Cleaning', slug: 'lawn-cleaning' },
      { name: 'Seasonal Maintenance', slug: 'seasonal-maintenance' },
    ],
  },

  'seasonal-maintenance': {
    name: 'Seasonal Maintenance',
    slug: 'seasonal-maintenance',
    icon: CalendarDays,
    tagline: 'Year-round professional care, one simple plan',
    price: 199,
    priceLabel: '/month',
    metaDescription:
      "Year-round lawn care maintenance programs for California homeowners. Murphy's Turf Care handles spring cleanup, summer watering, fall aeration, and seasonal prep so you don't have to.",
    descriptionParagraphs: [
      "California's climate presents unique year-round challenges for your lawn. Spring brings rapid growth, compacted soil, and a rush of weed germination. Summer delivers scorching sun, watering restrictions, and heat stress. Fall is prime time for aeration and overseeding but also the season when cooler temperatures can invite fungal issues. And winter, while milder than other states, can still bring dormancy and damage if lawns are not properly maintained. Managing all of this on your own requires knowledge, equipment, and a time commitment that most homeowners simply cannot sustain. That is where our Seasonal Maintenance program comes in.",
      "Murphy's Turf Care Seasonal Maintenance is a comprehensive, year-round lawn care plan that covers every service your turf needs, when it needs it, for a single predictable monthly fee. In spring, we handle post-winter cleanup, early fertilization, and pre-emergent weed control. Summer brings mowing height guidance, irrigation system auditing, and targeted pest treatments. Fall is dedicated to core aeration, overseeding, winterizer fertilization, and leaf removal. And in late fall and early winter, we apply snow mold prevention treatments and prepare your lawn to weather the cold months ahead. Every visit is performed by the same experienced crew, so we know your property intimately and can spot emerging issues before they become expensive problems.",
      "This program is not just about convenience, although it is certainly that. It is about results. Lawns on a year-round maintenance plan consistently outperform lawns that receive sporadic, reactive care. Regular, proactive treatment builds cumulative health in the soil, the root system, and the turf canopy that makes your lawn more resistant to drought, disease, pests, and extreme weather. Our seasonal maintenance clients typically see a noticeable improvement in lawn density and color within the first year, and by year two, their lawns are the envy of the neighborhood. The program includes an annual soil test so we can fine-tune every treatment to your property's evolving needs.",
    ],
    included: [
      'Monthly professional visits (12 per year)',
      'Seasonal fertilization program (4-5 applications)',
      'Mowing height and frequency management',
      'Irrigation system audit and adjustment guidance',
      'Snow mold prevention treatment',
      'Annual comprehensive soil testing',
      'Fall core aeration and overseeding',
      'Spring and fall cleanup services',
    ],
    benefits: [
      {
        icon: Clock,
        title: 'Save Your Weekends',
        description:
          'Stop spending every Saturday on lawn chores. We handle it all so you can enjoy your yard instead of working on it.',
      },
      {
        icon: TrendingUp,
        title: 'Cumulative Results',
        description:
          'Consistent, proactive care builds soil health and turf density that gets better every single year.',
      },
      {
        icon: Snowflake,
        title: 'Four-Season Coverage',
        description:
          'From spring thaw to winter freeze, your lawn is professionally managed through every California season.',
      },
      {
        icon: Award,
        title: 'Predictable Pricing',
        description:
          'One monthly fee covers everything. No surprise invoices, no upsells, no wondering what your lawn needs next.',
      },
    ],
    beforeAfter: [
      {
        label: 'Year-One Transformation',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Neglected lawn at program start',
        afterCaption: 'Same lawn after 12 months of care',
      },
      {
        label: 'Winter-to-Spring Transition',
        beforeColor: 'bg-gray-300',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Post-winter dormancy and damage',
        afterCaption: 'Spring green-up under maintenance plan',
      },
    ],
    faqs: [
      {
        question: 'What exactly is included in the monthly fee?',
        answer:
          'Everything your lawn needs: fertilization, weed control, pest treatments, aeration, overseeding, seasonal cleanups, irrigation guidance, and snow mold prevention. The only service not included is weekly mowing, which can be added as a separate option. There are no hidden fees or surprise charges.',
      },
      {
        question: 'Can I cancel my maintenance plan at any time?',
        answer:
          'Yes. Our seasonal maintenance plans run month-to-month with no long-term contracts. We ask for 30 days notice before cancellation so we can wrap up any pending treatments. Most clients stay with us year after year because the results speak for themselves.',
      },
      {
        question: 'Do you include mowing in the seasonal maintenance plan?',
        answer:
          'Weekly mowing is available as an add-on to the maintenance plan at a discounted rate. The base plan includes mowing height and frequency guidance so that whoever mows your lawn, whether that is you or another provider, follows best practices for the current season and grass type.',
      },
      {
        question: 'How soon will I see results after starting the program?',
        answer:
          'Most homeowners notice a visible improvement in color and density within four to six weeks of the first treatment. Significant transformation, including thickening of thin areas and reduction in weed pressure, typically occurs over the first full growing season. By the end of year two, your lawn will be in the best shape of its life.',
      },
    ],
    relatedServices: [
      { name: 'Aeration', slug: 'aeration' },
      { name: 'Fertilization', slug: 'fertilization' },
      { name: 'Seeding', slug: 'seeding' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = [
  'lawn-cleaning',
  'aeration',
  'seeding',
  'fertilization',
  'pest-control',
  'seasonal-maintenance',
];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.name} Services`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Murphy's Turf Care`,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-16 sm:py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="hidden sm:flex w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-3 tracking-tight">
                {service.name}
              </h1>
              <p className="text-lg sm:text-xl text-white/85 font-body max-w-2xl">
                {service.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Full Description */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8">
            Why {service.name} Matters for California Lawns
          </h2>
          <div className="space-y-6">
            {service.descriptionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What's Included */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            What&apos;s Included
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.included.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="w-6 h-6 bg-sage/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-forest" />
                </div>
                <span className="text-charcoal font-body text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Benefits */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-cream border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BenefitIcon className="w-6 h-6 text-forest" />
                  </div>
                  <h3 className="font-bold font-heading text-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-charcoal-light font-body leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Before / After Gallery */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Before &amp; After
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.beforeAfter.map((pair, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold font-heading text-charcoal text-center">
                  {pair.label}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Before */}
                  <div>
                    <div
                      className={`${pair.beforeColor} rounded-xl aspect-[4/3] flex items-center justify-center`}
                    >
                      <span className="text-charcoal/60 font-heading font-bold text-lg">
                        Before
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-light font-body mt-2 text-center">
                      {pair.beforeCaption}
                    </p>
                  </div>
                  {/* After */}
                  <div>
                    <div
                      className={`${pair.afterColor} rounded-xl aspect-[4/3] flex items-center justify-center`}
                    >
                      <span className="text-forest font-heading font-bold text-lg">
                        After
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-light font-body mt-2 text-center">
                      {pair.afterCaption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Pricing Callout */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-10 sm:p-14 border border-sage/20">
            <p className="text-sm font-body text-charcoal-light uppercase tracking-wider mb-2">
              {service.name} starting at
            </p>
            <p className="text-5xl sm:text-6xl font-bold font-heading text-forest mb-1">
              ${service.price}
              {service.priceLabel && (
                <span className="text-2xl font-normal text-charcoal-light">
                  {service.priceLabel}
                </span>
              )}
            </p>
            <p className="text-charcoal-light font-body mb-8">
              Final pricing based on lawn size and condition. Free estimates, no
              obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get Your Exact Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold font-heading text-charcoal hover:text-forest transition-colors list-none">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-sage flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                  <p className="text-charcoal-light font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Services */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {service.relatedServices.map((related) => {
              const relatedData = servicesData[related.slug];
              const RelatedIcon = relatedData?.icon ?? Leaf;
              return (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group flex flex-col items-center p-6 bg-cream rounded-2xl border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all text-center"
                >
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center mb-3 group-hover:bg-sage/25 transition-colors">
                    <RelatedIcon className="w-6 h-6 text-forest" />
                  </div>
                  <span className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors">
                    {related.name}
                  </span>
                  <span className="text-xs text-sage font-body mt-1 inline-flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready to Transform Your Lawn?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Request a free, no-obligation quote for {service.name.toLowerCase()} and
            discover why homeowners across California trust Murphy&apos;s
            Turf with their lawns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              (951) 331-3300
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
