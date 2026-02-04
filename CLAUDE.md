# Pick the Perfect Empire

## Project Overview
Decision tools that help users pick the best option for various categories. Uses affiliate marketing (SeedsNow, West Coast Seeds) for monetization.

## Tech Stack
- Vite / React / TypeScript
- Tailwind CSS

## Current State
- Tomato picker: LIVE (tomatoes/tomato-picker, separate repo submodule)
- Potato picker: LIVE (potatoes/potato-picker, separate repo submodule)
- Pepper picker: BUILD READY (peppers/pepper-picker, in parent repo)
- Strawberry picker: BUILD READY (strawberries/strawberry-picker, in parent repo)
- Flower picker: BUILD READY (flowers/flower-picker, in parent repo) — 105 varieties, 68 fields each

## Architecture
- Each picker is a standalone Vite + React + TypeScript + Tailwind app
- Tomato and potato are git submodules with their own repos
- Pepper, strawberry, and flower live in the parent repo
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
