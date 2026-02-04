# Working with Claude - PickThePerfect Empire

**Last updated:** January 2026

## Brand Context

PickThePerfect builds decision tools for gardeners (and eventually beyond). Each picker helps users find the right variety/product based on their specific needs, monetized through contextual affiliate links.

## Core Mission

**Help people make confident decisions in overwhelming categories.**

Gardening has thousands of variety options. We cut through the noise with practical, preference-based recommendations that respect the user's actual constraints (space, climate, experience level).

## Voice & Tone

### In the Picker UI
- **Practical, not preachy** - No lectures about organic gardening
- **Confident recommendations** - "This variety is great for X" not "You might consider..."
- **Gardener-to-gardener** - Like advice from a knowledgeable friend
- **No fluff** - Every word earns its place

### In SEO Content
- **Problem-first** - Start with what they searched for
- **Actionable** - Give them the answer, then context
- **Specific** - Name varieties, give numbers, be concrete
- **Honest about tradeoffs** - Every variety has pros and cons

## Product Philosophy

1. **App works without affiliates** - Recommendations first, monetization second
2. **Modular monetization** - Links can be added/removed without breaking anything
3. **Regional flexibility** - US/EU/CA links managed separately
4. **Clone-friendly architecture** - New crop = config change, not rebuild

## Content Types & Approach

### Variety Descriptions
- 2-3 sentences max
- Lead with what makes it special
- Include practical growing notes
- Mention best uses

**Good:** "San Marzano is the gold standard for sauce tomatoes. Meaty flesh with few seeds and low moisture. Needs staking and a long season (80 days)."

**Bad:** "This beloved Italian heirloom has been grown for generations in the volcanic soil of Mount Vesuvius and is cherished by home cooks and professional chefs alike for its extraordinary paste-making qualities."

### SEO Landing Pages
- Target specific search intents ("best tomatoes for containers")
- Pre-filtered picker results
- Brief intro (2-3 paragraphs max)
- Let the picker do the work

### Match Reasons
- Short, specific explanations
- Connect user preference to variety trait
- Format: "[Trait] matches your [preference]"

**Good:** "Compact size fits containers" / "High disease resistance for humid climates"

**Bad:** "This variety could potentially work well for your stated preferences"

## Technical Guidelines

### Data Quality
- Every variety needs complete data (no empty fields)
- Scores on 1-10 scales should use the full range
- Traits array should be specific, not generic
- Disease resistance listed individually, not "multiple"

### Affiliate Links
- Test every link before committing
- Include tracking parameters
- Document partner and approval status
- Never link to out-of-stock products

### Search Profiles
- Slug = URL-friendly, keyword-focused
- Title = What they searched
- Description = Meta description (150-160 chars)
- Preset = Minimal filters to achieve intent

## Working Process

1. **New crop picker:**
   - Follow `cloning-process.md` step by step
   - Research 30-50 varieties minimum for launch
   - Create 10-15 search profiles for SEO

2. **Adding varieties:**
   - Use variety-schema as template
   - Verify data from multiple sources
   - Test in picker before committing

3. **Affiliate integration:**
   - Document partner in `affiliate-links.md`
   - Test links in staging first
   - Verify regional targeting works

## What Claude Can Help With

- **Variety research** - Finding and structuring data for new crops
- **Schema design** - Adapting types for new product categories
- **SEO profiles** - Generating search-intent landing pages
- **Content writing** - Variety descriptions, landing page intros
- **Code updates** - Modifying picker logic for new attributes
- **Cloning assistance** - Walking through the process step by step

## Keywords & Terminology

**Use:**
- "Variety" not "cultivar" (unless audience is advanced)
- "Picker" for the tool
- "Growing" not "cultivation"
- Specific variety names, always

**Avoid:**
- "Journey" (no gardening journey)
- "Sustainable" unless specifically relevant
- Overly technical Latin names without common names
- Amazon (we don't use Amazon affiliates)

---

**See also:**
- `_shared/instructions/working-with-claude-general.md`
- `schemas/` folder for data structures
- `cloning-process.md` for new picker setup
