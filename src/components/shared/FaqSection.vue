<template>
  <section class="py-16 lg:py-24" :class="background" :aria-labelledby="headingId">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading :heading-id="headingId" :subtitle="subtitle">
        {{ heading }}
      </SectionHeading>

      <div class="mt-12 max-w-3xl mx-auto space-y-4">
        <details
          v-for="item in items"
          :key="item.question"
          class="border border-border rounded-lg bg-white p-4 sm:p-6"
        >
          <!-- The question is a real heading so it appears in the document
               outline, not just as a disclosure label. -->
          <summary class="cursor-pointer">
            <h3 class="inline font-semibold text-text-primary">{{ item.question }}</h3>
          </summary>
          <p class="mt-3 text-text-secondary text-sm leading-relaxed">{{ item.answer }}</p>
        </details>
      </div>

      <p v-if="ctaText" class="mt-10 text-center text-text-secondary">
        <router-link :to="localePath('/contact')" class="text-primary font-semibold hover:text-primary-light">
          {{ ctaText }}
        </router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

withDefaults(defineProps<{
  items: { question: string; answer: string }[]
  heading: string
  headingId: string
  subtitle?: string
  ctaText?: string
  background?: string
}>(), {
  background: 'bg-surface',
})

const { localePath } = useLocale()
</script>
