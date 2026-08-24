<template>
  <section class="py-16 lg:py-24 bg-surface" aria-labelledby="tech-stack-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading heading-id="tech-stack-heading" :subtitle="t('home.techStack.subtitle')">
        {{ t('home.techStack.heading') }}
      </SectionHeading>

      <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="tech in technologies" :key="tech.label"
          class="flex flex-col items-center text-center gap-2 rounded-lg border border-border bg-white p-4">
          <span class="text-2xl" aria-hidden="true">{{ tech.icon }}</span>
          <span class="text-sm font-semibold text-text-primary">{{ tech.label }}</span>
        </div>
      </div>

      <div class="mt-12 max-w-3xl mx-auto text-center">
        <p class="text-text-secondary leading-relaxed mb-6">
          {{ t('home.techStack.description') }}
        </p>
        <BaseButton to="/technology" variant="secondary">
          {{ t('home.techStack.learnMore') }}
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

const technologies = computed(() => [
  {
    icon: '⚡',
    label: t('home.techStack.tech1'),
  },
  {
    icon: '🚀',
    label: t('home.techStack.tech2'),
  },
  {
    icon: '📘',
    label: t('home.techStack.tech3'),
  },
  {
    icon: '🎨',
    label: t('home.techStack.tech4'),
  },
  {
    icon: '🟢',
    label: t('home.techStack.tech5'),
  },
  {
    icon: '🔷',
    label: t('home.techStack.tech6'),
  },
  {
    icon: '🗄️',
    label: t('home.techStack.tech7'),
  },
  {
    icon: '🔗',
    label: t('home.techStack.tech8'),
  },
  {
    icon: '☁️',
    label: t('home.techStack.tech9'),
  },
  {
    icon: '🐳',
    label: t('home.techStack.tech10'),
  },
  {
    icon: '⚙️',
    label: t('home.techStack.tech11'),
  },
  {
    icon: '♿',
    label: t('home.techStack.tech12'),
  },
])
</script>
