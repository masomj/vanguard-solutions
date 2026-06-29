import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
