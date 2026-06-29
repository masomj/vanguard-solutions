<template>
  <section class="py-24 sm:py-32 text-center">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-6xl font-bold text-primary mb-4">404</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">{{ t('notFound.title') }}</h1>
      <p class="text-lg text-text-light mb-8">
        {{ t('notFound.message') }}
      </p>
      <BaseButton to="/" variant="primary" size="lg">
        {{ t('notFound.backHome') }}
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'

const { t } = useI18n()
</script>