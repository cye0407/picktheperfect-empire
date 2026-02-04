// src/data/searchProfiles.ts

export interface SearchProfile {
  slug: string;
  title: string;
  description: string;
  preset: Partial<{
    strawberryType: string;
    flavorCategory: string;
    textureCategory: string;
    sizeCategory: string;
    useCase: string[];
    harvestWindow: string;
    yieldPotential: string;
    containerFriendly: string;
    difficulty: string;
    climateSuitability: string;
    sweetness: number;
    tartness: number;
  }>;
}

export const searchProfiles: SearchProfile[] = [
  {
    slug: "best-strawberries-for-beginners",
    title: "Best Strawberries for Beginners",
    description: "Easy-to-grow strawberry varieties perfect for new gardeners",
    preset: {
      difficulty: "beginner",
    },
  },
  {
    slug: "container-strawberries",
    title: "Best Strawberries for Containers",
    description: "Compact varieties perfect for pots and small spaces",
    preset: {
      containerFriendly: "Yes",
    },
  },
  {
    slug: "sweetest-strawberries",
    title: "Sweetest Strawberry Varieties",
    description: "The sweetest strawberries for fresh eating",
    preset: {
      sweetness: 9,
      useCase: ["fresh_eating"],
    },
  },
  {
    slug: "strawberries-for-jam",
    title: "Best Strawberries for Jam",
    description: "Top varieties for making homemade strawberry jam",
    preset: {
      useCase: ["jam", "preserves"],
    },
  },
  {
    slug: "everbearing-strawberries",
    title: "Everbearing Strawberry Varieties",
    description: "Strawberries that produce multiple harvests per season",
    preset: {
      strawberryType: "everbearing",
    },
  },
  {
    slug: "day-neutral-strawberries",
    title: "Day-Neutral Strawberry Varieties",
    description: "Continuous-producing strawberries for all-season harvest",
    preset: {
      strawberryType: "day_neutral",
      harvestWindow: "continuous",
    },
  },
  {
    slug: "alpine-strawberries",
    title: "Alpine Strawberry Varieties",
    description: "Small intensely-flavored wild strawberry types",
    preset: {
      strawberryType: "alpine",
    },
  },
  {
    slug: "high-yield-strawberries",
    title: "Highest Yielding Strawberries",
    description: "Most productive strawberry varieties for big harvests",
    preset: {
      yieldPotential: "very_high",
    },
  },
];

export function getProfileBySlug(slug: string): SearchProfile | undefined {
  return searchProfiles.find((p) => p.slug === slug);
}
