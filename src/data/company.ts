import type { Company } from '../types';

export const company: Company = {
  name: "Murphy's Turf Care",
  tagline: "Transform Your Lawn Into a Masterpiece",
  phone: "(951) 331-3300",
  email: "info@murphysturfcare.com",
  address: {
    street: "26323 Jefferson Avenue",
    city: "Murrieta",
    state: "CA",
    zip: "92562",
  },
  businessHours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  founded: 2018,
  description: `Murphy's Turf Care was founded in 2018 by Patrick Murphy, a passionate lawn care professional with deep roots in Southern California. What started as a one-truck operation serving a handful of neighbors in Murrieta has grown into one of California's most trusted turf cleaning and lawn care companies, with a dedicated team of over 25 professionals serving thousands of homeowners across four California communities.

As a family-owned business, we take pride in treating every customer's lawn as if it were our own. Patrick's hands-on approach and commitment to quality have shaped every aspect of our operations — from the California-adapted techniques we use to the eco-friendly products we choose. We understand the unique challenges that come with maintaining a beautiful lawn in California's Mediterranean climate, and we bring that local expertise to every job. Whether you're dealing with drought stress, water conservation challenges, or the relentless California sun, Murphy's Turf Care has the knowledge, equipment, and passion to transform your yard into the neighborhood standout.`,
  mission: "To deliver exceptional lawn care that homeowners can be proud of, using sustainable practices that protect California's natural beauty.",
  values: [
    {
      title: "Quality First",
      description: "We never cut corners. Every lawn receives our full attention, premium products, and proven techniques that deliver visible, lasting results.",
    },
    {
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen to your concerns, customize our approach to your lawn's unique needs, and stand behind our work with a satisfaction guarantee.",
    },
    {
      title: "Eco-Friendly",
      description: "We're committed to sustainable practices that keep your lawn healthy without harming California's environment. Our products are safe for families, pets, and local waterways.",
    },
    {
      title: "Community Driven",
      description: "As a California family business, we're invested in the communities we serve. We sponsor local youth sports, participate in neighborhood cleanups, and believe in giving back to the places that have supported our growth.",
    },
  ],
  stats: {
    yearsInBusiness: 8,
    customersServed: "2,500+",
    satisfactionRate: "98%",
    projectsCompleted: "10,000+",
  },
  socialMedia: {
    facebook: "#",
    instagram: "#",
    google: "#",
    yelp: "#",
  },
  certifications: [
    "Licensed & Insured",
    "EPA Certified",
    "California Landscape Contractors Association",
    "Better Business Bureau A+ Rated",
  ],
};
