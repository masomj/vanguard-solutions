<template>
  <section class="py-24 lg:py-32 bg-signal text-ink" aria-labelledby="cta-heading">
    <div class="wrap">
      <h2 id="cta-heading" class="display text-6xl sm:text-8xl xl:text-[7rem] mb-8 max-w-5xl">
        {{ heading ?? t('home.cta.heading') }}
      </h2>
      <div class="flex flex-wrap gap-10 items-end justify-between">
        <p class="text-xl m-0 max-w-xl">{{ description ?? t('home.cta.description') }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-4 items-center">
          <BaseButton size="lg" to="/contact">{{ t('home.cta.primary') }}</BaseButton>
          <a href="mailto:enquiries@vanguarddigitalsolutions.co.uk" class="font-mono text-sm text-ink break-all">
            enquiries@vanguarddigitalsolutions.co.uk
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'

/** Closing band used across the site. Pages may override the wording. */
defineProps<{
  heading?: string
  description?: string
}>()

const { t } = useI18n()
</script>
