export interface ServiceItem {
  icon: string
  title: string
  description: string
}

/**
 * Structural, non-copy facts about a case study. The actual copy (title,
 * client, status, summary, description, features) is not on this type --
 * it lives in `portfolioItems.<slug>.*` in en.json/cy.json, same as every
 * other piece of on-page text, so it goes through the normal translation
 * workflow. See `src/data/portfolio.ts`.
 */
export interface PortfolioItem {
  slug: string
  /** Short, non-translated technology/tool names. */
  tech: string[]
  externalLink: string
  /** No fabricated screenshots -- null renders a placeholder until a real one exists. */
  heroImage: string | null
}

export interface NavItem {
  to: string
  label: string
}

export interface NavLink extends NavItem {
  kind: 'link'
  id: string
}

export interface NavGroup {
  kind: 'group'
  id: string
  label: string
  items: NavItem[]
}

export type NavEntry = NavLink | NavGroup

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  message: string
  /** Honeypot. Hidden from real users, so anything in it came from a bot. */
  website: string
}

export interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  message?: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type ConsentStatus = 'undecided' | 'accepted' | 'declined'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    seoKey?: 'home' | 'about' | 'services' | 'technology' | 'process' | 'smallBusiness' | 'contact' | 'cookiePolicy' | 'notFound' | 'portfolio' | 'portfolioDetail'
    /** Forces `noindex, follow` regardless of seoKey. Set on routes with no indexable content yet. */
    noindex?: boolean
  }
}
