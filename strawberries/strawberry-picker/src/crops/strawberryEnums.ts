// src/crops/strawberryEnums.ts

export const STRAWBERRY_USE_CASES = [
  "fresh_eating",
  "jam",
  "freezing",
  "baking",
  "drying",
  "wine",
  "smoothies",
  "preserves",
  "desserts",
  "salads",
] as const;

export type StrawberryUseCase = typeof STRAWBERRY_USE_CASES[number];

export const STRAWBERRY_TYPES = [
  { value: "june_bearing", label: "June-Bearing (single large harvest)" },
  { value: "everbearing", label: "Everbearing (two main harvests)" },
  { value: "day_neutral", label: "Day-Neutral (continuous production)" },
  { value: "alpine", label: "Alpine (small, intensely flavored)" },
  { value: "musk", label: "Musk (aromatic, specialty)" },
];

export type StrawberryType = "june_bearing" | "everbearing" | "day_neutral" | "alpine" | "musk";

export const FLAVOR_CATEGORIES = [
  { value: "classic", label: "Classic (traditional strawberry)" },
  { value: "aromatic", label: "Aromatic (fragrant, perfumed)" },
  { value: "mild", label: "Mild (subtle, delicate)" },
  { value: "tart", label: "Tart (tangy, acidic)" },
  { value: "complex", label: "Complex (layered, nuanced)" },
  { value: "wild", label: "Wild (intense, woodland)" },
];

export type FlavorCategory = "classic" | "aromatic" | "mild" | "tart" | "complex" | "wild";

export const TEXTURE_CATEGORIES = [
  { value: "firm", label: "Firm (holds shape well)" },
  { value: "medium", label: "Medium (balanced)" },
  { value: "soft", label: "Soft (tender, juicy)" },
];

export type TextureCategory = "firm" | "medium" | "soft";

export const SIZE_CATEGORIES = [
  { value: "small", label: "Small (under 10g)" },
  { value: "medium", label: "Medium (10-20g)" },
  { value: "large", label: "Large (20-30g)" },
  { value: "very_large", label: "Very Large (30g+)" },
];

export type SizeCategory = "small" | "medium" | "large" | "very_large";

export const HARVEST_WINDOWS = [
  { value: "short", label: "Short (2-3 weeks)" },
  { value: "medium", label: "Medium (4-6 weeks)" },
  { value: "long", label: "Long (6-8 weeks)" },
  { value: "continuous", label: "Continuous (all season)" },
];

export type HarvestWindow = "short" | "medium" | "long" | "continuous";

export const YIELD_POTENTIALS = [
  { value: "low", label: "Low yield" },
  { value: "medium", label: "Medium yield" },
  { value: "high", label: "High yield" },
  { value: "very_high", label: "Very high yield" },
];

export type YieldPotential = "low" | "medium" | "high" | "very_high";

export const CLIMATES = [
  { value: "cool", label: "Cool climate" },
  { value: "temperate", label: "Temperate climate" },
  { value: "warm", label: "Warm climate" },
  { value: "hot", label: "Hot climate" },
];

export type Climate = "cool" | "temperate" | "warm" | "hot";

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner (easy, forgiving)" },
  { value: "intermediate", label: "Intermediate (some experience)" },
  { value: "advanced", label: "Advanced (challenging)" },
];

export type Difficulty = "beginner" | "intermediate" | "advanced";
