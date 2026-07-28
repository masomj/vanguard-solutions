<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="process-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading :subtitle="t('home.process.subtitle')">
        {{ t('home.process.heading') }}
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <article v-for="step in steps" :key="step.number" class="bg-surface rounded-lg p-6 border border-border">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mb-4" aria-hidden="true">
            {{ step.number }}
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">{{ step.title }}</h3>
          <p class="text-text-secondary text-sm leading-relaxed">{{ step.description }}</p>
        </article>
      </div>

      <div class="mt-12 max-w-3xl mx-auto text-center">
        <p class="text-text-secondary leading-relaxed mb-6">
          {{ t('home.process.description') }}
        </p>
        <BaseButton to="/process" variant="secondary">
          {{ t('home.process.learnMore') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../shared/SectionHeading.vue'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()

const steps = computed(() => [
  {
    number: 1,
    title: t('home.process.step1Title'),
    description: t('home.process.step1Description'),
  },
  {
    number: 2,
    title: t('home.process.step2Title'),
    description: t('home.process.step2Description'),
  },
  {
    number: 3,
    title: t('home.process.step3Title'),
    description: t('home.process.step3Description'),
  },
  {
    number: 4,
    title: t('home.process.step4Title'),
    description: t('home.process.step4Description'),
  },
  {
    number: 5,
    title: t('home.process.step5Title'),
    description: t('home.process.step5Description'),
  },
])
</script>
