import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Web Designer Bridgend | Small Business Websites South Wales | Vanguard Digital Solutions',
        description: 'Vanguard Digital Solutions — web design and development in Bridgend, South Wales. Small business websites, eCommerce, booking sites, and bespoke web applications. Local SEO included.',
        ogTitle: 'Web Designer Bridgend | Vanguard Digital Solutions',
        ogDescription: 'Affordable web design for small businesses in Bridgend and South Wales. eCommerce, booking sites, information sites and bespoke apps.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: {
        title: 'About Us | Web Design Bridgend South Wales | Vanguard Digital Solutions',
        description: 'Vanguard Digital Solutions is a web design and software development company based in Bridgend, South Wales. Learn about our approach to building websites for local businesses.',
        ogTitle: 'About Vanguard Digital Solutions — Web Design Bridgend',
        ogDescription: 'Local web design company in Bridgend, South Wales. Building websites and web apps for businesses across Cardiff, Swansea, Newport and beyond.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../pages/ServicesPage.vue'),
      meta: {
        title: 'Web Design Services | eCommerce, Booking Sites & Bespoke Apps | Vanguard Digital Solutions',
        description: 'Web design services for South Wales businesses — small business websites, eCommerce stores, booking systems with Booksy & Square, information sites, and bespoke web applications.',
        ogTitle: 'Web Design Services — Bridgend & South Wales',
        ogDescription: 'Small business websites, eCommerce, booking sites with Booksy/Square integration, brochure sites, and bespoke web applications. Based in Bridgend, South Wales.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../pages/ContactPage.vue'),
      meta: {
        title: 'Contact Us | Get a Free Quote | Vanguard Digital Solutions Bridgend',
        description: 'Get in touch with Vanguard Digital Solutions in Bridgend, South Wales. Request a free, no-obligation quote for your website or web project.',
        ogTitle: 'Contact Vanguard Digital Solutions',
        ogDescription: 'Request a free quote for web design in Bridgend or South Wales. No jargon — just honest advice for your business.',
      },
    },
    {
      path: '/cookie-policy',
      name: 'cookie-policy',
      component: () => import('../pages/CookiePolicyPage.vue'),
      meta: {
        title: 'Cookie Policy | Vanguard Digital Solutions',
        description: 'Learn about how Vanguard Digital Solutions uses cookies and manage your cookie preferences.',
        ogTitle: 'Cookie Policy',
        ogDescription: 'Our cookie policy and your privacy choices.',
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
