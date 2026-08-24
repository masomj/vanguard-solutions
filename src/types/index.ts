export interface ServiceItem {
  icon: string
  title: string
  description: string
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
    seoKey?: 'home' | 'about' | 'services' | 'technology' | 'process' | 'smallBusiness' | 'contact' | 'cookiePolicy' | 'notFound'
  }
}
