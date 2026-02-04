// src/utils/stars.ts
export function renderStars(rating: number): string {
  const filled = Math.round(rating / 2);
  return "\u2605".repeat(filled) + "\u2606".repeat(5 - filled);
}
