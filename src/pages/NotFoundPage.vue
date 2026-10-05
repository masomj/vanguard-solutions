<template>
  <section class="py-24 sm:py-32" aria-labelledby="not-found-heading">
    <div class="wrap">
      <p class="display text-[7rem] sm:text-[11rem] leading-none text-signal m-0" aria-hidden="true">404</p>
      <h1 id="not-found-heading" class="display text-[clamp(2rem,10.5vw,3rem)] sm:text-6xl mt-6 mb-6">{{ t('notFound.title') }}</h1>
      <p class="text-xl text-ink-soft mt-0 mb-10 max-w-xl">{{ t('notFound.message') }}</p>
      <div class="flex flex-wrap gap-x-6 gap-y-4 items-center">
        <BaseButton to="/" size="lg">{{ t('notFound.backHome') }}</BaseButton>
        <router-link to="/services" class="font-semibold text-ink">{{ t('nav.services') }}</router-link>
        <router-link to="/pricing" class="font-semibold text-ink">{{ t('nav.pricing') }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'

const { t } = useI18n()
</script>
