# Prompt for Claude Code — Portfolio section + InterCopy entry

Work in the vanguard-solutions repo (github.com/masomj/vanguard-solutions — Vue 3 +
Vite + vite-ssg + Tailwind, bilingual en/cy via vue-i18n, deployed to GitHub Pages).

Goal: build a new Portfolio section with one real entry (InterCopy). Do NOT merge to
main or push anything live beyond the feature branch.

Before writing any code, read CONTRIBUTING.md in the repo root per standing
convention — component inventory, API client patterns, CSS tokens, naming. Also
read the existing service pages (ServiceDetailPage.vue is driven by route meta so
one template serves four service pages — follow that pattern here rather than
one-off files per portfolio entry).

## Phase 0 — Setup
- git fetch/pull, check whether the seo-aio-improvements branch has already been
  merged to main. Branch off the current tip of main (not a stale base).
- Create branch: feature/portfolio-section
- Confirm CONTRIBUTING.md read and note any relevant conventions.

## Phase 1 — Data model, routing & content
- Define a portfolio item schema: slug, title, client, summary, description, tech
  (array), features (array), externalLink, status, heroImage (nullable).
- Add ONE real entry now:
  - slug: intercopy
  - title: InterCopy
  - client: Mason Jones
  - externalLink: https://intercopy.co.uk
  - status: "In active development" (no completion date — this is ongoing)
  - tech: [".NET 10", "ASP.NET Core", "EF Core", "PostgreSQL", "Nuxt 4", "Vue 3",
    "TypeScript", "Keycloak (OIDC)", "Figma Plugin API", "Docker",
    "GitHub Actions"]
  - features: [
      "Content tree + multi-language translation grid",
      "Review workflow with verdicts and full history",
      "Figma plugin — live sync between designs and translated content",
      "Glossary and style-rule enforcement for consistent terminology",
      "Role-based workspaces (Viewer / Editor / Reviewer / Admin)",
      "API + CI/CD integration for automated locale exports"
    ]
  - summary: "A translation management platform built for teams shipping
    products into multiple languages."
  - description: "Commissioned to build InterCopy, a translation management
    platform for teams shipping products into multiple languages. It replaces
    the spreadsheet-and-Slack-thread approach most teams use to localize a
    product with a shared workspace: a content tree for organizing strings, a
    side-by-side translation grid, a review workflow with sign-off history, and
    a glossary and style-rule engine that catches inconsistent terminology
    before it ships. A Figma plugin syncs design files directly to the content
    underneath them, so a translator can see the actual screen a string
    appears on rather than working from a flat export. Locale files export to
    i18next, vue-i18n, react-intl and next-intl, with an API and CI/CD
    integration so translations flow straight into a build pipeline. Built end
    to end: ASP.NET Core 10 API, PostgreSQL, Keycloak for authentication, a
    Nuxt 4 frontend, and a TypeScript Figma plugin, deployed on dedicated
    infrastructure with GitHub Actions handling CI/CD."
  - heroImage: none supplied yet — leave the image slot empty/placeholder in the
    component rather than inventing one; a real screenshot will be added later.
- Add routes for /portfolio (index/grid) and /portfolio/:slug (detail), both
  locales (en + cy prefix, matching the existing locale routing pattern). Add
  breadcrumb entries via the existing pathLabelKeys mechanism — do not hand-wire
  breadcrumbs per page.
- Translate the InterCopy copy into cy.json as well, keeping key parity between
  en.json and cy.json (enforced site-wide). Machine translation is fine for now —
  flag it the same way other machine-translated Welsh copy is flagged in this
  repo, awaiting a native-speaker pass.

## Phase 2 — Components
- PortfolioPage.vue: grid/list of items, driven by the data array from Phase 1.
- PortfolioCard.vue: single item preview.
- PortfolioDetail.vue: single case-study view (reuse the ServiceDetailPage.vue
  pattern — one template, route-meta or param driven, not a page per project).
- Build an empty-state component too (for whenever the array has zero items) even
  though it won't be the default view right now with InterCopy present — keep it
  in the codebase for future use, just don't show it while the array is non-empty.
- Copy tone: plain and direct, no em dashes, no "genuinely" / "actually" filler,
  no self-conscious hedging.

## Phase 3 — i18n
- Add all portfolio-related keys to both src/i18n/en.json and cy.json, keeping key
  parity between the two files.

## Phase 4 — Nav integration
- Add a "Portfolio" entry to the header nav. Current structure is four top-level
  slots (Home / Services dropdown / Pricing / About dropdown) plus a Get a Quote
  CTA and the Cymraeg toggle — Contact was deliberately removed from top-level
  nav because the CTA already covers it, and Pricing stays dedicated because it's
  the ad-campaign landing page.
- Add Portfolio as a 5th top-level link, positioned between Services and Pricing.
  Verify it doesn't cause wrapping or overflow at any breakpoint, especially the
  1024–1280px band that has broken before in this repo (hamburger showing while
  desktop nav also shows, or vice versa) — check this live in a browser, not just
  by reading the CSS.
- If a dropdown component is used anywhere in the build, remember v-show is
  required, not v-if — the site is statically prerendered with vite-ssg, and v-if
  strips hidden markup out of the served HTML entirely, which has silently dropped
  nav links from crawlers before in this repo.

## Phase 5 — SEO/AIO
- Add structured data via the existing usePageSchema pattern (CollectionPage or
  similar for the index, CreativeWork/Article-style for the InterCopy detail
  page).
- Because there's a real entry now, this page should be indexable — do NOT apply
  the noindex treatment used on genuinely-empty pages (e.g. 404). Titles 41–67
  chars, descriptions 128–160 chars, matching the character-count convention
  already enforced across the rest of the site. Canonical + hreflang wired the
  same way as every other page.

## Phase 6 — Validation
- npx vue-tsc -b clean
- npm run build clean, confirm portfolio routes appear in the prerendered output
- Visual check in a live browser: desktop, the 1024–1280px band specifically, and
  mobile — nav, the InterCopy card and detail page render correctly in both
  locales
- Basic accessibility pass: skip-link still reaches #main-content, keyboard nav
  through the new nav entry, no missing aria-labelledby references (this repo has
  had that break before)
- If a new shared component, composable, or route pattern was introduced, update
  CONTRIBUTING.md in the same commit

## Phase 7 — Wrap-up
- Commit in small, reviewable increments to feature/portfolio-section
- Push the branch to origin. Do NOT open a PR against main and do NOT merge —
  this branch stays parked until there's more real project content to add.
- Report: branch name, commit hashes, build/typecheck/prerender confirmation.
