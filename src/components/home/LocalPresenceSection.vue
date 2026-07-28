<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="local-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 id="local-heading" class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          {{ t('home.localPresence.heading') }}
        </h2>
        <p class="text-text-secondary text-lg leading-relaxed">
          {{ t('home.localPresence.description') }}
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div v-for="area in areas" :key="area" class="rounded-xl border border-border bg-surface py-4 px-3">
          <p class="text-sm font-semibold text-text-primary">{{ area }}</p>
        </div>
      </div>

      <div class="mt-12 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center max-w-2xl mx-auto">
        <p class="text-text-primary font-semibold text-lg mb-2">{{ t('home.localPresence.nearbyTitle') }}</p>
        <p class="text-text-secondary text-sm mb-6">
          {{ t('home.localPresence.nearbyDescription') }}
        </p>
        <BaseButton to="/contact" variant="primary">
          {{ t('home.localPresence.nearbyCta') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()

const areas = computed(() => [
  t('home.areas.a1'),
  t('home.areas.a2'),
  t('home.areas.a3'),
  t('home.areas.a4'),
  t('home.areas.a5'),
  t('home.areas.a6'),
  t('home.areas.a7'),
  t('home.areas.a8'),
  t('home.areas.a9'),
  t('home.areas.a10'),
  t('home.areas.a11'),
  t('home.areas.a12'),
])
</script>
