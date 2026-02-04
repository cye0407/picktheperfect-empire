// src/utils/stars.ts
export function renderStars(rating: number): string {
  const filled = Math.round(rating / 2);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}

export function renderBerryType(type: string): string {
  switch (type) {
    case "june_bearing": return "🍓";
    case "everbearing": return "🍓🍓";
    case "day_neutral": return "🍓♾️";
    case "alpine": return "🫐";
    case "musk": return "🍇";
    default: return "🍓";
  }
}
