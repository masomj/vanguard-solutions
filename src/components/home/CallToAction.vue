<template>
  <section class="py-16 lg:py-24 bg-primary" aria-labelledby="cta-heading">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 id="cta-heading" class="text-3xl sm:text-4xl font-bold text-white mb-4">
        {{ t('home.cta.heading') }}
      </h2>
      <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
        {{ t('home.cta.description') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton variant="accent" size="lg" to="/contact">
          {{ t('home.cta.primary') }}
        </BaseButton>
        <BaseButton size="lg" to="/services" class="bg-white/10 hover:bg-white/20 text-white border-white/30">
          {{ t('home.cta.secondary') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()
</script>
