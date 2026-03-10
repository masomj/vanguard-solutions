<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="Practical software development tailored to your goals, systems, and delivery timelines.">
        What We Do
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
        <article class="lg:col-span-3 rounded-2xl bg-primary text-white p-8 lg:p-10">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            <span aria-hidden="true">&#9679;</span>
            Core Service
          </div>
          <h3 class="mt-4 text-2xl sm:text-3xl font-bold leading-tight">Custom Software Development</h3>
          <p class="mt-4 text-white/85 leading-relaxed max-w-2xl">
            We design and build bespoke web applications, internal tools, and digital platforms that are secure,
            scalable, and maintainable from day one.
          </p>
          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div v-for="item in highlights" :key="item" class="rounded-lg bg-white/10 border border-white/15 px-4 py-3">
              {{ item }}
            </div>
          </div>
        </article>

        <aside class="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 lg:p-8">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-text-light">Built For Outcomes</h4>
          <ul class="mt-4 space-y-3">
            <li v-for="pillar in deliveryPillars" :key="pillar.title" class="rounded-lg bg-white border border-border px-4 py-3">
              <p class="font-semibold text-text text-sm">{{ pillar.title }}</p>
              <p class="text-text-light text-sm mt-1">{{ pillar.description }}</p>
            </li>
          </ul>
        </aside>
      </div>

      <div class="mt-12 text-center">
        <BaseButton to="/services" variant="primary">
          Explore Service Details
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'
import BaseButton from '../shared/BaseButton.vue'

const highlights = [
  'Web applications and client portals',
  'Internal business systems and dashboards',
  'API and backend service development',
  'Database design and optimisation',
]

const deliveryPillars = [
  {
    title: 'Reliable Architecture',
    description: 'Solutions designed for long-term performance and growth.',
  },
  {
    title: 'Secure by Design',
    description: 'Security controls and best practices integrated throughout development.',
  },
  {
    title: 'Clear Delivery Process',
    description: 'Transparent milestones and practical communication from kickoff to launch.',
  },
]
</script>
