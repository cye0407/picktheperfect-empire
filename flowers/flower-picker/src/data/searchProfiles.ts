// src/data/searchProfiles.ts

export interface SearchProfile {
  slug: string;
  title: string;
  description: string;
  preset: Partial<{
    lifespan: string;
    primaryColor: string;
    bloomSeason: string;
    fragranceIntensity: number;
    sunRequirement: string;
    difficulty: string;
    containerFriendly: string;
    useCase: string[];
    waterNeeds: string;
    deerResistant: string;
  }>;
}

export const searchProfiles: SearchProfile[] = [
  {
    slug: "best-flowers-for-beginners",
    title: "Best Flowers for Beginners",
    description: "Easy-to-grow flower varieties perfect for new gardeners. Forgiving, reliable, and beautiful.",
    preset: {
      difficulty: "beginner",
    },
  },
  {
    slug: "best-cut-flowers",
    title: "Best Cut Flowers for Bouquets",
    description: "Top flower varieties for cutting gardens and stunning home arrangements.",
    preset: {
      useCase: ["cutting"],
    },
  },
  {
    slug: "best-flowers-for-containers",
    title: "Best Flowers for Containers",
    description: "Compact flower varieties perfect for pots, planters, and balcony gardens.",
    preset: {
      containerFriendly: "Yes",
    },
  },
  {
    slug: "best-pollinator-flowers",
    title: "Best Flowers for Pollinators",
    description: "Attract bees, butterflies, and hummingbirds with these pollinator-friendly varieties.",
    preset: {
      useCase: ["pollinator_garden"],
    },
  },
  {
    slug: "most-fragrant-flowers",
    title: "Most Fragrant Garden Flowers",
    description: "Beautifully scented flower varieties for fragrance gardens and sensory enjoyment.",
    preset: {
      fragranceIntensity: 8,
    },
  },
  {
    slug: "deer-resistant-flowers",
    title: "Best Deer-Resistant Flowers",
    description: "Beautiful flower varieties that deer tend to leave alone.",
    preset: {
      deerResistant: "Yes",
    },
  },
  {
    slug: "shade-flowers",
    title: "Best Flowers for Shade",
    description: "Beautiful flowers that thrive in partial to full shade conditions.",
    preset: {
      sunRequirement: "part_shade",
    },
  },
  {
    slug: "drought-tolerant-flowers",
    title: "Best Drought-Tolerant Flowers",
    description: "Low-water flower varieties perfect for dry climates and water-wise gardens.",
    preset: {
      waterNeeds: "low",
    },
  },
  {
    slug: "perennial-flowers",
    title: "Best Perennial Flowers",
    description: "Long-lived perennial flower varieties that return year after year.",
    preset: {
      lifespan: "perennial",
    },
  },
  {
    slug: "cottage-garden-flowers",
    title: "Best Cottage Garden Flowers",
    description: "Charming, romantic flower varieties for the classic cottage garden style.",
    preset: {
      useCase: ["cottage_garden"],
    },
  },
];

export function getProfileBySlug(slug: string): SearchProfile | undefined {
  return searchProfiles.find((p) => p.slug === slug);
}
