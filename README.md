# PickThePerfect Empire

Affiliate-driven decision tools for gardeners (and beyond).

## Vision

A network of picker tools that help people make decisions, monetized through contextual affiliate links. Start with seeds, expand to the full growing ecosystem (containers, soil, lighting, raised beds, etc.), then beyond gardening.

## Current State

- **picktheperfecttomato.com** - Live, hosted on Vercel
- Code repo: `tomato-picker` (GitHub, private)

## Next Steps

- SEO foundation across each picker: unique titles, meta descriptions, canonicals, Open Graph tags, sitemap/robots checks, and structured data where useful
- Expand search-entry content clusters for high-intent terms like "best tomatoes for containers", "best potatoes for mashing", and beginner-focused queries
- Connect content to conversion paths by mapping article pages and picker presets to the right result states and guides
- Complete the affiliate pathway for each crop: seeds/plants, containers, supports, soil, fertilizer, and tools
- Fill region-specific affiliate gaps so results always have a relevant next action in the full growing pathway
- Add simple click tracking for presets, result selections, and affiliate CTA groups to identify what converts
- Clean up top-level repo wiring so nested picker repos are represented consistently and the parent repo is reproducible

## Expansion Path

```
Seeds (current)
    └── Tomatoes ✓
    └── Peppers (next)
    └── Potatoes
    └── Herbs
    └── [more crops]

Growing Ecosystem (future)
    └── Containers / Grow Bags
    └── Soil / Fertilizer
    └── Plant Supports
    └── Lighting
    └── Raised Beds
    └── Tools

Beyond Gardening (aspirational)
    └── Cheese
    └── Wine
    └── [decision-heavy categories]
```

## Repository Structure

```
picktheperfect-empire/
├── instructions/
│   ├── working-with-claude.md
│   ├── cloning-process.md
│   └── affiliate-strategy.md
│
├── schemas/
│   ├── variety-schema.md
│   ├── affiliate-schema.md
│   ├── preferences-schema.md
│   └── search-profiles-schema.md
│
├── products/
│   ├── tomatoes/
│   │   ├── data-snapshot.md
│   │   ├── affiliate-links.md
│   │   └── seo-profiles.md
│   │
│   ├── peppers/           # When ready
│   └── [future]/
│
└── hub-site/
    └── vision.md
```

## Code Repos (separate, on GitHub)

| Repo | Domain | Status |
|------|--------|--------|
| `tomato-picker` | picktheperfecttomato.com | Live |
| `pepper-picker` | picktheperfectpepper.com | Future |
| `[crop]-picker` | picktheperfect[crop].com | Future |

## Core Principle

> The app must function fully without affiliates. Monetization is modular, replaceable, and never blocks deployment.

## Related

- Shared instructions: `_shared/instructions/`
- Business context: Part of Cat Yeldi empire

---

**Last updated:** January 2026
