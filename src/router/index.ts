import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      seoKey: 'home',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: {
      seoKey: 'about',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../pages/ServicesPage.vue'),
    meta: {
      seoKey: 'services',
    },
  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('../pages/TechnologyPage.vue'),
    meta: {
      seoKey: 'technology',
    },
  },
  {
    path: '/process',
    name: 'process',
    component: () => import('../pages/ProcessPage.vue'),
    meta: {
      seoKey: 'process',
    },
  },
  {
    path: '/small-business',
    name: 'small-business',
    component: () => import('../pages/SmallBusinessPage.vue'),
    meta: {
      seoKey: 'smallBusiness',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
    meta: {
      seoKey: 'contact',
    },
  },
  {
    path: '/cookie-policy',
    name: 'cookie-policy',
    component: () => import('../pages/CookiePolicyPage.vue'),
    meta: {
      seoKey: 'cookiePolicy',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: {
      seoKey: 'notFound',
    },
  },
]

export const scrollBehavior = (_to: unknown, _from: unknown, savedPosition: { top: number } | null) => {
  return savedPosition || { top: 0 }
}
