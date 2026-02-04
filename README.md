# PickThePerfect Empire

Affiliate-driven decision tools for gardeners (and beyond).

## Vision

A network of picker tools that help people make decisions, monetized through contextual affiliate links. Start with seeds, expand to the full growing ecosystem (containers, soil, lighting, raised beds, etc.), then beyond gardening.

## Current State

- **picktheperfecttomato.com** - Live, hosted on Vercel
- Code repo: `tomato-picker` (GitHub, private)

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
