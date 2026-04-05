# Manasa Hari — GitHub Pages portfolio

**Live site:** [https://harimanasa.github.io](https://harimanasa.github.io)

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
