# Agent Mission

Create a normalized dataset of 100 potato varieties suitable for a decision-support picker app. Each variety must have consistent fields, scorable attributes, and short human descriptions. Output must be machine-importable and internally consistent.

## Output Format

- Deliver one CSV (or JSON if easier, but default CSV) with exact headers below.
- One row per variety
- Arrays in CSV must be pipe-delimited, e.g. `Roasting|Mashing|Frying`
- Keep numeric fields numeric (no text like "high" in numeric columns)
- File name: `potato_varieties_v1.csv`

---

## Required Schema (Headers)

Use these headers exactly:

### Identity

- `id` (1–100)
- `name`
- `alternateNames` (pipe list)
- `type` (enum: waxy|starchy|all_purpose|fingerling|petite|specialty)
- `skinColor` (enum: white|yellow|red|purple|blue|russet|pink|bicolor)
- `fleshColor` (enum: white|cream|yellow|gold|purple|blue|red|bicolor)
- `origin` (country or region of origin)
- `description` (1–2 sentences, practical)

### Flavor & Texture (scorable)

- `flavorIntensity` (1–10)
- `butteriness` (1–10)
- `earthiness` (1–10)
- `sweetness` (1–10)
- `nuttiness` (1–10)
- `flavorCategory` (enum: mild|buttery|earthy|nutty|sweet|complex)
- `textureWhenCooked` (enum: fluffy|creamy|waxy|mealy|firm)
- `moistureLevel` (enum: dry|medium|moist)
- `starchContent` (enum: low|medium|high)

### Culinary

- `bestUses` (pipe list; choose from: baking|mashing|roasting|frying|boiling|salads|soups|gratins|chips|gnocchi|hash)
- `fryingQuality` (1–10)
- `mashingQuality` (1–10)
- `roastingQuality` (1–10)
- `saladQuality` (1–10)
- `holdsShapeWhenCooked` (1–10)
- `cuisineAffinity` (pipe list; choose from: american|french|german|british|irish|scandinavian|eastern_european|mediterranean|indian|global)

### Tuber Characteristics

- `tuberShape` (enum: round|oval|oblong|fingerling|irregular)
- `tuberSizeCategory` (enum: petite|small|medium|large|very_large)
- `eyeDepth` (enum: shallow|medium|deep)
- `skinTexture` (enum: smooth|netted|russeted|flaky)
- `skinThickness` (enum: thin|medium|thick)

### Growth & Production

- `daysToMaturity_min`
- `daysToMaturity_max`
- `maturityCategory` (enum: early|mid_early|mid_season|mid_late|late)
- `yieldPotential` (enum: low|medium|high|very_high)
- `plantVigor` (enum: low|medium|high)
- `setCount` (enum: few|moderate|many) — number of tubers per plant
- `tuberSizeUniformity` (enum: variable|moderate|uniform)

### Environment & Setup

- `hardinessZone_min` (USDA zone number)
- `hardinessZone_max` (USDA zone number)
- `heatTolerance` (1–10)
- `droughtTolerance` (1–10)
- `frostTolerance` (1–10)
- `climateSuitability` (pipe list; cool|temperate|warm)
- `containerFriendly` (true|false)
- `minPotLiters` (number; if unknown use blank)
- `rowSpacingCm` (recommended row spacing)
- `seedSpacingCm` (recommended in-row spacing)
- `difficulty` (enum: beginner|intermediate|advanced)

### Storage

- `storageLife` (enum: poor|fair|good|excellent)
- `storageDormancy` (enum: short|medium|long) — how long before sprouting
- `storageNotes` (short text; blank allowed)

### Resilience

