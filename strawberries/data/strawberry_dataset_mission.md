# Agent Mission

Create a normalized dataset of 100 strawberry varieties suitable for a decision-support picker app. Each variety must have consistent fields, scorable attributes, and short human descriptions. Output must be machine-importable and internally consistent.

## Output Format

- Deliver one CSV (or JSON if easier, but default CSV) with exact headers below.
- One row per variety
- Arrays in CSV must be pipe-delimited, e.g. `Fresh|Jam|Freezing`
- Keep numeric fields numeric (no text like "high" in numeric columns)
- File name: `strawberry_varieties_v1.csv`

---

## Required Schema (Headers)

Use these headers exactly:

### Identity

- `id` (1–100)
- `name`
- `alternateNames` (pipe list)
- `type` (enum: june_bearing|everbearing|day_neutral|alpine|musk)
- `origin` (country or region of origin)
- `description` (1–2 sentences, practical)

### Flavor & Quality (scorable)

- `sweetness` (1–10)
- `tartness` (1–10)
- `aromaIntensity` (1–10)
- `flavorComplexity` (1–10)
- `flavorCategory` (enum: classic|aromatic|mild|tart|complex|wild)
- `textureCategory` (enum: firm|medium|soft)
- `juiciness` (1–10)

### Fruit Characteristics

- `fruitSizeGrams_min`
- `fruitSizeGrams_max`
- `sizeCategory` (enum: small|medium|large|very_large)
- `fruitShape` (enum: conical|wedge|round|elongated|irregular)
- `colorIntensity` (1–10, depth of red)
- `interiorColor` (enum: white|pink|red|dark_red)
- `skinStrength` (1–10, resistance to damage)
- `shelfLife` (enum: poor|fair|good|excellent)

### Culinary

- `bestUses` (pipe list; choose from: fresh_eating|jam|freezing|baking|drying|wine|smoothies|preserves|desserts|salads)
- `processingQuality` (1–10, how well it holds up to cooking/processing)
- `freezingQuality` (1–10)

### Growth & Production

- `daysToFirstHarvest` (from transplant)
- `harvestWindow` (enum: short|medium|long|continuous)
- `yieldPotential` (enum: low|medium|high|very_high)
- `runnerProduction` (enum: none|low|moderate|high|very_high)
- `plantVigor` (enum: low|medium|high)
- `lifespan` (enum: annual_treat|2_years|3_years|4_plus_years)

### Environment & Setup

- `hardinessZone_min` (USDA zone number)
- `hardinessZone_max` (USDA zone number)
- `heatTolerance` (1–10)
- `coldTolerance` (1–10)
- `climateSuitability` (pipe list; cool|temperate|warm|hot)
- `containerFriendly` (true|false)
- `minPotLiters` (number; if unknown use blank)
- `spacingCm` (recommended plant spacing)
- `difficulty` (enum: beginner|intermediate|advanced)

### Resilience

