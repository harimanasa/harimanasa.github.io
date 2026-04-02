# Design: Sync Homepage With Content JSON

## Overview

The project already has a lightweight content rendering layer in `scripts/content-manager.js`. The simplest and safest design is to connect the homepage to that existing layer rather than create a second renderer.

## Approach

1. Replace the hardcoded homepage timeline block with a container element.
2. Add a featured testimonials container on the homepage.
3. Load `scripts/content-manager.js` on `index.html`.
4. Update the homepage renderer output in `scripts/content-manager.js` so the generated markup is clean and readable.
5. Add minimal homepage styles so the generated content fits the current visual language.

## Tradeoffs

- Keeping the introductory biography hardcoded reduces scope and keeps this first OpenSpec example easy to understand.
- Leaving the change unarchived after implementation gives a clean teaching moment: the next OpenSpec step is review and archive.
