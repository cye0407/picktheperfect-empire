// src/engine/match.ts
import type { Flower, FlowerPreferences } from "../types/flower";

export function runMatching({
  items,
  preferences,
  scoreItem,
  getReasons
}: {
  items: Flower[];
  preferences: FlowerPreferences;
  scoreItem: (item: Flower, prefs: FlowerPreferences) => { score: number; maxScore: number } | null;
  getReasons: (item: Flower, prefs: FlowerPreferences) => string[];
}) {
  const scoredItems = items
    .map(item => {
      const scoreResult = scoreItem(item, preferences);

      if (scoreResult === null) {
        return null;
      }

      const { score, maxScore } = scoreResult;
      const percentage = (score / maxScore) * 100;

      let matchTier;
      if (percentage >= 80) matchTier = "Top match";
      else if (percentage >= 65) matchTier = "Good match";
      else matchTier = "Wildcard";

      return {
        ...item,
        matchScore: score,
        matchPercentage: percentage,
        matchTier,
        matchReasons: getReasons(item, preferences)
      };
    })
    .filter((item): item is (Flower & { matchScore: number; matchPercentage: number; matchTier: string; matchReasons: string[] }) => item !== null)
    .sort((a, b) => b.matchScore - a.matchScore);

  return scoredItems;
}
