# Handover — Content Expansion

## What was added

### New pages (all wired: route, `meta.seoKey`, types union, footer links, en + cy i18n)

| Route | Component | i18n root | In header nav? |
|---|---|---|---|
| `/technology` | `src/pages/TechnologyPage.vue` | `technology`, `seo.technology` | Yes |
| `/process` | `src/pages/ProcessPage.vue` | `process`, `seo.process` | Yes |
| `/small-business` | `src/pages/SmallBusinessPage.vue` | `smallBusiness`, `seo.smallBusiness` | No (footer only) |

- **Technology** — semantic HTML, modern CSS, TypeScript, Vue 3, Nuxt, Vite, REST/GraphQL APIs, WCAG 2.2 AA accessibility, UK GDPR/PECR, Azure cloud-first hosting, Docker + CI/CD, Core Web Vitals, technical SEO.
- **Process** — 5-stage lifecycle (request → proposal → requirements → milestone build → launch/handover), milestone review rhythm, AI-assisted & agentic delivery with explicit human-review guardrails, quality gates, environments, working together, FAQ.
- **Small business** — legitimacy/ownership/being-found, how a simple site generates enquiries, what's included, signs you need one, plain-English 4-step process, FAQ, links to deeper pages.

### New home sections
- `src/components/home/TechStackSection.vue` (after `ServicesOverview`)
- `src/components/home/ProcessSection.vue` (after `WhyChooseUs`)
- Keys: `home.techStack`, `home.process`

### Expanded pages
- `AboutPage.vue` — "How I work" (4 cards) + "Skills and technologies" (4 grouped lists). Keys `about.howIWork`, `about.skills`.
- `ServicesPage.vue` — "Go deeper" cross-link cards. Keys `servicesPage.related`.

### Fixes
- **Removed the fabricated testimonials.** Deleted `TestimonialsSection.vue`, the `home.testimonials` keys in both locale files, and the now-unused `Testimonial` interface in `src/types/index.ts`.
- Removed placeholder phone `+44-29-1234-5678` from the JSON-LD in `src/App.vue`.
- `public/robots.txt` sitemap URL corrected from `vanguarddigital.co.za` → `vanguarddigitalsolutions.co.uk`.
- Added `public/sitemap.xml` covering all 8 routes.

### Static prerendering (SSG) — done
Migrated from a client-rendered SPA to build-time prerendering with **`vite-ssg` 28.3.0**. Still 100% static, still on GitHub Pages.
- `src/router/index.ts` now exports a `routes` array + `scrollBehavior` instead of a router instance.
- `src/main.ts` uses the `ViteSSG` factory; `emailjs.init` is guarded behind `isClient`.
- `vite.config.ts` has `ssgOptions` with `dirStyle: 'nested'` (emits `dist/technology/index.html`, which GH Pages serves reliably) and an `includedRoutes` filter excluding the `/:pathMatch(.*)*` catch-all.
- `package.json` build script is now `vue-tsc -b && vite-ssg build`.
- SSR-safety guards added to `useCookieConsent.ts`, `src/i18n/index.ts` and `App.vue` (no `window`/`localStorage`/`document` access during the Node build).
- Email addresses in the locale files are escaped as `{'@'}` because vue-i18n treats a bare `@` as linked-message syntax during SSR compilation. **If you add another email address to a JSON locale file, escape it the same way.**
- `public/.nojekyll` added.
- Prerendered HTML is the **English** version. The cy toggle still works at runtime but is not reflected in the static files — see outstanding item 3.

Verified: all 8 routes emit ~28–37 KB of real HTML with unique `<title>`, `<meta description>` and OG tags; no hydration mismatch warnings; `npm run dev` still works in SPA mode; `.nojekyll`, `CNAME`, `sitemap.xml`, `robots.txt`, `404.html` all present in `dist`. The existing `.github/workflows/deploy.yml` needed no changes.

### Verified
- `npm run build` passes.
- `en.json` and `cy.json` both 623 keys, identical key paths, valid JSON.

### Truth constraints applied
No invented testimonials, clients, case studies, statistics, prices, timeframes, team members or years-in-business. Voice is first-person singular / neutral. Claims limited to: Vue 3, Nuxt, TypeScript, HTML/CSS, WCAG 2.2/WAI-ARIA, REST & GraphQL, Azure, Docker, CI/CD, GDPR, .NET/C#, Node.js, SQL, AI-assisted/agentic workflows. **AWS, GCP and Kubernetes were deliberately never mentioned as skills.**

