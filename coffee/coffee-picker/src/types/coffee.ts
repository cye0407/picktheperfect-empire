// src/types/coffee.ts

export type BrewMethod = "espresso" | "pour_over" | "french_press" | "aeropress" | "cold_brew" | "moka_pot" | "drip";
export type RoastLevel = "light" | "medium" | "medium_dark" | "dark";
export type OriginType = "single_origin" | "blend";
export type FlavorNote = "fruity" | "chocolatey" | "nutty" | "floral" | "earthy" | "spicy" | "caramel" | "citrus" | "berry" | "smoky";
export type Budget = "budget" | "mid_range" | "premium" | "luxury";
export type CaffeineLevel = "regular" | "decaf" | "low_caf";
export type GrindType = "whole_bean" | "pre_ground";

export type Coffee = {
  id: number;
  name: string;
  brand: string;
  origin: string;
  roastLevel: RoastLevel;
  originType: OriginType;
  flavorNotes: FlavorNote[];
  brewMethods: BrewMethod[];
  budget: Budget;
  caffeineLevel: CaffeineLevel;
  grindOptions: GrindType[];
  organic: boolean;
  fairTrade: boolean;
  intensity: number;
  acidity: number;
  body: number;
  description: string;
  amazonAsin: string;

  matchTier?: string;
  matchReasons?: string[];
};

export type CoffeePreferences = {
  brewMethod: BrewMethod | "No preference";
  roastLevel: RoastLevel | "No preference";
  originType: OriginType | "No preference";
  flavorProfile: FlavorNote[];
  budget: Budget | "No preference";
  caffeinePreference: CaffeineLevel | "No preference";
  grindPreference: GrindType | "No preference";
  organicPreference: string;
  fairTradePreference: string;
  intensityPreference: number;
};
