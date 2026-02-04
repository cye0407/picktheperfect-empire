# Agent Mission

> **Vendor Naming Note:** Throughout this document, "SeedSow" refers to the vendor **SeedsNow** (seedsnow.com). The abbreviated name "SeedSow" is used in field names (e.g. `availableFrom_SeedSow`) and references to maintain consistency with the codebase conventions used across other pickers in this project. Do not rename these fields; they must match the codebase.

Create a normalized dataset of 100 flower varieties suitable for a decision-support picker app. Each variety must have consistent fields, scorable attributes, and short human descriptions. Output must be machine-importable and internally consistent.

## Output Format

- Deliver one CSV (or JSON if easier, but default CSV) with exact headers below.
- One row per variety
- Arrays in CSV must be pipe-delimited, e.g. `Cutting|Borders|Containers`
- Keep numeric fields numeric (no text like "high" in numeric columns)
- File name: `flower_varieties_v1.csv`

---

## Required Schema (Headers)

Use these headers exactly:

### Identity

- `id` (1–100)
- `name`
- `alternateNames` (pipe list)
- `genus`
- `species`
- `cultivarName` (if applicable; blank for species)
- `lifespan` (enum: annual|biennial|perennial|tender_perennial)
- `type` (enum: bulb|corm|tuber|rhizome|seed_annual|seed_perennial|shrub)
- `description` (1–2 sentences, practical)

### Appearance (scorable)

- `bloomSizeCm_min`
- `bloomSizeCm_max`
- `bloomSizeCategory` (enum: tiny|small|medium|large|very_large)
- `primaryColors` (pipe list; choose from: white|cream|yellow|orange|red|pink|magenta|purple|blue|lavender|bicolor|multicolor)
- `colorVibrancy` (1–10)
- `petalCount` (enum: single|semi_double|double|very_double)
- `bloomForm` (enum: daisy|cup|bell|trumpet|spike|ball|flat|ruffled|star|irregular)
- `foliageInterest` (1–10, ornamental value of leaves)
- `foliageType` (enum: deciduous|evergreen|semi_evergreen)

### Fragrance

- `fragranceIntensity` (1–10)
- `fragranceType` (enum: none|light|sweet|spicy|musky|citrus|rose|honey|complex)

### Bloom Timing

- `bloomSeason` (pipe list; early_spring|mid_spring|late_spring|early_summer|mid_summer|late_summer|fall|winter)
- `bloomDurationWeeks_min`
- `bloomDurationWeeks_max`
- `bloomDurationCategory` (enum: brief|moderate|long|very_long)
- `reblooming` (true|false)
- `deadheadingBenefit` (enum: none|moderate|significant)

### Uses

- `bestUses` (pipe list; choose from: cutting|borders|mass_planting|containers|rock_garden|cottage_garden|formal_garden|naturalizing|dried_flowers|edging|screening|pollinator_garden|moon_garden|fragrance_garden)
- `cutFlowerQuality` (1–10)
- `vaseLifeDays` (number; blank if not suitable for cutting)
- `pollinatorValue` (1–10)
- `pollinatorTypes` (pipe list; bees|butterflies|hummingbirds|moths|beneficial_insects)
- `deerResistant` (true|false)
- `rabbitResistant` (true|false)

### Growth Characteristics

- `matureHeightCm_min`
- `matureHeightCm_max`
- `matureSpreadCm_min`
- `matureSpreadCm_max`
- `growthRate` (enum: slow|medium|fast)
- `growthHabit` (enum: upright|mounding|spreading|climbing|trailing|clumping|rosette)
- `spreadingTendency` (enum: clumping|moderate_spread|aggressive)

### Environment & Setup

- `hardinessZone_min` (USDA zone number)
- `hardinessZone_max` (USDA zone number)
- `sunRequirement` (enum: full_sun|part_sun|part_shade|full_shade|sun_to_part_shade)
- `waterNeeds` (enum: low|moderate|high|wet)
- `soilPreference` (pipe list; well_drained|moist|dry|rich|poor|acidic|alkaline|average)
- `heatTolerance` (1–10)
- `coldTolerance` (1–10)
- `droughtTolerance` (1–10)
- `humidityTolerance` (1–10)
- `containerFriendly` (true|false)
- `minPotLiters` (number; if unknown use blank)
- `spacingCm` (recommended plant spacing)
- `difficulty` (enum: beginner|intermediate|advanced)