---

## ⚠️ Outstanding — action required

### 1. Welsh translation review
All `cy.json` strings were machine-generated. Get a native Welsh speaker to review before launch — particularly the technical pages. Technical proper nouns (Vue, Nuxt, Docker, Azure, WCAG, GDPR) were intentionally left untranslated.

### 2. Header navigation is now 6 items
`SiteHeader.vue` navLinks: Home, About, Services, Technology, Process, Contact — plus the "Get a Quote" button and the language toggle. Check it doesn't wrap at ~1024–1280px. If it does, either drop Technology and Process into a "Why us" dropdown, or move About to the footer only.

### 3. Consider a "be my first client" section
The home page previously had three invented testimonials; they are now gone, which leaves a credibility gap. Consider an honest replacement: state plainly that the business is new and offer something concrete — a discounted first project, extended support, or a free accessibility/performance audit of a prospect's existing site. Reuse the `SectionHeading` + card conventions and slot it into `HomePage.vue`. Check the `bg-white` / `bg-surface` alternation still holds afterwards.

### 4. Nice-to-haves not done
- **FAQPage JSON-LD** for the `<details>` FAQs on `/process` and `/small-business` — would earn rich results in Google. Add via `useHead` in each page.
- **Service JSON-LD** on `/services`.
- **`hreflang`** tags for the en/cy split (the site uses a client-side locale toggle, not URL-based locales, so this needs a decision first — URL-based `/cy/...` routing would be better for SEO).
- **`sitemap.xml` is static** — when you add a route, update it *and* the `includedRoutes` list in `vite.config.ts`, otherwise the new page will not be prerendered.

### 5. Content review
Read the three new pages end-to-end and correct anything that overstates your experience or doesn't sound like you. Sections that make explicit claims worth double-checking: `about.skills.intro` ("4 years of professional full-stack development experience"), the AI guardrails block on `/process`, and the "What's included as standard" list on `/small-business` — make sure you're happy to deliver every item on that list.

---

## Useful commands

```powershell
npm run dev      # localhost:3000, SPA mode (no prerendering)
npm run build    # vue-tsc -b && vite-ssg build -> static HTML per route in dist/
npx vite preview # serve dist/ and check the prerendered output

# confirm every route got its own <title>
Get-ChildItem dist -Recurse -Filter index.html | ForEach-Object { Select-String -Path $_.FullName -Pattern '<title>(.*?)</title>' }

# check en/cy key parity
node -e "const a=require('./src/i18n/en.json'),b=require('./src/i18n/cy.json');const f=(o,p='')=>Object.entries(o).flatMap(([k,v])=>typeof v==='object'&&v?f(v,p+k+'.'):[p+k]);const A=new Set(f(a)),B=new Set(f(b));console.log([...A].filter(x=>!B.has(x)),[...B].filter(x=>!A.has(x)))"
```

## Conventions cheat-sheet for future pages

1. `src/pages/XPage.vue` — `<script setup lang="ts">`, `const { t } = useI18n()`, data as `computed(() => [...])`.
2. Route in `src/router/index.ts`: lazy `import()`, `meta: { seoKey: 'x' }`.
3. Add `'x'` to the `seoKey` union in the `declare module 'vue-router'` block in `src/types/index.ts`.
4. Add `x` and `seo.x` (`title`, `description`, `ogTitle`, `ogDescription`) to **both** `en.json` and `cy.json`.
5. Add to `SiteHeader.vue` `navLinks` and/or `SiteFooter.vue` `quickLinks`.
6. Add the URL to `public/sitemap.xml` **and** to `includedRoutes` in `vite.config.ts` so it gets prerendered.
7. Do **not** call `useSeoMeta()` in the page — it runs globally in `App.vue` off `meta.seoKey`.

Layout classes: hero `bg-primary text-white py-16 sm:py-20`; sections `py-16 lg:py-24` alternating `bg-white`/`bg-surface` with `aria-labelledby`; container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; cards `bg-white rounded-lg p-6 border border-border`; text `text-text` / `text-text-light`; icon chip `w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center`.
