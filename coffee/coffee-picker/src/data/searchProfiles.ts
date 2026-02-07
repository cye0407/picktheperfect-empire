// src/data/searchProfiles.ts

export interface SearchProfile {
  slug: string;
  title: string;
  description: string;
  preset: Partial<{
    brewMethod: string;
    roastLevel: string;
    originType: string;
    flavorProfile: string[];
    budget: string;
    caffeinePreference: string;
    grindPreference: string;
    organicPreference: string;
    fairTradePreference: string;
    intensityPreference: number;
  }>;
}

export const searchProfiles: SearchProfile[] = [
  {
    slug: "best-espresso-beans",
    title: "Best Espresso Beans",
    description: "Top-rated coffee beans perfect for pulling rich, crema-topped espresso shots.",
    preset: {
      brewMethod: "espresso",
    },
  },
  {
    slug: "best-pour-over-coffee",
    title: "Best Coffee for Pour Over",
    description: "Light and medium roast coffees that shine with pour over brewing methods.",
    preset: {
      brewMethod: "pour_over",
    },
  },
  {
    slug: "best-cold-brew-coffee",
    title: "Best Coffee for Cold Brew",
    description: "Smooth, low-acid coffees optimized for cold brew extraction.",
    preset: {
      brewMethod: "cold_brew",
    },
  },
  {
    slug: "best-dark-roast",
    title: "Best Dark Roast Coffee",
    description: "Bold, intense dark roast coffees with deep, rich flavors.",
    preset: {
      roastLevel: "dark",
    },
  },
  {
    slug: "best-light-roast",
    title: "Best Light Roast Coffee",
    description: "Bright, complex light roast coffees showcasing origin character.",
    preset: {
      roastLevel: "light",
    },
  },
  {
    slug: "best-decaf-coffee",
    title: "Best Decaf Coffee",
    description: "Full-flavored decaf coffees that don't compromise on taste.",
    preset: {
      caffeinePreference: "decaf",
    },
  },
  {
    slug: "best-organic-coffee",
    title: "Best Organic Coffee",
    description: "Certified organic coffees grown without synthetic pesticides or fertilizers.",
    preset: {
      organicPreference: "Yes",
    },
  },
  {
    slug: "best-budget-coffee",
    title: "Best Budget Coffee",
    description: "Great-tasting coffees that won't break the bank.",
    preset: {
      budget: "budget",
    },
  },
  {
    slug: "best-french-press-coffee",
    title: "Best Coffee for French Press",
    description: "Full-bodied coffees that are perfect for French press brewing.",
    preset: {
      brewMethod: "french_press",
    },
  },
  {
    slug: "strongest-coffee",
    title: "Strongest Coffee",
    description: "High-intensity coffees for those who need maximum boldness.",
    preset: {
      intensityPreference: 9,
    },
  },
];

export function getProfileBySlug(slug: string): SearchProfile | undefined {
  return searchProfiles.find((p) => p.slug === slug);
}
