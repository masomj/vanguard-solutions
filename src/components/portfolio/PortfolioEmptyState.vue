<template>
  <div class="border-t-2 border-ink pt-8 max-w-2xl">
    <h2 class="text-3xl mt-0 mb-3">{{ t('portfolio.empty.heading') }}</h2>
    <p class="text-ink-soft mt-0 mb-8">{{ t('portfolio.empty.body') }}</p>
    <BaseButton to="/contact">{{ t('portfolio.empty.cta') }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()
</script>
