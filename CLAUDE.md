# Pick the Perfect Empire

## Project Overview
Decision tools that help users pick the best option for various categories. Uses affiliate marketing (SeedsNow, West Coast Seeds) for monetization.

## Tech Stack
- Vite / React / TypeScript
- Tailwind CSS

## Current State
- Tomato picker: LIVE
- Potato picker: LIVE
- Pepper picker: LIVE
- Strawberry picker: LIVE
- Flower picker: LIVE (105 varieties, 68 fields each)

## Repos & Live URLs
All 5 pickers are separate GitHub repos, linked as submodules in this parent repo:

| Picker | Repo | Live URL |
|--------|------|----------|
| Tomato | `cye0407/tomato-picker` | (original deployment) |
| Potato | `cye0407/pick-the-perfect-potato` | (original deployment) |
| Pepper | `cye0407/pick-the-perfect-pepper` | https://pepper-picker-henna.vercel.app |
| Strawberry | `cye0407/pick-the-perfect-strawberry` | https://strawberry-picker.vercel.app |
| Flower | `cye0407/pick-the-perfect-flower` | https://flower-picker.vercel.app |

## Architecture
- Each picker is a standalone Vite + React + TypeScript + Tailwind app
- All 5 are git submodules with their own repos for independent deployment
- Each picker follows this structure:
  - src/types/ — TypeScript type definitions + preferences type
  - src/crops/ — enums, scoring logic, and variety dataset
  - src/data/ — affiliate links and SEO search profiles
  - src/components/ — ProducePicker (main UI) and AffiliateCTA (buy button)
  - src/engine/ — generic matching algorithm
  - src/utils/ — display helpers

## Git Conventions
- Use conventional commits: feat:, fix:, docs:, refactor:, chore:
- Commit after each meaningful change
- Feature branches for new work: feat/description

## Session Protocol
- At session start: read this file
- During work: commit every meaningful milestone
- At session end: update "Current State" above, commit, push
