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
        description: 'Vanguard Digital Solutions delivers expert custom software development for businesses and organisations.',
        ogTitle: 'Vanguard Digital Solutions',
        ogDescription: 'Expert custom software development services.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: {
        title: 'About Us | Vanguard Digital Solutions',
        description: 'Learn about Vanguard Digital Solutions, our mission, and our software delivery approach from South Wales.',
        ogTitle: 'About Vanguard Digital Solutions',
        ogDescription: 'Our mission and software delivery expertise from South Wales.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../pages/ServicesPage.vue'),
      meta: {
        title: 'Services | Vanguard Digital Solutions',
        description: 'Custom software development services for businesses and organisations.',
        ogTitle: 'Our Services',
        ogDescription: 'Custom software development services.',
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
        ogDescription: 'Request a quote or discuss your software project.',
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
