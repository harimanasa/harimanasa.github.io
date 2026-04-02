# Delta for Homepage

## MODIFIED Requirements

### Requirement: Homepage Career Timeline
The homepage SHALL render the career timeline from `data/content.json` through the shared content management script.

#### Scenario: Content update changes the homepage timeline
- GIVEN a maintainer updates the `career` array in `data/content.json`
- WHEN the homepage loads
- THEN the career timeline reflects the updated content without editing `index.html`

#### Scenario: Timeline entry includes supporting links
- GIVEN a career item includes `companyUrl` or `certificate`
- WHEN the homepage renders that entry
- THEN the entry exposes those links in the rendered timeline

### Requirement: Homepage Testimonials Summary
The homepage SHOULD render featured testimonials from `data/content.json`.

#### Scenario: Content update changes featured testimonials
- GIVEN a maintainer updates the `testimonials` array in `data/content.json`
- WHEN the homepage loads
- THEN the featured testimonials section reflects the updated content without editing `index.html`
