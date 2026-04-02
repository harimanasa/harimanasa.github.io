# Proposal: Sync Homepage With Content JSON

## Intent
Make the homepage career timeline and featured testimonials render from `data/content.json` instead of relying on hardcoded homepage markup.

## Why

- The repository already has a structured content file for achievements, testimonials, and career history.
- `scripts/content-manager.js` already contains homepage renderers, but the homepage does not use them.
- The README says the homepage is data-driven, so the implementation should match the documented workflow.

## Scope

- Render the homepage career timeline from `data/content.json`
- Render a featured testimonials section from `data/content.json`
- Load `scripts/content-manager.js` on the homepage
- Keep the existing introduction content in place for now

## Non-Goals

- Redesign the full homepage
- Move all homepage intro copy into JSON
- Convert every page to fully data-driven rendering
