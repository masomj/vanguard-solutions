# Contributing

Conventions for this repo, derived from the current codebase. This file did not
exist before the Portfolio section was added (2026-09) -- if something here
turns out to be wrong or out of date, fix the doc in the same change that
breaks it.

## Stack

Vue 3 + `<script setup lang="ts">`, Vite, `vite-ssg` (static prerendering to
`dist/`), Vue Router 4, `vue-i18n`, `@unhead/vue`, Tailwind CSS. No backend --
the contact form posts via EmailJS. Deployed to GitHub Pages.

## Component inventory

```
src/
├── pages/                  One file per route (or one shared template for a
│                            family of routes -- see "Route patterns" below).
├── components/
│   ├── layout/              SiteHeader, SiteFooter, SkipLink, MobileMenu,
│   │                        NavDropdown -- the page shell.
│   ├── home/                Home-page sections + CallToAction (reused by
│   │                        most pages as the closing section).
│   ├── services/             ServiceCard.
│   ├── portfolio/           PortfolioCard.
│   ├── contact/              ContactForm, FormField.
│   ├── cookie/                CookieBanner.
│   └── shared/               BaseButton, SectionHeading, FaqSection,
│                            BrandLogo -- generic, reused across pages.
├── composables/              useLocale, useSeoMeta, usePageSchema,
│                            useContactForm, useCookieConsent, useAnalytics.
├── data/                    Structured content that isn't UI copy (e.g.
│                            portfolio items) -- lives in TypeScript, typed
│                            via src/types, not duplicated into i18n JSON.
├── i18n/                    en.json, cy.json, locales.ts, index.ts.
├── seo/                     siteSchema.ts -- the site-wide JSON-LD graph.
├── router/index.ts           Route table (see below).
└── types/index.ts            Shared interfaces + the RouteMeta augmentation.
```

Before adding a new shared component, check `components/shared/` -- reuse
`BaseButton`, `SectionHeading` and `FaqSection` rather than one-off markup.
`BaseButton` only renders an internal `router-link` or a `<button>`; for an
external link, use a plain `<a>` styled to match (see `PortfolioDetail.vue`'s
"visit site" link) rather than misusing `BaseButton`'s props.

## Route patterns

Routes are defined once, locale-agnostically, in the `pages` array in
`src/router/index.ts`, and expanded into both locale trees
(`buildLocaleRoutes`). A new page needs one entry there, not one per locale.

Two shapes exist for "one template, many pages":

1. **Fixed, enumerable set -- meta-driven.** The four `/services/*` detail
   pages all render `ServiceDetailPage.vue`, distinguished by a
   `serviceKey` set per-route in the `pages` array. Use this when the set of
   pages is small and known (new entries are still rare, deliberate edits).
2. **Open-ended set -- param-driven.** `/portfolio/:slug` renders
   `PortfolioDetail.vue`, which reads `route.params.slug` and looks the item
   up in `src/data/portfolio.ts` at render time. Use this when the content is
   data (grows over time, no fixed list to hand-maintain in the router).

**Dynamic (`:param`) routes and prerendering:** `vite.config.ts`'s
`ssgOptions.includedRoutes` filters out any path containing `:` before
handing the route list to `vite-ssg` -- a `:slug`-style path has no concrete
value to prerender, and `:` is an illegal filename character on Windows.
Adding another dynamic route needs no change here (the filter is generic),
but it does mean that route's detail pages will only exist once something
supplies concrete slugs for it to enumerate against.

Each route also carries `meta.seoKey` (drives the page's title/description
via `t('seo.<seoKey>.*')` in `useSeoMeta`, called once globally in `App.vue`
-- **do not call `useSeoMeta()` from a page**) and optionally
`meta.noindex: true`, which forces `noindex, follow` regardless of `seoKey`.
Use `noindex` for a real, linkable page that has no indexable content yet
(see Portfolio below); it keeps its canonical/hreflang tags, unlike the 404
route which suppresses those entirely.

Breadcrumb JSON-LD is generated centrally in `useSeoMeta.ts` from
`pathLabelKeys` -- add one `'/path': 'i18n.key'` entry there for a new
top-level page and the breadcrumb schema follows automatically. This only
works for paths with a static label; a param-driven detail page (like a
portfolio item) has no static label for its last segment, so its own
breadcrumb/creative-work JSON-LD is added directly in the page component via
`usePageSchema` instead (see `PortfolioDetail.vue`).

