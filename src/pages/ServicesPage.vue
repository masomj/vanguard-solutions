<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          Comprehensive software solutions for businesses and organisations.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-list">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0" aria-hidden="true">
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <div>
                <h2 id="services-list" class="text-2xl sm:text-3xl font-bold text-text">{{ service.title }}</h2>
                <p class="mt-3 text-text-light leading-relaxed max-w-3xl">{{ service.description }}</p>
              </div>
            </div>

            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="feature in service.features" :key="feature" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-light">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ feature }}
              </div>
            </div>

            <div class="mt-10 border-t border-border pt-8">
              <h3 class="text-lg font-semibold text-text">How We Approach Delivery</h3>
              <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="item in deliveryApproach" :key="item.title" class="rounded-lg border border-border bg-white px-4 py-4">
                  <p class="font-semibold text-text text-sm">{{ item.title }}</p>
                  <p class="mt-1 text-text-light text-sm leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import CallToAction from '../components/home/CallToAction.vue'

const service = {
  icon: '💻',
  title: 'Custom Software Development',
  description: 'Bespoke applications built to your requirements, with a strong focus on reliability, security, and maintainability.',
  features: [
    'Web applications and client portals',
    'Internal business systems and workflow tools',
    'API and backend service development',
    'Database design and performance optimisation',
    'Automated testing and CI/CD pipelines',
    'Mobile-responsive user interfaces',
  ],
}

const deliveryApproach = [
  {
    title: 'Discovery and Scoping',
    description: 'We define business goals, technical requirements, and delivery milestones before development begins.',
  },
  {
    title: 'Build and Iterate',
    description: 'Incremental delivery with regular demos, feedback loops, and quality checks throughout the build.',
  },
  {
    title: 'Launch and Improve',
    description: 'A production-ready release process with post-launch refinements based on real usage insights.',
  },
]
</script>
