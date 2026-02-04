// src/crops/strawberryScoring.ts
import type { Strawberry, StrawberryPreferences } from "../types/strawberry";

export function scoreStrawberry(
  strawberry: Strawberry,
  prefs: StrawberryPreferences
): { score: number; maxScore: number } | null {
  let score = 0;
  let maxScore = 0;

  // ============ CRITICAL FILTERS ============

  // Strawberry type filter
  if (prefs.strawberryType !== "No preference") {
    if (strawberry.type !== prefs.strawberryType) {
      return null;
    }
    maxScore += 15;
    score += 15;
  }

  // Container friendly filter
  if (prefs.containerFriendly === "Yes") {
    if (!strawberry.containerFriendly) {
      return null;
    }
    maxScore += 10;
    score += 10;
  }

  // Difficulty filter
  if (prefs.difficulty !== "No preference") {
    const difficultyOrder = ["beginner", "intermediate", "advanced"];
    const prefDiff = difficultyOrder.indexOf(prefs.difficulty);
    const strawberryDiff = difficultyOrder.indexOf(strawberry.difficulty);
    
    if (strawberryDiff > prefDiff + 1) {
      return null;
    }
    maxScore += 10;
    if (strawberryDiff <= prefDiff) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // ============ WEIGHTED SCORING ============

  // Flavor scoring (always applies)
  maxScore += 20;
  const sweetDiff = Math.abs(strawberry.sweetness - prefs.sweetness);
  score += Math.max(0, 10 - sweetDiff);
  const tartDiff = Math.abs(strawberry.tartness - prefs.tartness);
  score += Math.max(0, 10 - tartDiff);

  // Flavor category
  if (prefs.flavorCategory !== "No preference") {
    maxScore += 10;
    if (strawberry.flavorCategory === prefs.flavorCategory) {
      score += 10;
    }
  }

  // Texture category
  if (prefs.textureCategory !== "No preference") {
    maxScore += 10;
    if (strawberry.textureCategory === prefs.textureCategory) {
      score += 10;
    }
  }

  // Size category
  if (prefs.sizeCategory !== "No preference") {
    maxScore += 10;
    if (strawberry.sizeCategory === prefs.sizeCategory) {
      score += 10;
    } else {
      // Adjacent sizes get partial credit
      const sizeOrder = ["small", "medium", "large", "very_large"];
      const prefIdx = sizeOrder.indexOf(prefs.sizeCategory);
      const berryIdx = sizeOrder.indexOf(strawberry.sizeCategory);
      if (Math.abs(prefIdx - berryIdx) === 1) {
        score += 5;
      }
    }
  }

  // Use case matching
  if (prefs.useCase.length > 0) {
    maxScore += 15;
    const matchingUses = prefs.useCase.filter((use) =>
      strawberry.bestUses.includes(use)
    );
    if (matchingUses.length > 0) {
      score += Math.min(15, (matchingUses.length / prefs.useCase.length) * 15);
    }
  }

  // Harvest window
  if (prefs.harvestWindow !== "No preference") {
    maxScore += 10;
    if (strawberry.harvestWindow === prefs.harvestWindow) {
      score += 10;
    }
  }

  // Yield potential
  if (prefs.yieldPotential !== "No preference") {
    maxScore += 10;
    const yieldOrder = ["low", "medium", "high", "very_high"];
    const prefYield = yieldOrder.indexOf(prefs.yieldPotential);
    const berryYield = yieldOrder.indexOf(strawberry.yieldPotential);
    if (berryYield >= prefYield) {
      score += 10;
    } else if (berryYield === prefYield - 1) {
      score += 5;
    }
  }

  // Climate suitability
  if (prefs.climateSuitability !== "No preference") {
    maxScore += 10;
    if (strawberry.climateSuitability.includes(prefs.climateSuitability)) {
      score += 10;
    }
  }

  // Vendor availability bonus
  maxScore += 5;
  if (strawberry.availableFrom_SeedSow || strawberry.availableFrom_WestCoastSeeds) {
    score += 5;
  }

  // Ensure minimum maxScore
  if (maxScore < 25) {
    maxScore = 25;
  }

  return { score, maxScore };
}

export function strawberryReasons(strawberry: Strawberry, prefs: StrawberryPreferences): string[] {
  const reasons: string[] = [];

  // Type match
  if (prefs.strawberryType !== "No preference" && strawberry.type === prefs.strawberryType) {
    const typeLabels: Record<string, string> = {
      june_bearing: "June-bearing (single large harvest)",
      everbearing: "Everbearing (multiple harvests)",
      day_neutral: "Day-neutral (continuous production)",
      alpine: "Alpine (intensely flavored small berries)",
      musk: "Musk (aromatic specialty)"
    };
    reasons.push(typeLabels[strawberry.type] || strawberry.type);
  }

  // Flavor matches
  if (Math.abs(strawberry.sweetness - prefs.sweetness) <= 2) {
    if (strawberry.sweetness >= 8) reasons.push("Very sweet");
  }
  
  if (strawberry.aromaIntensity >= 8) reasons.push("Highly aromatic");

  // Use case match
  if (prefs.useCase.length > 0) {
    const matchingUses = prefs.useCase.filter((use) => strawberry.bestUses.includes(use));
    if (matchingUses.length > 0) {
      const useLabels: Record<string, string> = {
        fresh_eating: "Excellent fresh",
        jam: "Great for jam",
        freezing: "Freezes well",
        baking: "Perfect for baking",
        preserves: "Ideal for preserves",
        desserts: "Wonderful in desserts"
      };
      reasons.push(useLabels[matchingUses[0]] || matchingUses[0].replace("_", " "));
    }
  }

  // Growing characteristics
  if (strawberry.difficulty === "beginner") reasons.push("Easy to grow");
  if (strawberry.containerFriendly && prefs.containerFriendly === "Yes") {
    reasons.push("Container friendly");
  }
  if (strawberry.yieldPotential === "very_high") reasons.push("Very high yields");
  if (strawberry.harvestWindow === "continuous") reasons.push("Produces all season");

  // Availability
  if (strawberry.availableFrom_SeedSow || strawberry.availableFrom_WestCoastSeeds) {
    reasons.push("Seeds/plants available");
  }

  return reasons.slice(0, 4);
}
