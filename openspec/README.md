# OpenSpec in This Project

This portfolio now includes a starter OpenSpec workspace so you can learn by using a real change in a real repo.

## What to Look At First

1. `openspec/specs/homepage/spec.md`
   This is the current source of truth for homepage behavior before a change is archived.

2. `openspec/changes/sync-homepage-with-content-json/`
   This is a practical example change with:
   - `proposal.md`
   - `design.md`
   - `tasks.md`
   - `specs/homepage/spec.md`

## Practical Workflow

Use OpenSpec as a conversation between intent and code:

1. Decide the change you want.
2. Write or generate a change folder in `openspec/changes/<change-name>/`.
3. Review `proposal.md` to confirm the why and scope.
4. Review `specs/.../spec.md` to confirm expected behavior.
5. Review `design.md` and `tasks.md`.
6. Implement the code.
7. Validate the result.
8. Archive the change after review by merging the delta into `openspec/specs/`.

## What This Example Teaches

This repo already had a `data/content.json` file and a `scripts/content-manager.js` renderer, but the homepage still had hardcoded timeline content. The example change shows how OpenSpec captures:

- the problem
- the intended behavior
- the technical approach
- the implementation checklist

## How to Work With Me Practically

You can use prompts like:

- `Explore the next OpenSpec change for this portfolio site.`
- `Create an OpenSpec proposal for adding a contact section.`
- `Implement the active OpenSpec change.`
- `Review the current OpenSpec change and tell me what is missing before archive.`

## Suggested Next Exercises

- Add a `contact` section to the homepage
- Make the navigation render from `data/content.json`
- Move homepage intro content into `data/content.json`
- Add project cards driven by JSON instead of hardcoded HTML
