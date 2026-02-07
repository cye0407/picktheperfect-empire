// src/crops/coffeeScoring.ts
import type { Coffee, CoffeePreferences } from "../types/coffee";

export function scoreCoffee(
  coffee: Coffee,
  prefs: CoffeePreferences
): { score: number; maxScore: number } | null {
  let score = 0;
  let maxScore = 0;

  // ============ CRITICAL FILTERS ============

  // Caffeine preference filter (hard filter)
  if (prefs.caffeinePreference !== "No preference") {
    if (prefs.caffeinePreference === "decaf" && coffee.caffeineLevel !== "decaf") return null;
    if (prefs.caffeinePreference === "low_caf" && coffee.caffeineLevel === "regular") return null;
    maxScore += 10;
    score += coffee.caffeineLevel === prefs.caffeinePreference ? 10 : 5;
  }

  // Budget filter (hard filter - don't show coffees above budget)
  if (prefs.budget !== "No preference") {
    const budgetOrder = ["budget", "mid_range", "premium", "luxury"];
    const prefIdx = budgetOrder.indexOf(prefs.budget);
    const coffeeIdx = budgetOrder.indexOf(coffee.budget);
    if (coffeeIdx > prefIdx + 1) return null;
    maxScore += 10;
    if (coffeeIdx <= prefIdx) score += 10;
    else score += 3;
  }

  // Organic filter
  if (prefs.organicPreference === "Yes") {
    if (!coffee.organic) return null;
    maxScore += 10;
    score += 10;
  }

  // Fair trade filter
  if (prefs.fairTradePreference === "Yes") {
    if (!coffee.fairTrade) return null;
    maxScore += 10;
    score += 10;
  }

  // ============ WEIGHTED SCORING ============

  // Brew method match (15 pts - most important)
  if (prefs.brewMethod !== "No preference") {
    maxScore += 15;
    if (coffee.brewMethods.includes(prefs.brewMethod)) {
      score += 15;
    }
  }

  // Roast level match (12 pts)
  if (prefs.roastLevel !== "No preference") {
    maxScore += 12;
    if (coffee.roastLevel === prefs.roastLevel) {
      score += 12;
    } else {
      const roastOrder = ["light", "medium", "medium_dark", "dark"];
      const prefIdx = roastOrder.indexOf(prefs.roastLevel);
      const coffeeIdx = roastOrder.indexOf(coffee.roastLevel);
      if (Math.abs(prefIdx - coffeeIdx) === 1) score += 6;
    }
  }

  // Origin type match (8 pts)
  if (prefs.originType !== "No preference") {
    maxScore += 8;
    if (coffee.originType === prefs.originType) {
      score += 8;
    }
  }

  // Flavor profile matching (15 pts proportional)
  if (prefs.flavorProfile.length > 0) {
    maxScore += 15;
    const matching = prefs.flavorProfile.filter(f => coffee.flavorNotes.includes(f));
    if (matching.length > 0) {
      score += Math.min(15, (matching.length / prefs.flavorProfile.length) * 15);
    }
  }

  // Intensity match (10 pts based on distance)
  maxScore += 10;
  const intDiff = Math.abs(coffee.intensity - prefs.intensityPreference);
  score += Math.max(0, 10 - intDiff * 1.5);

  // Grind preference match (8 pts)
  if (prefs.grindPreference !== "No preference") {
    maxScore += 8;
    if (coffee.grindOptions.includes(prefs.grindPreference)) {
      score += 8;
    }
  }

  if (maxScore < 25) maxScore = 25;
  return { score, maxScore };
}

export function coffeeReasons(coffee: Coffee, prefs: CoffeePreferences): string[] {
  const reasons: string[] = [];

  // Brew method
  if (prefs.brewMethod !== "No preference" && coffee.brewMethods.includes(prefs.brewMethod)) {
    const labels: Record<string, string> = {
      espresso: "Great for espresso",
      pour_over: "Ideal for pour over",
      french_press: "Perfect for French press",
      aeropress: "AeroPress-friendly",
      cold_brew: "Excellent for cold brew",
      moka_pot: "Moka pot ready",
      drip: "Great for drip brewing",
    };
    reasons.push(labels[prefs.brewMethod] || `Suits ${prefs.brewMethod}`);
  }

  // Roast
  if (prefs.roastLevel !== "No preference" && coffee.roastLevel === prefs.roastLevel) {
    const labels: Record<string, string> = {
      light: "Light roast — bright & complex",
      medium: "Medium roast — balanced",
      medium_dark: "Medium-dark — rich & smooth",
      dark: "Dark roast — bold & intense",
    };
    reasons.push(labels[coffee.roastLevel] || coffee.roastLevel);
  }

  // Flavor matches
  if (prefs.flavorProfile.length > 0) {
    const matching = prefs.flavorProfile.filter(f => coffee.flavorNotes.includes(f));
    if (matching.length > 0) {
      reasons.push(`Notes of ${matching.slice(0, 2).join(" & ")}`);
    }
  }

  // Origin
  if (coffee.originType === "single_origin") {
    reasons.push(`Single origin: ${coffee.origin}`);
  } else if (prefs.originType === "blend" && coffee.originType === "blend") {
    reasons.push("Expert blend");
  }

  // Intensity
  if (Math.abs(coffee.intensity - prefs.intensityPreference) <= 2) {
    if (coffee.intensity >= 8) reasons.push("High intensity");
    else if (coffee.intensity >= 5) reasons.push("Medium intensity");
    else reasons.push("Mild & smooth");
  }

  // Certifications
  if (coffee.organic && prefs.organicPreference === "Yes") reasons.push("Certified organic");
  if (coffee.fairTrade && prefs.fairTradePreference === "Yes") reasons.push("Fair trade certified");

  // Caffeine
  if (coffee.caffeineLevel === "decaf") reasons.push("Decaf");
  if (coffee.caffeineLevel === "low_caf") reasons.push("Low caffeine");

  // Budget
  if (coffee.budget === "budget") reasons.push("Great value");

  return reasons.slice(0, 4);
}
