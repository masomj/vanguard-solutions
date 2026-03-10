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
        title: 'Vanguard Digital Solutions | Software Development & Tender Fulfillment',
        description: 'Vanguard Digital Solutions delivers expert software development, tender fulfillment, and digital consulting for government and enterprise clients.',
        ogTitle: 'Vanguard Digital Solutions',
        ogDescription: 'Expert software development for government and enterprise tenders.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: {
        title: 'About Us | Vanguard Digital Solutions',
        description: 'Learn about Vanguard Digital Solutions — our team, mission, and track record in tender fulfillment and software delivery.',
        ogTitle: 'About Vanguard Digital Solutions',
        ogDescription: 'Our mission and track record in government and enterprise software.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../pages/ServicesPage.vue'),
      meta: {
        title: 'Services | Vanguard Digital Solutions',
        description: 'Tender fulfillment, custom software development, and digital consulting services for government and enterprise clients.',
        ogTitle: 'Our Services',
        ogDescription: 'Tender fulfillment, custom software, and digital consulting.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../pages/ContactPage.vue'),
      meta: {
        title: 'Contact Us | Vanguard Digital Solutions',
        description: 'Get in touch with Vanguard Digital Solutions. Request a quote or discuss your next project.',
        ogTitle: 'Contact Vanguard Digital Solutions',
        ogDescription: 'Request a quote or discuss your project with our team.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
      meta: {
        title: '404 — Page Not Found | Vanguard Digital Solutions',
        description: '',
      },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
