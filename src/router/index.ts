import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

/** One entry per page. Paths are relative (no leading slash). */
const pages = [
  { path: '', name: 'home', component: HomePage, seoKey: 'home' },
  { path: 'about', name: 'about', component: () => import('../pages/AboutPage.vue'), seoKey: 'about' },
  { path: 'services', name: 'services', component: () => import('../pages/ServicesPage.vue'), seoKey: 'services' },
  { path: 'technology', name: 'technology', component: () => import('../pages/TechnologyPage.vue'), seoKey: 'technology' },
  { path: 'process', name: 'process', component: () => import('../pages/ProcessPage.vue'), seoKey: 'process' },
  { path: 'small-business', name: 'small-business', component: () => import('../pages/SmallBusinessPage.vue'), seoKey: 'smallBusiness' },
  { path: 'pricing', name: 'pricing', component: () => import('../pages/PricingPage.vue'), seoKey: 'pricing' },
  { path: 'services/ecommerce', name: 'service-ecommerce', component: () => import('../pages/ServiceDetailPage.vue'), seoKey: 'serviceEcommerce', serviceKey: 'ecommerce' },
  { path: 'services/booking-systems', name: 'service-booking', component: () => import('../pages/ServiceDetailPage.vue'), seoKey: 'serviceBooking', serviceKey: 'booking' },
  { path: 'services/business-website', name: 'service-business-website', component: () => import('../pages/ServiceDetailPage.vue'), seoKey: 'serviceBusinessWebsite', serviceKey: 'businessWebsite' },
  { path: 'services/bespoke-software', name: 'service-bespoke', component: () => import('../pages/ServiceDetailPage.vue'), seoKey: 'serviceBespoke', serviceKey: 'bespoke' },
  { path: 'contact', name: 'contact', component: () => import('../pages/ContactPage.vue'), seoKey: 'contact' },
  { path: 'cookie-policy', name: 'cookie-policy', component: () => import('../pages/CookiePolicyPage.vue'), seoKey: 'cookiePolicy' },
  { path: 'portfolio', name: 'portfolio', component: () => import('../pages/PortfolioPage.vue'), seoKey: 'portfolio' },
  { path: 'portfolio/:slug', name: 'portfolio-detail', component: () => import('../pages/PortfolioDetail.vue'), seoKey: 'portfolioDetail' },
] as const

export const routes: RouteRecordRaw[] = [
  ...pages.map((page) => ({
    path: `/${page.path}`,
    name: page.name,
    component: page.component,
    meta: {
      seoKey: page.seoKey,
      serviceKey: 'serviceKey' in page ? page.serviceKey : undefined,
      noindex: 'noindex' in page ? page.noindex : undefined,
    },
  }) as RouteRecordRaw),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: { seoKey: 'notFound' },
  },
]

export const scrollBehavior = (_to: unknown, _from: unknown, savedPosition: { top: number } | null) => {
  return savedPosition || { top: 0 }
}
