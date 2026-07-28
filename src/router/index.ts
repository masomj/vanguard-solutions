import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { defaultLocale, localePrefixes, supportedLocales, type AppLocale } from '../i18n/locales'

/** One entry per page, locale-agnostic. Paths are relative (no leading slash). */
const pages = [
  { path: '', name: 'home', component: HomePage, seoKey: 'home' },
  { path: 'about', name: 'about', component: () => import('../pages/AboutPage.vue'), seoKey: 'about' },
  { path: 'services', name: 'services', component: () => import('../pages/ServicesPage.vue'), seoKey: 'services' },
  { path: 'technology', name: 'technology', component: () => import('../pages/TechnologyPage.vue'), seoKey: 'technology' },
  { path: 'process', name: 'process', component: () => import('../pages/ProcessPage.vue'), seoKey: 'process' },
  { path: 'small-business', name: 'small-business', component: () => import('../pages/SmallBusinessPage.vue'), seoKey: 'smallBusiness' },
  { path: 'contact', name: 'contact', component: () => import('../pages/ContactPage.vue'), seoKey: 'contact' },
  { path: 'cookie-policy', name: 'cookie-policy', component: () => import('../pages/CookiePolicyPage.vue'), seoKey: 'cookiePolicy' },
] as const

/** Route names are prefixed for non-default locales so they stay unique. */
export function routeName(name: string, locale: AppLocale): string {
  return locale === defaultLocale ? name : `${locale}-${name}`
}

function buildLocaleRoutes(locale: AppLocale): RouteRecordRaw[] {
  const prefix = localePrefixes[locale]

  return pages.map((page) => {
    const path = `${prefix}/${page.path}`.replace(/\/+$/, '') || '/'

    return {
      path,
      name: routeName(page.name, locale),
      component: page.component,
      meta: { seoKey: page.seoKey, locale },
    } as RouteRecordRaw
  })
}

function buildNotFoundRoutes(): RouteRecordRaw[] {
  const notFound = () => import('../pages/NotFoundPage.vue')

  // Prefixed catch-alls come first, so an unknown /cy/* path renders a Welsh
  // 404 rather than falling through to the English one.
  const prefixed = supportedLocales
    .filter((locale) => localePrefixes[locale])
    .map((locale) => ({
      path: `${localePrefixes[locale]}/:pathMatch(.*)*`,
      name: routeName('not-found', locale),
      component: notFound,
      meta: { seoKey: 'notFound', locale },
    } as RouteRecordRaw))

  return [
    ...prefixed,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: notFound,
      meta: { seoKey: 'notFound', locale: defaultLocale },
    },
  ]
}

export const routes: RouteRecordRaw[] = [
  ...supportedLocales.flatMap(buildLocaleRoutes),
  ...buildNotFoundRoutes(),
]

export const scrollBehavior = (_to: unknown, _from: unknown, savedPosition: { top: number } | null) => {
  return savedPosition || { top: 0 }
}
