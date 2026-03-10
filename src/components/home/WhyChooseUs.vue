<template>
  <section class="py-16 lg:py-24 bg-surface" aria-labelledby="why-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="Here's why organisations trust us with their most critical projects.">
        Why Choose Vanguard
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <article v-for="item in reasons" :key="item.title" class="text-center">
          <div class="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.iconPath" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text mb-2">{{ item.title }}</h3>
          <p class="text-text-light text-sm leading-relaxed">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'

const reasons = [
  {
    title: 'Quality First',
    description: 'Rigorous quality assurance, code review processes, and industry best practices on every project.',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Technical Excellence',
    description: 'Modern tech stack, secure coding practices, and scalable architectures that stand the test of time.',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Collaborative Delivery',
    description: 'Transparent communication, iterative milestones, and a practical build process aligned with your goals.',
    iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
]
</script>
