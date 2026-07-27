export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  projectType?: string
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
