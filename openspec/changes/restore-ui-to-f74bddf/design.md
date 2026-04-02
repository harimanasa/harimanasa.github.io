# Design: Restore UI To f74bddf

## Overview
The target commit predates some of the current content plumbing, so a literal file rollback would also roll back content behavior. Instead, this change recreates the older visual structure while keeping the newer content sources.

## Approach
1. Revert the homepage structure to the older layout style.
2. Render the homepage timeline using older timeline markup.
3. Rebuild the achievements page with the earlier left-column and content-list presentation.
4. Keep `data/content.json` as the source of achievement content.
