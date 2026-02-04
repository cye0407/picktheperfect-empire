# Affiliate Schema

Defines the affiliate link structure used across all pickers.

## Structure

```typescript
interface AffiliateCategory {
  seeds?: string;
  supports?: string;      // Cages, stakes, trellises
  containers?: string;    // Pots, grow bags
  soil?: string;          // Soil, fertilizer, amendments
  tools?: string;         // Pruners, moisture meters, etc.
}

interface AffiliateLinks {
  US: AffiliateCategory;
  EU?: AffiliateCategory;
  CA?: AffiliateCategory;
  UK?: AffiliateCategory;
}
```

## Rendering Rules

1. **If link exists** → Display "Buy" button
2. **If no link** → Hide button entirely (no placeholders)
3. **Regions shown dynamically** based on what's populated

## Current Partners

### Seeds

| Region | Partner | Status |
|--------|---------|--------|
| US | Ancestry Seeds | Approved |
| CA/EU | West Coast Seeds | Approved |
| UK | TBD | - |

### Accessories (Tier 1)

| Category | Partner | Status |
|----------|---------|--------|
| Supports | TBD | Researching |
| Containers | TBD | Researching |
| Soil | TBD | Researching |
| Tools | TBD | Researching |

## Partner Criteria

**Required:**
- Direct brand affiliate programs (no Amazon/marketplaces)
- Tracked links or referral codes
- Accept international publishers (no US phone required)

**Preferred:**
- Relevant to gardening audience
- Reasonable commission rates
- Quality products we'd actually recommend

## Per-Variety Overrides

Some varieties may have specific affiliate links (e.g., a particular seed company has that variety):

```typescript
// In variety data
{
  name: "San Marzano",
  // ... other fields
  affiliateOverride: {
    US: {
      seeds: "https://specificvendor.com/san-marzano?ref=picktheperfect"
    }
  }
}
```

Override takes precedence over default regional links.

## File Location in Code

```
src/data/affiliateLinks.ts    # Default regional links
```

Per-variety overrides live in the variety data file itself.

## Expansion Categories (Future)

Beyond the initial 5 categories:

```
Phase 1 (Launch)
├── Seeds ✓

Phase 2 (Post-Launch)
├── Supports
├── Containers
├── Soil

Phase 3 (Growth)
├── Tools
├── Lighting
├── Irrigation
├── Raised Beds
├── Greenhouses
```

Each category follows the same regional structure.

---

**Last updated:** January 2026
