<template>
  <footer class="bg-primary-dark text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-8 h-8 text-accent" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="6" fill="currentColor" />
              <path d="M8 10l8 12 8-12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
            <span class="font-bold text-lg">Vanguard Digital Solutions</span>
          </div>
          <p class="text-white/70 text-sm leading-relaxed">
            Delivering innovative software solutions for government and enterprise tenders.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Quick Links</h3>
          <ul class="list-none m-0 p-0 space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link :to="link.to" class="text-white/70 hover:text-white transition-colors no-underline text-sm">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Services</h3>
          <ul class="list-none m-0 p-0 space-y-2">
            <li v-for="service in services" :key="service">
              <router-link to="/services" class="text-white/70 hover:text-white transition-colors no-underline text-sm">
                {{ service }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Contact</h3>
          <ul class="list-none m-0 p-0 space-y-3">
            <li class="flex items-start gap-2 text-sm text-white/70">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@vanguarddigital.co.za" class="text-white/70 hover:text-white transition-colors no-underline">
                info@vanguarddigital.co.za
              </a>
            </li>
            <li class="flex items-start gap-2 text-sm text-white/70">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+27123456789" class="text-white/70 hover:text-white transition-colors no-underline">
                +27 12 345 6789
              </a>
            </li>
            <li class="flex items-start gap-2 text-sm text-white/70">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Pretoria, Gauteng, South Africa</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
        <p>&copy; {{ currentYear }} Vanguard Digital Solutions. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
]

const services = [
  'Tender Fulfillment',
  'Custom Software Development',
  'Systems Integration',
  'Maintenance & Support',
]
</script>
