<template>
  <section class="py-16 lg:py-20 bg-surface" aria-labelledby="testimonials-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading :subtitle="t('home.testimonials.subtitle')">
        {{ t('home.testimonials.heading') }}
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <blockquote v-for="item in testimonials" :key="item.name"
          class="rounded-2xl border border-border bg-white p-6 flex flex-col gap-4">
          <div class="flex gap-1 text-amber-400" :aria-label="t('home.testimonials.starsAria')">
            <span v-for="n in 5" :key="n" aria-hidden="true">★</span>
          </div>
          <p class="text-text-light text-sm leading-relaxed flex-1">&ldquo;{{ item.quote }}&rdquo;</p>
          <footer class="mt-2">
            <p class="font-semibold text-text text-sm">{{ item.name }}</p>
            <p class="text-text-light text-xs">{{ item.business }}</p>
          </footer>
        </blockquote>
      </div>

      <p class="mt-8 text-center text-text-light text-sm">
        {{ t('home.testimonials.moreReviews') }} <a href="/contact" class="text-primary underline underline-offset-2">{{ t('home.testimonials.becomeClient') }}</a>.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../shared/SectionHeading.vue'

const { t } = useI18n()

const testimonials = computed(() => [
  {
    quote: t('home.testimonials.quote1'),
    name: t('home.testimonials.name1'),
    business: t('home.testimonials.business1'),
  },
  {
    quote: t('home.testimonials.quote2'),
    name: t('home.testimonials.name2'),
    business: t('home.testimonials.business2'),
  },
  {
    quote: t('home.testimonials.quote3'),
    name: t('home.testimonials.name3'),
    business: t('home.testimonials.business3'),
  },
])
</script>