- `diseaseResistance_lateBlight` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_scab` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_virus` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseResistance_nematode` (enum: susceptible|moderate|resistant|highly_resistant)
- `diseaseNotes` (short text; blank allowed)

### Data Quality

- `sources` (pipe list of 2–4 reputable sources; short domain names or publication names)
- `confidence` (enum: high|medium|low)

---

## Variety Selection Rules (Must Follow)

### Balance the catalog

- ~25 waxy (salad potatoes, red-skinned, fingerlings)
- ~25 starchy (russets, bakers, fryers)
- ~25 all-purpose (Yukon Gold types, versatile)
- ~15 fingerling varieties
- ~10 specialty/heritage (purple, blue, unusual colors, rare heirlooms)

### Include famous + practical

Must include: Russet Burbank, Yukon Gold, Red Pontiac, Kennebec, Katahdin, Fingerling (Russian Banana, French), Purple Majesty, Adirondack Blue, Red Norland, Superior, German Butterball, Carola, Charlotte, La Ratte, All Blue, Cranberry Red, King Edward, Maris Piper, Desiree, Nicola, Kipfler.

### Avoid junk entries

- No "generic potato" placeholders.
- No duplicate varieties under different names unless you list the alt name.

### Keep it picker-focused

Descriptions must help someone choose (taste + use + growing note), not history essays.

---

## How to Assign Numeric Values (Critical)

You must convert qualitative descriptions into consistent numbers:

### Flavor Intensity (1–10)

- "Pronounced / bold / distinctive" → 7–10
- "Good potato flavor" → 4–6
- "Mild / subtle / bland" → 1–3

### Butteriness (1–10)

- "Rich / buttery / creamy" → 7–10
- "Moderate" → 4–6
- "Not buttery / lean" → 1–3
- Yellow-fleshed varieties often score higher

### Earthiness (1–10)

- "Earthy / mineral / terroir" → 7–10
- "Clean / neutral" → 1–4

### Sweetness (1–10)

- "Sweet / caramelizes well" → 6–10
- "Neutral" → 3–5
- "Not sweet" → 1–2

### Cooking Quality Scores (1–10)

- **Frying:** Starchy = high (7–10), Waxy = low (2–4)
- **Mashing:** Starchy/fluffy = high, Waxy = low
- **Roasting:** All-purpose often best (6–9)
- **Salad:** Waxy = high (7–10), Starchy = low (1–3)
- **Holds Shape:** Waxy = high, Starchy = low

**Do not max everything. The dataset must have contrast or your scoring becomes useless.**

---

## Source Standards

For each potato, include 2–4 sources (prefer official or recognized references):

**Good source types:**
- University extension pages (Cornell, Maine, Wisconsin, etc.)
- Seed potato suppliers (Wood Prairie Farm, Seed Savers, Irish Eyes, etc.)
- Potato breeding programs and variety trial reports
- National potato councils or agricultural research

If you use forums/gardening blogs, only for flavor nuance and set confidence lower unless corroborated.

The sources field should look like:
`woodprairie.com|extension.umaine.edu|potatoassociation.org`

(Short names are fine; no raw URLs required.)

---

## Consistency Checks (Agent Must Perform)

Before final output:

- No missing required enums (type/skinColor/fleshColor/etc.)
- All numeric ranges: min ≤ max
- All scores within 1–10
- maturityCategory matches daysToMaturity range
- starchContent aligns with type (starchy = high, waxy = low)
- At least 100 unique names
- At least 2 sources for every row
- Spot-check 10 random entries for realism

---

## Deliverable Summary (Must Include)

Alongside the CSV, provide:

1. A type distribution count (waxy/starchy/all_purpose/fingerling/specialty)
2. A maturity distribution (early/mid/late)
3. A short list: **10 best container potatoes** (based on your data)
4. A short list: **10 best for storage** (based on your data)
5. A short list: **10 best for flavor** (based on your data)

---

## If the Agent Gets Stuck

If a field cannot be found:

- Leave it blank only where allowed (minPotLiters, storageNotes, diseaseNotes)
- Never invent precise numbers; use broad ranges and set confidence=low/medium.

---

## Affiliate Coverage Requirement (Non-Negotiable)

### Mandatory Vendor Inclusion

The dataset MUST include all potato varieties currently offered by the following seed vendors, because they are active affiliate partners:

- **SeedSow** (SeedSow / SeedsNow-style catalog)
- **West Coast Seeds** (Canada-based seed supplier)

These varieties are not optional and must be treated as priority entries.

### Step 1: Build Vendor Variety Lists (Before Dataset Creation)

Before populating the main dataset, the agent must:

1. Extract a complete list of potato varieties sold by:
   - SeedSow
   - West Coast Seeds

2. Normalize names:
   - Deduplicate synonyms
   - Preserve original vendor naming in a dedicated field

3. Output a separate preliminary CSV:

**File:** `affiliate_potato_seedlist.csv`

**Headers:**
- `vendor` (SeedSow | WestCoastSeeds)
- `vendorVarietyName`
- `normalizedName`
- `type` (if available)
- `productURL` (if available)
- `notes` (e.g. "certified seed", "organic", "mini tubers")

This file is used as a completeness checklist.

### Step 2: Inclusion Rules for the Main Dataset

**Required Coverage Rules:**

- Every unique potato variety sold by SeedSow or West Coast Seeds must appear as a row in `potato_varieties_v1.csv`
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
vendorVarietyNames = Yukon Gold Seed Potato|Yukon Gold
```

These fields are data-only and must not affect scoring logic.

### Step 4: Priority Data Quality Rules for Affiliate Varieties

For any variety sold by SeedSow or West Coast Seeds:

- `confidence` cannot be "low"
- Must have ≥3 sources
  - At least 1 seed supplier source
  - At least 1 university extension or agricultural research source
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
- Total SeedSow potato varieties found
- Total West Coast Seeds potato varieties found
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
