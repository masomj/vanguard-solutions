# Vanguard Digital Solutions — Website

A professional company website for Vanguard Digital Solutions, a software development company focused on fulfilling government and enterprise tenders. The site's primary purpose is lead generation and establishing credibility.

## Tech Stack
- **Vue 3 + TypeScript** scaffolded with **Vite**
- **Vue Router 4** — client-side routing with SEO meta per route
- **@unhead/vue** — dynamic `<head>` management (page titles, meta descriptions, Open Graph)
- **Tailwind CSS** — utility-first styling, fast to build, built-in responsive design
- **No backend** — contact form with full validation, submission endpoint left configurable for later

## Pages & Structure

```
Home        — Hero, services overview (3 cards), why choose us, testimonials, CTA
About       — Company story, mission/values, team overview, CTA
Services    — Service cards (Tender Fulfillment, Custom Dev, Consulting, Support), CTA
Contact     — Contact form (left) + contact info (right), map/address
404         — Simple not-found page with link home
```

Shared layout: SkipLink → SiteHeader (nav + mobile menu) → `<main>` → SiteFooter

## File Structure

```
src/
├── main.ts                         # Bootstrap: Vue, router, head, styles
├── App.vue                         # Layout shell: skip link, header, main, footer
├── router/index.ts                 # Routes with SEO meta
├── pages/
│   ├── HomePage.vue
│   ├── AboutPage.vue
│   ├── ServicesPage.vue
│   ├── ContactPage.vue
│   └── NotFoundPage.vue
├── components/
│   ├── layout/
│   │   ├── SiteHeader.vue
│   │   ├── SiteFooter.vue
│   │   ├── SkipLink.vue
│   │   └── MobileMenu.vue
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── ServicesOverview.vue
│   │   ├── WhyChooseUs.vue
│   │   ├── Testimonials.vue
│   │   └── CallToAction.vue
│   ├── services/
│   │   └── ServiceCard.vue
│   ├── contact/
│   │   ├── ContactForm.vue
│   │   └── FormField.vue
│   └── shared/
│       ├── BaseButton.vue
│       └── SectionHeading.vue
├── composables/
│   ├── useContactForm.ts
│   └── useSeoMeta.ts
├── assets/styles/main.css
└── types/index.ts
public/
├── favicon.svg
└── robots.txt
```

## Accessibility (WCAG 2.1 AA)
- Skip link, semantic HTML landmarks, heading hierarchy
- Keyboard navigation, focus trap in mobile menu, focus management on route change
- Form labels, aria-required/invalid/describedby, aria-live status
- AA color contrast (4.5:1+), visible focus rings

## SEO
- @unhead/vue for dynamic title/description/OG per route
- JSON-LD Organization structured data
- Semantic HTML, robots.txt, lazy-loaded routes

## Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```