## i18n

`en.json` and `cy.json` must stay in exact key-path parity -- verify with:

```powershell
node -e "const a=require('./src/i18n/en.json'),b=require('./src/i18n/cy.json');const f=(o,p='')=>Object.entries(o).flatMap(([k,v])=>typeof v==='object'&&v?f(v,p+k+'.'):[p+k]);const A=new Set(f(a)),B=new Set(f(b));console.log([...A].filter(x=>!B.has(x)),[...B].filter(x=>!A.has(x)))"
```

Welsh (`cy.json`) content is machine-translated pending a native-speaker
review pass before launch -- this applies to every Welsh string in the repo,
not just new ones. Don't treat a Welsh string as verified copy.

Escape any `@` in a locale string as `{'@'}` -- vue-i18n treats a bare `@` as
linked-message syntax during SSR compilation and the build will fail.

Structured, non-copy content (client names, tech stacks, image paths, dates)
belongs in a typed `src/data/*.ts` file, not duplicated into both locale
JSON files -- see `src/data/portfolio.ts`.

## SEO / structured data

- `useSeoMeta()` (called once, in `App.vue`) owns title, description, OG/
  Twitter tags, canonical, hreflang, `<html lang>`, robots, and the
  site-wide + breadcrumb JSON-LD.
- `usePageSchema()` (called per-page, in `<script setup>`) layers additional
  JSON-LD on top -- e.g. `FAQPage` on service pages, `CollectionPage` on the
  portfolio index, `CreativeWork` on a portfolio detail page. Only add schema
  that matches content actually visible on the page.
- Title 41-67 characters, description 128-160 characters -- matches the rest
  of the site's search-result truncation targets.
- Adding a route requires no manual sitemap edit: `scripts/generate-sitemap.mjs`
  walks the actual `dist/` output after build. The one exception is a
  `noindex` route that still gets a static file (unlike the 404 catch-all,
  which never prerenders) -- add its base path to `EXCLUDED_FROM_SITEMAP` in
  that script, and remove it in the same change that drops `noindex: true`.

## CSS tokens

Defined in `src/assets/styles/main.css` under `@theme`. Key ones:
`bg-primary` / `bg-primary-dark` (header/footer, hero sections),
`bg-surface` (alternating section background against `bg-white`),
`border-border`, `text-text-primary` / `text-text-secondary`, `bg-accent`
(CTA buttons only), `bg-success` / `bg-error`. `--color-accent-cyan` is
dark-surface-only -- it fails contrast on white.

Layout conventions: hero `bg-primary text-white py-16 sm:py-20`; sections
`py-16 lg:py-24` alternating `bg-white`/`bg-surface` with `aria-labelledby`;
container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; cards `bg-white
rounded-lg p-6 border border-border`; icon chip `w-12 h-12 rounded-lg
bg-primary/10 text-primary flex items-center justify-center`.

## Header nav

`SiteHeader.vue`'s `navEntries` currently holds five top-level slots (Home,
Services group, Portfolio, Pricing, About group) plus the "Get a Quote" CTA
and the language toggle. Contact was deliberately dropped from top-level nav
because the CTA covers it. If you need to add another top-level entry, check
it doesn't wrap at the 1024-1280px breakpoint band specifically -- that band
has broken before (hamburger showing while desktop nav also shows, or vice
versa). Verify live in a browser, not just by reading the CSS.

Any dropdown/menu markup must use `v-show`, not `v-if` (see `NavDropdown.vue`).
The site is statically prerendered with `vite-ssg`; `v-if` strips hidden
markup out of the served HTML entirely, which has silently dropped nav links
from crawlers before.

## Accessibility

WCAG 2.1/2.2 AA. Skip link targets `#main-content` (set in `App.vue`).
Section headings use `aria-labelledby` pointing at a real heading `id` --
check the id exists when adding a new section, not just the reference.
Focus moves to `#main-content` on route change (handled globally). Dropdowns
and the mobile menu manage focus and Escape-to-close themselves --
see `NavDropdown.vue` / `MobileMenu.vue` before building another one.
