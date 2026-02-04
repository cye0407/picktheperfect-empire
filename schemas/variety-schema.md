# Variety Schema

Defines the data structure for each item (tomato, pepper, etc.) in a picker.

## Core Fields (All Pickers)

Every variety in any picker needs these fields:

```typescript
{
  id: number;                    // Unique identifier
  name: string;                  // Variety name
  description: string;           // Short description for display
  difficulty: Difficulty;        // "Easy" | "Moderate" | "Advanced" | "No preference"
  traits: string[];              // Notable characteristics
  affiliateOverride?: object;    // Per-variety affiliate links (optional)
  
  // Computed by matching engine
  matchTier?: string;            // "Top match" | "Good match" | "Wildcard"
  matchReasons?: string[];       // Why this matched
}
```

## Tomato-Specific Fields

```typescript
{
  // Flavor profile (1-10 scale)
  sweetness: number;
  acidity: number;
  firmness: number;
  
  // Growing characteristics
  growthHabit: string;           // "Determinate" | "Indeterminate"
  plantSize: string;             // "Very Compact" | "Compact" | "Medium" | "Large"
  daysToMaturity: number;
  
  // Classification
  type: string;                  // "Cherry" | "Slicer" | "Paste/Roma" | "Beefsteak" | etc.
  diseaseResistance: string[];   // ["Blight", "Wilt", etc.]
  bestUses: string[];            // ["Fresh eating", "Sauce", "Canning", etc.]
}
```

## Adapting for New Crops

### Pepper Example (draft)

```typescript
{
  // Core fields (same)
  id, name, description, difficulty, traits, affiliateOverride
  
  // Pepper-specific
  heatLevel: number;             // Scoville scale or 1-10
  flavorProfile: string;         // "Sweet" | "Smoky" | "Fruity" | "Earthy"
  wallThickness: string;         // "Thin" | "Medium" | "Thick"
  
  // Growing (similar to tomato)
  growthHabit: string;
  plantSize: string;
  daysToMaturity: number;
  
  // Classification
  type: string;                  // "Sweet" | "Hot" | "Ornamental"
  bestUses: string[];            // ["Fresh", "Roasting", "Drying", "Stuffing"]
}
```

### Potato Example (draft)

```typescript
{
  // Core fields (same)
  
  // Potato-specific
  texture: string;               // "Waxy" | "Floury" | "All-purpose"
  skinColor: string;
  fleshColor: string;
  storageLife: string;           // "Short" | "Medium" | "Long"
  
  // Growing
  daysToMaturity: number;
  yieldPotential: string;
  
  // Classification
  type: string;                  // "Early" | "Maincrop" | "Salad"
  bestUses: string[];            // ["Roasting", "Mashing", "Frying", "Salads"]
}
```

## Schema Design Principles

1. **Core fields stay consistent** - id, name, description, difficulty, traits across all pickers
2. **Flavor/quality fields use 1-10 scales** where possible for matching
3. **Growing fields reuse patterns** - daysToMaturity, plantSize work across crops
4. **bestUses always an array** - enables multi-select in preferences
5. **affiliateOverride optional** - allows per-variety links without requiring them

## File Location in Code

```
src/types/[crop].ts        # Type definitions
src/data/[crop]Data.ts     # Actual variety data
```

---

**Last updated:** January 2026
