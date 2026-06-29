<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('about.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('about.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="our-story">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <h2 id="our-story" class="text-3xl font-bold text-text mb-6">{{ t('about.storyHeading') }}</h2>
          <div class="space-y-4 text-text-light leading-relaxed">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
            <p>{{ t('about.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="values-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('about.valuesSubtitle')">
          {{ t('about.valuesHeading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="value in values" :key="value.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ value.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text mb-2">{{ value.title }}</h3>
            <p class="text-text-light text-sm leading-relaxed">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../components/shared/SectionHeading.vue'
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

const values = computed(() => [
  {
    icon: '🎯',
    title: t('about.value1Title'),
    description: t('about.value1Description'),
  },
  {
    icon: '🏆',
    title: t('about.value2Title'),
    description: t('about.value2Description'),
  },
  {
    icon: '🚀',
    title: t('about.value3Title'),
    description: t('about.value3Description'),
  },
  {
    icon: '🤝',
    title: t('about.value4Title'),
    description: t('about.value4Description'),
  },
  {
    icon: '🔒',
    title: t('about.value5Title'),
    description: t('about.value5Description'),
  },
  {
    icon: '📊',
    title: t('about.value6Title'),
    description: t('about.value6Description'),
  },
])

</script>
