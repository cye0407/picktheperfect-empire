// src/crops/flowerScoring.ts
import type { Flower, FlowerPreferences, SunRequirement } from "../types/flower";

function checkSunCompatibility(flowerSun: SunRequirement, prefSun: SunRequirement): boolean {
  if (flowerSun === "sun_to_part_shade") return true;
  if (prefSun === "sun_to_part_shade") return flowerSun !== "full_shade";

  const sunOrder = ["full_shade", "part_shade", "part_sun", "full_sun"];
  const flowerIdx = sunOrder.indexOf(flowerSun);
  const prefIdx = sunOrder.indexOf(prefSun);
  return Math.abs(flowerIdx - prefIdx) <= 1;
}

export function scoreFlower(
  flower: Flower,
  prefs: FlowerPreferences
): { score: number; maxScore: number } | null {
  let score = 0;
  let maxScore = 0;

  // ============ CRITICAL FILTERS ============

  // Container friendly filter
  if (prefs.containerFriendly === "Yes") {
    if (!flower.containerFriendly) return null;
    maxScore += 10;
    score += 10;
  }

  // Difficulty filter
  if (prefs.difficulty !== "No preference") {
    const difficultyOrder = ["beginner", "intermediate", "advanced"];
    const prefDiff = difficultyOrder.indexOf(prefs.difficulty);
    const flowerDiff = difficultyOrder.indexOf(flower.difficulty);
    if (flowerDiff > prefDiff + 1) return null;
    maxScore += 10;
    score += flowerDiff <= prefDiff ? 10 : 5;
  }

  // Sun requirement compatibility
  if (prefs.sunRequirement !== "No preference") {
    if (!checkSunCompatibility(flower.sunRequirement, prefs.sunRequirement as SunRequirement)) {
      return null;
    }
    maxScore += 10;
    score += 10;
  }

  // ============ WEIGHTED SCORING ============

  // Color match (10 pts)
  if (prefs.primaryColor !== "No preference") {
    maxScore += 10;
    if (flower.primaryColors.includes(prefs.primaryColor)) {
      score += 10;
    }
  }

  // Bloom season match (10 pts)
  if (prefs.bloomSeason !== "No preference") {
    maxScore += 10;
    if (flower.bloomSeason.includes(prefs.bloomSeason)) {
      score += 10;
    }
  }

  // Fragrance match (10 pts based on distance)
  maxScore += 10;
  const fragDiff = Math.abs(flower.fragranceIntensity - prefs.fragranceIntensity);
  score += Math.max(0, 10 - fragDiff);

  // Use case matching (15 pts proportional)
  if (prefs.useCase.length > 0) {
    maxScore += 15;
    const matching = prefs.useCase.filter(u => flower.bestUses.includes(u));
    if (matching.length > 0) {
      score += Math.min(15, (matching.length / prefs.useCase.length) * 15);
    }
  }

  // Lifespan match (10 pts)
  if (prefs.lifespan !== "No preference") {
    maxScore += 10;
    if (flower.lifespan === prefs.lifespan) {
      score += 10;
    } else if (
      (prefs.lifespan === "perennial" && flower.lifespan === "tender_perennial") ||
      (prefs.lifespan === "tender_perennial" && flower.lifespan === "perennial")
    ) {
      score += 5;
    }
  }

  // Water needs match (10 pts with partial credit)
  if (prefs.waterNeeds !== "No preference") {
    maxScore += 10;
    if (flower.waterNeeds === prefs.waterNeeds) {
      score += 10;
    } else {
      const waterOrder = ["low", "moderate", "high", "wet"];
      const prefIdx = waterOrder.indexOf(prefs.waterNeeds);
      const flowerIdx = waterOrder.indexOf(flower.waterNeeds);
      if (Math.abs(prefIdx - flowerIdx) === 1) {
        score += 5;
      }
    }
  }

  // Deer resistance bonus (5 pts)
  if (prefs.deerResistant === "Yes") {
    maxScore += 5;
    if (flower.deerResistant) score += 5;
  }

  // Cut flower quality bonus (10 pts if use case includes cutting)
  if (prefs.useCase.includes("cutting")) {
    maxScore += 10;
    score += flower.cutFlowerQuality;
  }

  // Pollinator value bonus (10 pts if use case includes pollinator_garden)
  if (prefs.useCase.includes("pollinator_garden")) {
    maxScore += 10;
    score += flower.pollinatorValue;
  }

  if (maxScore < 25) maxScore = 25;
  return { score, maxScore };
}

export function flowerReasons(flower: Flower, prefs: FlowerPreferences): string[] {
  const reasons: string[] = [];

  // Lifespan
  if (prefs.lifespan !== "No preference" && flower.lifespan === prefs.lifespan) {
    const labels: Record<string, string> = {
      annual: "Annual (replant each year)",
      biennial: "Biennial (two-year cycle)",
      perennial: "Perennial (returns yearly)",
      tender_perennial: "Tender perennial",
    };
    reasons.push(labels[flower.lifespan] || flower.lifespan);
  }

  // Color match
  if (prefs.primaryColor !== "No preference" && flower.primaryColors.includes(prefs.primaryColor)) {
    reasons.push(`Available in ${prefs.primaryColor}`);
  }

  // Bloom season
  if (prefs.bloomSeason !== "No preference" && flower.bloomSeason.includes(prefs.bloomSeason)) {
    reasons.push(`Blooms in ${prefs.bloomSeason.replace(/_/g, " ")}`);
  }

  // Fragrance
  if (Math.abs(flower.fragranceIntensity - prefs.fragranceIntensity) <= 2) {
    if (flower.fragranceIntensity >= 8) reasons.push("Highly fragrant");
    else if (flower.fragranceIntensity >= 5) reasons.push("Pleasantly scented");
  }

  // Use case matches
  if (prefs.useCase.length > 0) {
    const matching = prefs.useCase.filter(u => flower.bestUses.includes(u));
    if (matching.length > 0) {
      const useLabels: Record<string, string> = {
        cutting: "Excellent cut flower",
        borders: "Great for borders",
        containers: "Perfect for containers",
        pollinator_garden: "Attracts pollinators",
        cottage_garden: "Cottage garden charm",
        dried_flowers: "Dries beautifully",
        mass_planting: "Stunning in mass",
        fragrance_garden: "Fragrance garden pick",
        naturalizing: "Naturalizes well",
        rock_garden: "Rock garden gem",
        edging: "Perfect for edging",
        moon_garden: "Moon garden beauty",
        formal_garden: "Formal garden worthy",
        screening: "Great for screening",
      };
      reasons.push(useLabels[matching[0]] || matching[0].replace(/_/g, " "));
    }
  }

  // Growing characteristics
  if (flower.difficulty === "beginner") reasons.push("Easy to grow");
  if (flower.containerFriendly && prefs.containerFriendly === "Yes") {
    reasons.push("Container friendly");
  }
  if (flower.deerResistant && prefs.deerResistant === "Yes") {
    reasons.push("Deer resistant");
  }
  if (flower.pollinatorValue >= 8) reasons.push("Pollinator magnet");
  if (flower.cutFlowerQuality >= 8) reasons.push("Premium cut flower");

  // Availability
  if (flower.availableFrom_SeedSow || flower.availableFrom_WestCoastSeeds) {
    reasons.push("Seeds available");
  }

  return reasons.slice(0, 4);
}
