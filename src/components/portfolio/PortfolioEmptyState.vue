<template>
  <div class="max-w-xl mx-auto text-center py-8">
    <h2 class="text-2xl font-semibold text-text-primary mb-3">{{ t('portfolio.empty.heading') }}</h2>
    <p class="text-text-secondary leading-relaxed">{{ t('portfolio.empty.body') }}</p>
    <div class="mt-8">
      <BaseButton to="/contact">{{ t('portfolio.empty.cta') }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()
</script>
