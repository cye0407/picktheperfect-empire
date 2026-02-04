// src/types/strawberry.ts
export type Region = "US" | "EU";

export type StrawberryType = "june_bearing" | "everbearing" | "day_neutral" | "alpine" | "musk";

export type FlavorCategory = "classic" | "aromatic" | "mild" | "tart" | "complex" | "wild";

export type TextureCategory = "firm" | "medium" | "soft";

export type SizeCategory = "small" | "medium" | "large" | "very_large";

export type HarvestWindow = "short" | "medium" | "long" | "continuous";

export type YieldPotential = "low" | "medium" | "high" | "very_high";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Strawberry = {
  id: number;
  name: string;
  alternateNames: string;
  type: StrawberryType;
  origin: string;
  description: string;
  sweetness: number;
  tartness: number;
  aromaIntensity: number;
  flavorComplexity: number;
  flavorCategory: FlavorCategory;
  textureCategory: TextureCategory;
  juiciness: number;
  fruitSizeGrams_min: number;
  fruitSizeGrams_max: number;
  sizeCategory: SizeCategory;
  fruitShape: string;
  colorIntensity: number;
  interiorColor: string;
  skinStrength: number;
  shelfLife: string;
  bestUses: string[];
  processingQuality: number;
  freezingQuality: number;
  daysToFirstHarvest: number;
  harvestWindow: HarvestWindow;
  yieldPotential: YieldPotential;
  runnerProduction: string;
  plantVigor: string;
  lifespan: string;
  hardinessZone_min: number;
  hardinessZone_max: number;
  heatTolerance: number;
  coldTolerance: number;
  climateSuitability: string[];
  containerFriendly: boolean;
  minPotLiters: number | null;
  spacingCm: number;
  difficulty: Difficulty;
  diseaseResistance_verticillium: string;
  diseaseResistance_powderyMildew: string;
  diseaseResistance_crownRot: string;
  diseaseResistance_leafSpot: string;
  pestNotes: string;
  diseaseNotes: string;
  sources: string;
  confidence: string;
  availableFrom_SeedSow: boolean;
  availableFrom_WestCoastSeeds: boolean;
  vendorSeedList: string;
  vendorVarietyNames: string;
  matchTier?: string;
  matchReasons?: string[];
};

export type StrawberryPreferences = {
  strawberryType: StrawberryType | "No preference";
  sweetness: number;
  tartness: number;
  flavorCategory: FlavorCategory | "No preference";
  textureCategory: TextureCategory | "No preference";
  sizeCategory: SizeCategory | "No preference";
  useCase: string[];
  harvestWindow: HarvestWindow | "No preference";
  yieldPotential: YieldPotential | "No preference";
  containerFriendly: string;
  difficulty: Difficulty | "No preference";
  climateSuitability: string;
};
