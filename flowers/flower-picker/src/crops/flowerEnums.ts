// src/crops/flowerEnums.ts

export const FLOWER_USE_CASES = [
  "cutting",
  "borders",
  "mass_planting",
  "containers",
  "rock_garden",
  "cottage_garden",
  "formal_garden",
  "naturalizing",
  "dried_flowers",
  "edging",
  "screening",
  "pollinator_garden",
  "moon_garden",
  "fragrance_garden",
] as const;

export type FlowerUseCase = typeof FLOWER_USE_CASES[number];

export const FLOWER_LIFESPANS = [
  { value: "annual", label: "Annual (one season)" },
  { value: "biennial", label: "Biennial (two-year cycle)" },
  { value: "perennial", label: "Perennial (returns yearly)" },
  { value: "tender_perennial", label: "Tender Perennial (perennial in warm zones)" },
];

export const FLOWER_PRIMARY_COLORS = [
  { value: "white", label: "White" },
  { value: "cream", label: "Cream" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "red", label: "Red" },
  { value: "pink", label: "Pink" },
  { value: "magenta", label: "Magenta" },
  { value: "purple", label: "Purple" },
  { value: "blue", label: "Blue" },
  { value: "lavender", label: "Lavender" },
];

export const FLOWER_BLOOM_SEASONS = [
  { value: "early_spring", label: "Early Spring" },
  { value: "mid_spring", label: "Mid Spring" },
  { value: "late_spring", label: "Late Spring" },
  { value: "early_summer", label: "Early Summer" },
  { value: "mid_summer", label: "Mid Summer" },
  { value: "late_summer", label: "Late Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export const FLOWER_SUN_REQUIREMENTS = [
  { value: "full_sun", label: "Full Sun (6+ hours)" },
  { value: "part_sun", label: "Part Sun (4-6 hours)" },
  { value: "part_shade", label: "Part Shade (2-4 hours)" },
  { value: "full_shade", label: "Full Shade (<2 hours)" },
  { value: "sun_to_part_shade", label: "Sun to Part Shade (flexible)" },
];

export const FLOWER_WATER_NEEDS = [
  { value: "low", label: "Low (drought tolerant)" },
  { value: "moderate", label: "Moderate (regular watering)" },
  { value: "high", label: "High (consistently moist)" },
];

export const FLOWER_DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner (easy, forgiving)" },
  { value: "intermediate", label: "Intermediate (some experience)" },
  { value: "advanced", label: "Advanced (challenging)" },
];
