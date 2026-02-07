// src/crops/coffeeEnums.ts

export const COFFEE_FLAVOR_NOTES = [
  "fruity",
  "chocolatey",
  "nutty",
  "floral",
  "earthy",
  "spicy",
  "caramel",
  "citrus",
  "berry",
  "smoky",
] as const;

export type CoffeeFlavorNote = typeof COFFEE_FLAVOR_NOTES[number];

export const COFFEE_BREW_METHODS = [
  { value: "espresso", label: "Espresso" },
  { value: "pour_over", label: "Pour Over" },
  { value: "french_press", label: "French Press" },
  { value: "aeropress", label: "AeroPress" },
  { value: "cold_brew", label: "Cold Brew" },
  { value: "moka_pot", label: "Moka Pot" },
  { value: "drip", label: "Drip / Auto-Drip" },
];

export const COFFEE_ROAST_LEVELS = [
  { value: "light", label: "Light Roast" },
  { value: "medium", label: "Medium Roast" },
  { value: "medium_dark", label: "Medium-Dark Roast" },
  { value: "dark", label: "Dark Roast" },
];

export const COFFEE_ORIGIN_TYPES = [
  { value: "single_origin", label: "Single Origin" },
  { value: "blend", label: "Blend" },
];

export const COFFEE_BUDGETS = [
  { value: "budget", label: "Budget ($10-20)" },
  { value: "mid_range", label: "Mid-Range ($20-35)" },
  { value: "premium", label: "Premium ($35-50)" },
  { value: "luxury", label: "Luxury ($50+)" },
];

export const COFFEE_CAFFEINE_LEVELS = [
  { value: "regular", label: "Regular Caffeine" },
  { value: "decaf", label: "Decaf" },
  { value: "low_caf", label: "Low Caffeine / Half-Caf" },
];

export const COFFEE_GRIND_TYPES = [
  { value: "whole_bean", label: "Whole Bean" },
  { value: "pre_ground", label: "Pre-Ground" },
];
