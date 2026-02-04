// src/engine/match.ts
import type { Strawberry, StrawberryPreferences } from "../types/strawberry";

export function runMatching({ 
  items, 
  preferences, 
  scoreItem, 
  getReasons 
}: {
  items: Strawberry[];
  preferences: StrawberryPreferences;
  scoreItem: (item: Strawberry, prefs: StrawberryPreferences) => { score: number; maxScore: number } | null;
  getReasons: (item: Strawberry, prefs: StrawberryPreferences) => string[];
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
    .filter((item): item is (Strawberry & { matchScore: number; matchPercentage: number; matchTier: string; matchReasons: string[] }) => item !== null)
    .sort((a, b) => b.matchScore - a.matchScore);
  
  return scoredItems;
}
