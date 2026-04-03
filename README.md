# Manasa Hari — GitHub Pages portfolio

**Live site:** [https://harimanasa.github.io](https://harimanasa.github.io)

---

## Copyright

© 2020–2026 **Manasa Hari**. All rights reserved.

This repository and its contents (HTML, CSS, images, text, and documentation) are the personal work of Manasa Hari unless otherwise attributed. You may browse and fork for inspiration; do not pass off this site or its assets as your own. Third-party libraries (e.g. Font Awesome, timeline styles, jQuery) remain under their respective licenses.

---

## What this project is (visual overview)

This repo hosts a **static personal portfolio** published with **GitHub Pages**. It presents a professional profile, career timeline (“News”), achievements, projects, hackathons, testimonials, and music—in a **two-column layout** with a teal accent palette and serif-forward typography.

### Layout at a glance

| Area | Role |
|------|------|
| **Left column** | Profile photo, education lines, and quoted testimonials |
| **Right column** | Bio / introduction, horizontal rule, then **News** (vertical timeline of milestones) |
| **Footer** | Social links and copyright line |

![Schematic: sidebar + main column with timeline](images/readme/site-structure.svg)

### Repository map (high level)

```
harimanasa.github.io/
├── index.html              # Home (classic two-column layout + embedded timeline)
├── css/                    # main.css, timeline.css
├── pages/                  # hackathons, projects, testimonials, achievements, music, …
├── data/content.json       # Optional structured data (achievements, testimonials, career)
├── scripts/                # main.js, content-manager.js (e.g. ?admin=true on achievements)
├── images/                 # profile, achievements, music, testimonials, …
└── images/readme/          # Diagrams used in this README (SVG)
```

### On-brand visuals in the site itself

- **Teal** (`#009688` family) for timeline markers, icons, and emphasis  
- **Burgundy** (`#990000` style) for highlighted links in body copy  
- **Cards** on a light grey page background (`main-light-grey`)

Profile photo used on the home page lives at **`images/profile.png`** (not inlined here to keep this README lightweight).

---

## Bloom filters — a concise primer

A **Bloom filter** is a probabilistic data structure that answers: *“Is this element possibly in a set?”* using a **fixed-size bit array** and **several independent hash functions**.

![Bloom filter: hashes map items into bit positions](images/readme/bloom-filter-structure.svg)

### How it works

1. **Start** with an array of *m* bits, all 0.  
2. **Insert** an element *x*: compute *k* hash values, each in `[0, m−1]`, and **set those bits to 1**.  
3. **Query** an element *y*: compute the same *k* hashes; **if any bit is 0**, *y* is **definitely not** in the set; **if all are 1**, *y* is **maybe** in the set (could be a *false positive*).

### Why people use them

- **Very space-efficient** compared to storing every key exactly (e.g. hash sets) when you can tolerate uncertainty on the “yes” side.  
- **Fast** *O(k)* lookups and inserts, with *k* small and constant.

### What they do *not* give you

![Bloom filter guarantees vs trade-offs](images/readme/bloom-filter-tradeoffs.svg)

- **No false negatives** (if it says “not present,” it is not present).  
- **Possible false positives** (it may say “maybe” when the item was never inserted).  
- **Classic Bloom filters** don’t support safe delete without variants (e.g. counting Bloom filters).

### Where they show up in practice

- **Databases & caches** (e.g. “avoid disk lookup if definitely not here”)  
- **Network systems** (routing, deduplication hints)  
- **Large-scale ingestion** when memory is tight and an occasional false alarm is OK

*This README section is educational; the portfolio site itself does not implement a Bloom filter—it documents simply the idea for readers.*

---

## Maintenance notes

- **Content:** Many inner pages are hand-authored HTML; `data/content.json` and `scripts/content-manager.js` support data-driven pieces and an optional **admin** experience on some URLs (e.g. `?admin=true` on achievements).  
- **Images:** Prefer optimized JPEG/PNG under `images/`. Paths in HTML are relative to each page.  
- **Deploy:** Push to the branch GitHub Pages uses (commonly `main` or `gh-pages`); Pages rebuilds automatically.

---

## License & attribution

- **Site content & custom assets:** © Manasa Hari (see [Copyright](#copyright)).  
- **Third-party:** Google Fonts, Font Awesome, jQuery, and any CDN scripts are used under their original licenses.
