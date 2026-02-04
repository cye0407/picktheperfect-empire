# Cloning Process

Step-by-step guide to spin up a new picker from the tomato-picker template.

## Prerequisites

- Node.js installed
- Git configured
- Vercel account (for deployment)
- Domain purchased (picktheperfect[crop].com)

## Step 1: Clone the Repository

```bash
# Clone tomato-picker as new repo
git clone https://github.com/[username]/tomato-picker.git [crop]-picker
cd [crop]-picker

# Remove old git history, start fresh
rm -rf .git
git init
git remote add origin https://github.com/[username]/[crop]-picker.git
```

## Step 2: Update Type Definitions

**File:** `src/types/tomato.ts` → rename to `src/types/[crop].ts`

1. Rename `Tomato` type to `[Crop]`
2. Rename `TomatoPreferences` to `[Crop]Preferences`
3. Update fields for crop-specific attributes

```typescript
// Example: tomato.ts → pepper.ts
export type Pepper = {
  id: number;
  name: string;
  heatLevel: number;        // NEW: replaces sweetness
  flavorProfile: string;    // NEW
  // ... crop-specific fields
};

export type PepperPreferences = {
  heatLevel: number;
  // ... crop-specific preferences
};
```

## Step 3: Update Scoring Logic

**File:** `src/engine/score[Crop].ts`

1. Copy `scoreTomato.ts` as starting point
2. Update scoring function for new attributes
3. Update `getReasons()` for new match explanations

The `match.ts` engine is generic - no changes needed there.

## Step 4: Create Variety Data

**File:** `src/data/[crop]Data.ts`

1. Research varieties for the new crop
2. Populate data following the schema
3. Include 20-50 varieties for launch

```typescript
export const pepperData: Pepper[] = [
  {
    id: 1,
    name: "Jalapeño",
    heatLevel: 5,
    // ... all fields
  },
  // ... more varieties
];
```

## Step 5: Update Search Profiles

**File:** `src/data/searchProfiles.ts`

Create SEO landing page presets for the new crop:

```typescript
export const searchProfiles: SearchProfile[] = [
  {
    slug: "mild-peppers",
    title: "Best Mild Peppers for Beginners",
    description: "Low-heat pepper varieties perfect for...",
    preset: {
      heatLevel: 2,
    },
  },
  // ... more profiles
];
```

## Step 6: Update Affiliate Links

**File:** `src/data/affiliateLinks.ts`

1. Research seed vendors for new crop
2. Apply for affiliate programs
3. Populate regional links

```typescript
const affiliateLinks: AffiliateLinks = {
  US: {
    seeds: "https://vendor.com/peppers?ref=picktheperfect",
  },
  EU: {
    seeds: "https://euvendor.com/peppers?ref=picktheperfect",
  },
};
```

## Step 7: Update UI Text

Global find & replace:
- "tomato" → "[crop]"
- "Tomato" → "[Crop]"
- "tomatoes" → "[crop]s"

Key files:
- `src/components/*.tsx`
- `src/app/page.tsx`
- `public/` assets (favicon, og-image)

## Step 8: Update Metadata

**File:** `src/app/layout.tsx` or equivalent

```typescript
export const metadata = {
  title: "Pick the Perfect [Crop]",
  description: "Find the best [crop] varieties for your garden...",
  // ...
};
```

## Step 9: Test Locally

```bash
npm install
npm run dev
```

Verify:
- Picker UI loads
- Matching works with new criteria
- SEO profiles load correctly
- Affiliate links render (or hide if empty)

## Step 10: Deploy

```bash
# Push to GitHub
git add .
git commit -m "Initial [crop] picker"
git push -u origin main

# Connect to Vercel
vercel --prod
```

Connect custom domain in Vercel dashboard.

## Post-Launch Checklist

- [ ] Verify all pages load
- [ ] Test affiliate links click through correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Add to hub site (when built)
- [ ] Document in `picktheperfect-empire/products/[crop]/`

## Time Estimate

| Task | Time |
|------|------|
| Clone & setup | 15 min |
| Type definitions | 30 min |
| Scoring logic | 1-2 hours |
| Variety data | 2-4 hours (research heavy) |
| Search profiles | 30 min |
| Affiliate setup | 30 min (plus approval wait) |
| UI updates | 30 min |
| Testing | 30 min |
| Deploy | 15 min |
| **Total** | **6-9 hours** |

---

**Last updated:** January 2026
