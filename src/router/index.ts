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
        title: 'Vanguard Digital Solutions | Custom Software Development',
        description: 'Vanguard Digital Solutions delivers expert custom software development, systems integration, and digital consulting for businesses and organisations.',
        ogTitle: 'Vanguard Digital Solutions',
        ogDescription: 'Expert custom software development and digital consulting.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: {
        title: 'About Us | Vanguard Digital Solutions',
        description: 'Learn about Vanguard Digital Solutions — our team, mission, and track record in software delivery.',
        ogTitle: 'About Vanguard Digital Solutions',
        ogDescription: 'Our mission and track record in software development.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../pages/ServicesPage.vue'),
      meta: {
        title: 'Services | Vanguard Digital Solutions',
        description: 'Custom software development, systems integration, and digital consulting services for businesses and organisations.',
        ogTitle: 'Our Services',
        ogDescription: 'Custom software development, systems integration, and consulting.',
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
