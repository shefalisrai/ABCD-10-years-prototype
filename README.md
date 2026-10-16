# ABCD Study · 10 Years — topic page mockup

A clickable mockup of the detailed topic pages that people reach from the 10 Years
front-page network map. It is for stakeholder review, not production code for abcdstudy.org.
Two pages are built so far: Mental Health and Substance Use.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173/#mental-health or /#substance-use
npm run build    # static site in dist/
```

The grey bar at the top ("Mockup pages") only switches between pages for the demo. On the
live site, the front-page map links to each page.

## How a page works

- **Theme bubbles** on the left filter the cards by broad theme (Lifestyle, Brain, Social); the
  smaller labels on each card are tags only. "Show connected" hides cards from other topics.
- **Each card** shows a bold statement, then the ABCD highlight. Clicking it flips the card
  to show the research: a combined explanation, the 10-Year Special Issue review papers it draws on,
  original studies, and connected findings.
- **Connected findings** jump to that card, switching pages when it lives on another topic
  (for example `#substance-use/su-health`).
- **Related infographics and data briefs** sit at the bottom and link to the existing ABCD pages.

## Editing content

All text lives in `src/data/`, so content changes need no layout code:

| File | Holds |
| --- | --- |
| `findings.js` | One entry per card: front text, back text, themes, sources, connected cards |
| `pages.js` | Which cards each topic page shows, plus its intro line and infographics |
| `sources.js` | The 10-Year Special Issue review paper for each workgroup |
| `topics.js` | Topic names and their front-page colors |

To add a topic page, add its findings to `findings.js` and an entry to `pages.js`. It is then
reachable at `#<slug>`. Rendering lives in `src/page.js` (page and filters) and `src/card.js`
(flip card). The emblem is `src/assets/brain-rainbow.svg`, with the topic name drawn on an arc
above it.

Content rules: findings cover the past 10 years only, with no future directions or policy
recommendations. A card without original studies listed shows "TBD study links". Wording follows
`Mental Health_WrittenOverview.docx`: plain language, framed around what supports young people
("protective", "lower levels of") rather than "worsen" or "negative impact".

## Open items

- **Substance Use wording** was drafted from the figures in Wallace et al.; the Substance Use
  workgroup should confirm it.
- **Topic colors** in `topics.js` were matched by eye to the front-page map. Use the front-page
  team's exact values.
- **Fonts:** headings use Anca and body text Myriad Pro when installed; otherwise Patrick Hand SC
  and Source Sans 3 (Google Fonts) stand in. The live site needs web licenses for Anca and
  Myriad Pro.
- **Links:** "Read →" citation links and "Back to the map" are placeholders. Infographic tiles
  point to the infographics and data-briefs index pages, not the individual PDFs.