- `diseaseResistance_verticillium` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_powderyMildew` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_crownRot` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_leafSpot` (enum: susceptible|moderate|resistant|highly_resistant)
- `pestNotes` (short text; blank allowed)
- `diseaseNotes` (short text; blank allowed)

### Data Quality

- `sources` (pipe list of 2–4 reputable sources; short domain names or publication names)
- `confidence` (enum: high|medium|low)

---

## Variety Selection Rules (Must Follow)

### Balance the catalog

- ~30 june-bearing (traditional single harvest)
- ~30 day-neutral (continuous production)
- ~20 everbearing (two main flushes)
- ~15 alpine/wild types (Fragaria vesca)
- ~5 unusual/specialty (musk strawberries, white varieties, heritage)

### Include famous + practical

Must include: Chandler, Albion, Seascape, Honeoye, Earliglow, Jewel, Allstar, Ozark Beauty, Quinault, Tristar, Fort Laramie, Camarosa, Sweet Charlie, Flavorfest, Alexandria (alpine), Mignonette (alpine), Yellow Wonder, Mara des Bois, Gariguette, Elsanta.

### Avoid junk entries

- No "generic strawberry" placeholders.
- No duplicate varieties under different names unless you list the alt name.

### Keep it picker-focused

Descriptions must help someone choose (taste + use + growing note), not history essays.

---

## How to Assign Numeric Values (Critical)

You must convert qualitative descriptions into consistent numbers:

### Sweetness (1–10)

- "Very sweet / candy-like / honey notes" → 8–10
- "Balanced sweet-tart" → 5–7
- "Tart / acidic / sharp" → 2–4

### Tartness (1–10)

- "High acid / tart / tangy" → 7–10
- "Balanced" → 4–6
- "Low acid / mild" → 1–3

### AromaIntensity (1–10)

- "Highly aromatic / fragrant / perfumed" → 7–10
- "Moderate aroma" → 4–6
- "Mild / subtle" → 1–3

### Flavor Complexity (1–10)

- Alpine and musk types often higher (7–10)
- Simple "strawberry forward" varieties → 3–5
- Varieties with wine/spice/floral notes → 6–9

**Do not max everything. The dataset must have contrast or your scoring becomes useless.**

---

## Source Standards

For each strawberry, include 2–4 sources (prefer official or recognized references):

**Good source types:**
- University extension pages (Cornell, UC Davis, Oregon State, etc.)
- Recognized nurseries (Nourse Farms, Indiana Berry, Stark Bros, etc.)
- Breeding program publications
- RHS, agricultural research stations

If you use forums/gardening blogs, only for flavor nuance and set confidence lower unless corroborated.

The sources field should look like:
`noursefarmsstore.com|extension.cornell.edu|rhs.org.uk`

(Short names are fine; no raw URLs required.)

---

## Consistency Checks (Agent Must Perform)

Before final output:

- No missing required enums (type/sizeCategory/etc.)
- All numeric ranges: min ≤ max
- All scores within 1–10
- sizeCategory matches fruitSizeGrams range
- At least 100 unique names
- At least 2 sources for every row
- Spot-check 10 random entries for realism

---

## Deliverable Summary (Must Include)

Alongside the CSV, provide:

1. A type distribution count (june_bearing/everbearing/day_neutral/alpine/musk)
2. A climate suitability summary
3. A short list: **10 best container strawberries** (based on your data)
4. A short list: **10 best for flavor** (based on your data)

---

## If the Agent Gets Stuck

If a field cannot be found:

- Leave it blank only where allowed (minPotLiters, pestNotes, diseaseNotes)
- Never invent precise numbers; use broad ranges and set confidence=low/medium.

---

## Affiliate Coverage Requirement (Non-Negotiable)

### Mandatory Vendor Inclusion

The dataset MUST include all strawberry varieties currently offered by the following seed/plant vendors, because they are active affiliate partners:

- **SeedSow** (SeedSow / SeedsNow-style catalog)
- **West Coast Seeds** (Canada-based seed supplier)

These varieties are not optional and must be treated as priority entries.

### Step 1: Build Vendor Variety Lists (Before Dataset Creation)

Before populating the main dataset, the agent must:

1. Extract a complete list of strawberry varieties sold by:
   - SeedSow
   - West Coast Seeds

2. Normalize names:
   - Deduplicate synonyms
   - Preserve original vendor naming in a dedicated field

3. Output a separate preliminary CSV:

**File:** `affiliate_strawberry_plantlist.csv`

**Headers:**
- `vendor` (SeedSow | WestCoastSeeds)
- `vendorVarietyName`
- `normalizedName`
- `type` (if available)
- `productURL` (if available)
- `notes` (e.g. "bare root", "organic", "seeds vs plants")

This file is used as a completeness checklist.

### Step 2: Inclusion Rules for the Main Dataset

**Required Coverage Rules:**

- Every unique strawberry variety sold by SeedSow or West Coast Seeds must appear as a row in `strawberry_varieties_v1.csv`
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
availableFrom_WestCoastSeeds = false
vendorSeedList = SeedSow
vendorVarietyNames = Alpine Strawberry|Alexandria Alpine
```

These fields are data-only and must not affect scoring logic.

### Step 4: Priority Data Quality Rules for Affiliate Varieties

For any variety sold by SeedSow or West Coast Seeds:

- `confidence` cannot be "low"
- Must have ≥3 sources
  - At least 1 nursery/seed catalog source
  - At least 1 horticultural or university extension source
- Flavor and growth values must be cross-validated
  - Vendor description + independent source
- If data is incomplete:
  - Use broader numeric ranges
  - Flag uncertainty in diseaseNotes or notes
  - Never invent precision

### Step 5: Reporting & Verification (Required)

At delivery, the agent must include:

**A. Affiliate Coverage Report**

A short table showing:
- Total SeedSow strawberry varieties found
- Total West Coast Seeds strawberry varieties found
- % included in main dataset (must be 100%)

**B. Missing / Ambiguous List**

If any vendor variety:
- Has unclear naming
- Appears duplicated across vendors
- Has missing type/growth data

→ List it explicitly with recommended resolution.

### Step 6: Why This Matters (Agent Context)

This dataset is used in a decision-support picker where:

- Affiliate links are attached after matching
- Missing a vendor variety = lost monetization opportunity
- Biasing results toward affiliates is not allowed, but coverage is mandatory

The agent's job is **coverage + accuracy**, not persuasion.