### Maintenance

- `maintenanceLevel` (enum: low|medium|high)
- `stakingNeeded` (true|false)
- `winterCare` (enum: none|mulch|lift_store|protect|bring_indoors)
- `divisionFrequency` (enum: never|rarely|every_3_5_years|every_2_3_years|annually)
- `maintenanceNotes` (short text; blank allowed)

### Resilience

- `diseaseResistance_powderyMildew` (enum: susceptible|moderate|resistant)
- `diseaseResistance_botrytis` (enum: susceptible|moderate|resistant)
- `diseaseResistance_rust` (enum: susceptible|moderate|resistant)
- `pestNotes` (short text; blank allowed)
- `diseaseNotes` (short text; blank allowed)

### Data Quality

- `sources` (pipe list of 2–4 reputable sources; short domain names or publication names)
- `confidence` (enum: high|medium|low)

---

## Variety Selection Rules (Must Follow)

### Balance the catalog

- ~35 annuals (zinnias, marigolds, cosmos, petunias, etc.)
- ~40 perennials (coneflowers, daylilies, peonies, etc.)
- ~15 bulbs/corms/tubers (tulips, dahlias, lilies, etc.)
- ~10 specialty/unusual (rare colors, unique forms, heritage varieties)

### Include famous + practical

Must include: Zinnia (Benary's Giant, State Fair), Marigold (French & African types), Cosmos (Sensation), Sunflower (multiple), Petunia (Wave types), Coneflower (Echinacea purpurea), Black-eyed Susan, Lavender (English & French), Dahlia (dinnerplate & pompon), Tulip (Darwin, Triumph), Daffodil, Peony (Sarah Bernhardt), Rose (Knock Out), Lily (Asiatic, Oriental), Hydrangea, Salvia, Snapdragon, Sweet Pea, Delphinium, Hollyhock, Foxglove, Shasta Daisy, Coreopsis, Sedum (Autumn Joy).

### Avoid junk entries

- No "generic flower" placeholders.
- No duplicate varieties under different names unless you list the alt name.

### Keep it picker-focused

Descriptions must help someone choose (color + use + growing note), not botanical history.

---

## How to Assign Numeric Values (Critical)

You must convert qualitative descriptions into consistent numbers:

### Color Vibrancy (1–10)

- "Vivid / electric / saturated / eye-catching" → 8–10
- "Clear / bright" → 5–7
- "Soft / pastel / muted" → 2–4

### Fragrance Intensity (1–10)

- "Highly fragrant / perfumed / strong scent" → 8–10
- "Moderate / pleasant fragrance" → 4–7
- "Light / subtle / faint" → 2–3
- "No fragrance" → 1

### Pollinator Value (1–10)

- Native plants, single flowers, open centers → 7–10
- Semi-double, good nectar plants → 4–6
- Double flowers, low nectar → 1–3

### Cut Flower Quality (1–10)

- "Excellent cut flower / long vase life / commercial quality" → 8–10
- "Good for cutting" → 5–7
- "Not recommended for cutting" → 1–3

### Foliage Interest (1–10)

- "Ornamental foliage / architectural / colorful leaves" → 7–10
- "Attractive foliage" → 4–6
- "Unremarkable leaves" → 1–3

**Do not max everything. The dataset must have contrast or your scoring becomes useless.**

---

## Source Standards

For each flower, include 2–4 sources (prefer official or recognized references):

**Good source types:**
- University extension pages (Cornell, NC State, Missouri Botanical Garden)
- Recognized seed/plant suppliers (Johnny's, Burpee, Park Seed, Thompson & Morgan)
- RHS, American Horticultural Society
- Specialty grower associations (dahlia societies, rose societies, etc.)

If you use forums/gardening blogs, only for specific cultivar notes and set confidence lower unless corroborated.

The sources field should look like:
`johnnyseeds.com|missouribotanicalgarden.org|rhs.org.uk`

(Short names are fine; no raw URLs required.)

---

## Consistency Checks (Agent Must Perform)

Before final output:

- No missing required enums (lifespan/type/sunRequirement/etc.)
- All numeric ranges: min ≤ max
- All scores within 1–10
- bloomSizeCategory matches bloomSizeCm range
- bloomDurationCategory matches bloomDurationWeeks range
- sunRequirement aligns with common knowledge for genus
- At least 100 unique names
- At least 2 sources for every row
- Spot-check 10 random entries for realism

---

## Deliverable Summary (Must Include)

Alongside the CSV, provide:

1. A lifespan distribution count (annual/biennial/perennial/tender_perennial)
2. A type distribution count (bulb/seed_annual/seed_perennial/etc.)
3. A bloom season distribution
4. A short list: **10 best container flowers** (based on your data)
5. A short list: **10 best cut flowers** (based on your data)
6. A short list: **10 best for pollinators** (based on your data)
7. A short list: **10 easiest for beginners** (based on your data)

---

## If the Agent Gets Stuck

If a field cannot be found:

- Leave it blank only where allowed (minPotLiters, vaseLifeDays, pestNotes, diseaseNotes, maintenanceNotes)
- Never invent precise numbers; use broad ranges and set confidence=low/medium.

---

## Affiliate Coverage Requirement (Non-Negotiable)

### Mandatory Vendor Inclusion

The dataset MUST include all flower varieties currently offered by the following seed vendors, because they are active affiliate partners:

- **SeedSow** (SeedSow / SeedsNow-style catalog)
- **West Coast Seeds** (Canada-based seed supplier)

These varieties are not optional and must be treated as priority entries.

### Step 1: Build Vendor Variety Lists (Before Dataset Creation)

Before populating the main dataset, the agent must:

1. Extract a complete list of flower varieties sold by:
   - SeedSow
   - West Coast Seeds

2. Normalize names:
   - Deduplicate synonyms (e.g. "Calendula" vs "Pot Marigold")
   - Preserve original vendor naming in a dedicated field

3. Output a separate preliminary CSV:

**File:** `affiliate_flower_seedlist.csv`

**Headers:**
- `vendor` (SeedSow | WestCoastSeeds)
- `vendorVarietyName`
- `normalizedName`
- `genus` (if available)
- `productURL` (if available)
- `notes` (e.g. "mix", "organic", "pelleted seed")

This file is used as a completeness checklist.

### Step 2: Inclusion Rules for the Main Dataset

**Required Coverage Rules:**

- Every unique flower variety sold by SeedSow or West Coast Seeds must appear as a row in `flower_varieties_v1.csv`
- These varieties count toward the 100 total
- If total affiliate varieties exceed 100:
  - Include all affiliate varieties
  - Expand the dataset beyond 100 (acceptable)
  - Do not drop affiliate items to hit an artificial cap

### Step 3: Vendor Metadata Fields (Add These Headers)

Add the following fields to the main dataset schema:

**Affiliate / Vendor Fields:**

- `availableFrom_SeedSow` (true|false)
- `availableFrom_WestCoastSeeds` (true|false)
- `vendorSeedList` (pipe list: SeedSow|WestCoastSeeds)
- `vendorVarietyNames` (pipe list of exact catalog names)

**Example:**
```
availableFrom_SeedSow = true
availableFrom_WestCoastSeeds = true
vendorSeedList = SeedSow|WestCoastSeeds
vendorVarietyNames = Zinnia Giant Mix|Zinnia Benary's Giant Mix
```

These fields are data-only and must not affect scoring logic.

### Step 4: Priority Data Quality Rules for Affiliate Varieties

For any variety sold by SeedSow or West Coast Seeds:

- `confidence` cannot be "low"
- Must have ≥3 sources
  - At least 1 seed catalog source
  - At least 1 horticultural reference or extension source
- Growth and bloom values must be cross-validated
  - Vendor description + independent source
- If data is incomplete:
  - Use broader numeric ranges
  - Flag uncertainty in notes fields
  - Never invent precision

### Step 5: Reporting & Verification (Required)

At delivery, the agent must include:

**A. Affiliate Coverage Report**

A short table showing:
- Total SeedSow flower varieties found
- Total West Coast Seeds flower varieties found
- % included in main dataset (must be 100%)

**B. Missing / Ambiguous List**

If any vendor variety:
- Has unclear naming (e.g. "Mix" without species)
- Appears duplicated across vendors
- Has missing genus/growth data

→ List it explicitly with recommended resolution.

### Step 6: Why This Matters (Agent Context)

This dataset is used in a decision-support picker where:

- Affiliate links are attached after matching
- Missing a vendor variety = lost monetization opportunity
- Biasing results toward affiliates is not allowed, but coverage is mandatory

The agent's job is **coverage + accuracy**, not persuasion.
