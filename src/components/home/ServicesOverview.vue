<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="Affordable, professional web design and digital services for small businesses across South Wales.">
        What We Build
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="service in services" :key="service.title"
          class="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-3">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
            {{ service.icon }}
          </div>
          <h3 class="text-lg font-semibold text-text">{{ service.title }}</h3>
          <p class="text-sm text-text-light leading-relaxed flex-1">{{ service.description }}</p>
        </article>
      </div>

      <div class="mt-12 text-center">
        <BaseButton to="/services" variant="primary">
          Explore All Services
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'
import BaseButton from '../shared/BaseButton.vue'

const services = [
  {
    icon: '🎨',
    title: 'Small Business Websites',
    description: 'Clean, professional websites for local businesses — hair salons, trades, consultants, and more. Mobile-friendly, fast, and built to impress.',
  },
  {
    icon: '🛒',
    title: 'eCommerce Stores',
    description: 'Sell your products online. We build fully-featured eCommerce stores for small businesses, with secure checkout, product management, and payment integration.',
  },
  {
    icon: '📅',
    title: 'Booking & Appointment Sites',
    description: 'Let customers book online 24/7. Integrations with Booksy, Square, and custom booking systems — perfect for salons, clinics, and service businesses.',
  },
  {
    icon: '📋',
    title: 'Business Information Sites',
    description: 'Tell your story online. Information sites built for local tradespeople, restaurants, solicitors, and professional services — built for Google too.',
  },
  {
    icon: '⚙️',
    title: 'Bespoke Web Applications',
    description: 'Need something custom? We build complex web applications, internal tools, dashboards, and client portals tailored precisely to your requirements.',
  },
  {
    icon: '🔗',
    title: 'Integrations & Automation',
    description: 'Connect your website with the tools you already use — Booksy, Square, payment gateways, CRMs, and APIs to streamline your business.',
  },
]
</script>
