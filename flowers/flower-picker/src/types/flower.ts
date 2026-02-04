// src/types/flower.ts
export type Region = "US" | "EU";

export type Lifespan = "annual" | "biennial" | "perennial" | "tender_perennial";
export type FlowerType = "bulb" | "corm" | "tuber" | "rhizome" | "seed_annual" | "seed_perennial" | "shrub";
export type BloomSizeCategory = "tiny" | "small" | "medium" | "large" | "very_large";
export type PetalCount = "single" | "semi_double" | "double" | "very_double";
export type BloomForm = "daisy" | "cup" | "bell" | "trumpet" | "spike" | "ball" | "flat" | "ruffled" | "star" | "irregular";
export type FoliageType = "deciduous" | "evergreen" | "semi_evergreen";
export type FragranceType = "none" | "light" | "sweet" | "spicy" | "musky" | "citrus" | "rose" | "honey" | "complex";
export type BloomDurationCategory = "brief" | "moderate" | "long" | "very_long";
export type DeadheadingBenefit = "none" | "moderate" | "significant";
export type GrowthRate = "slow" | "medium" | "fast";
export type GrowthHabit = "upright" | "mounding" | "spreading" | "climbing" | "trailing" | "clumping" | "rosette";
export type SpreadingTendency = "clumping" | "moderate_spread" | "aggressive";
export type SunRequirement = "full_sun" | "part_sun" | "part_shade" | "full_shade" | "sun_to_part_shade";
export type WaterNeeds = "low" | "moderate" | "high" | "wet";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type MaintenanceLevel = "low" | "medium" | "high";
export type WinterCare = "none" | "mulch" | "lift_store" | "protect" | "bring_indoors";
export type DivisionFrequency = "never" | "rarely" | "every_3_5_years" | "every_2_3_years" | "annually";
export type DiseaseResistance = "susceptible" | "moderate" | "resistant";
export type Confidence = "high" | "medium" | "low";

export type Flower = {
  id: number;
  name: string;
  alternateNames: string;
  genus: string;
  species: string;
  cultivarName: string;
  lifespan: Lifespan;
  type: FlowerType;
  description: string;

  bloomSizeCm_min: number;
  bloomSizeCm_max: number;
  bloomSizeCategory: BloomSizeCategory;
  primaryColors: string[];
  colorVibrancy: number;
  petalCount: PetalCount;
  bloomForm: BloomForm;
  foliageInterest: number;
  foliageType: FoliageType;

  fragranceIntensity: number;
  fragranceType: FragranceType;

  bloomSeason: string[];
  bloomDurationWeeks_min: number;
  bloomDurationWeeks_max: number;
  bloomDurationCategory: BloomDurationCategory;
  reblooming: boolean;
  deadheadingBenefit: DeadheadingBenefit;

  bestUses: string[];
  cutFlowerQuality: number;
  vaseLifeDays: number | null;
  pollinatorValue: number;
  pollinatorTypes: string[];
  deerResistant: boolean;
  rabbitResistant: boolean;

  matureHeightCm_min: number;
  matureHeightCm_max: number;
  matureSpreadCm_min: number;
  matureSpreadCm_max: number;
  growthRate: GrowthRate;
  growthHabit: GrowthHabit;
  spreadingTendency: SpreadingTendency;

  hardinessZone_min: number;
  hardinessZone_max: number;
  sunRequirement: SunRequirement;
  waterNeeds: WaterNeeds;
  soilPreference: string[];
  heatTolerance: number;
  coldTolerance: number;
  droughtTolerance: number;
  humidityTolerance: number;
  containerFriendly: boolean;
  minPotLiters: number | null;
  spacingCm: number;
  difficulty: Difficulty;

  maintenanceLevel: MaintenanceLevel;
  stakingNeeded: boolean;
  winterCare: WinterCare;
  divisionFrequency: DivisionFrequency;
  maintenanceNotes: string;

  diseaseResistance_powderyMildew: DiseaseResistance;
  diseaseResistance_botrytis: DiseaseResistance;
  diseaseResistance_rust: DiseaseResistance;
  pestNotes: string;
  diseaseNotes: string;

  sources: string;
  confidence: Confidence;

  availableFrom_SeedSow: boolean;
  availableFrom_WestCoastSeeds: boolean;
  vendorSeedList: string;
  vendorVarietyNames: string;

  matchTier?: string;
  matchReasons?: string[];
};

export type FlowerPreferences = {
  lifespan: Lifespan | "No preference";
  primaryColor: string;
  bloomSeason: string;
  fragranceIntensity: number;
  sunRequirement: SunRequirement | "No preference";
  difficulty: Difficulty | "No preference";
  containerFriendly: string;
  useCase: string[];
  waterNeeds: WaterNeeds | "No preference";
  deerResistant: string;
};
