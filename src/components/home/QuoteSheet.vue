<template>
  <figure class="quote-sheet m-0 p-6 sm:p-7" :aria-labelledby="captionId">
    <figcaption :id="captionId" class="flex justify-between gap-4 label text-xs text-text-secondary pb-3.5 border-b-2 border-ink">
      <span>{{ t('home.hero.quote.label') }}</span>
      <span>{{ t('home.hero.quote.product') }}</span>
    </figcaption>
    <dl class="font-mono text-sm m-0">
      <div
        v-for="(line, index) in lines"
        :key="line.item"
        class="flex justify-between gap-4 py-3"
        :class="index === lines.length - 1 ? 'border-b-2 border-ink' : 'border-b border-dashed border-border'"
      >
        <dt>{{ line.item }}</dt>
        <dd class="m-0 text-right whitespace-nowrap">{{ line.value }}</dd>
      </div>
      <div class="flex justify-between items-baseline gap-4 pt-4">
        <dt class="label text-xs text-text-secondary">{{ t('home.hero.quote.totalLabel') }}</dt>
        <dd class="display font-sans text-5xl m-0">{{ t('home.hero.quote.total') }}</dd>
      </div>
    </dl>
    <p class="font-mono text-xs text-text-secondary mt-1 mb-0">{{ t('home.hero.quote.buildTime') }}</p>
  </figure>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * The "printed quote" that carries the published Starter price. Every line
 * mirrors something the Starter package really includes (see pricing.starter),
 * so keep the two in step if either changes.
 */
const { t, tm } = useI18n()
const captionId = `quote-${useId()}`

const lines = computed(() => tm('home.hero.quote.lines') as { item: string; value: string }[])
</script>
