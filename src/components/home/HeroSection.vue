<template>
  <section class="pt-16 pb-14 sm:pt-24 sm:pb-16" aria-labelledby="hero-heading">
    <div class="wrap">
      <div class="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-14 lg:gap-16 items-end">
        <div>
          <p class="label text-text-secondary mb-7">{{ t('home.hero.kicker') }}</p>
          <h1 id="hero-heading" class="display text-[3.25rem] sm:text-7xl xl:text-8xl m-0">
            {{ t('home.hero.title') }}
          </h1>
          <p class="mt-9 text-xl leading-relaxed text-ink-soft max-w-[38rem]">
            {{ t('home.hero.description') }}
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BaseButton variant="signal" size="lg" to="/contact" arrow>
              {{ t('home.hero.ctaPrimary') }}
            </BaseButton>
            <router-link to="/pricing" class="font-semibold text-ink text-[1.0625rem] py-3">
              {{ t('home.hero.ctaSecondary') }}
            </router-link>
          </div>
        </div>

        <QuoteSheet />
      </div>

      <dl class="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t-2 border-ink m-0">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat py-5 pr-4"
          :class="{ 'stat--ruled': index > 0, 'stat--odd': index % 2 === 1 }"
        >
          <dt class="label text-text-secondary text-xs">{{ stat.label }}</dt>
          <dd class="display text-4xl m-0 mb-1">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../shared/BaseButton.vue'
import QuoteSheet from './QuoteSheet.vue'

const { t, tm } = useI18n()

const stats = computed(() => tm('home.hero.stats') as { value: string; label: string }[])
</script>

<style scoped>
/* Figure above its label visually; the dt stays first for screen readers. */
.stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}
.stat--odd {
  padding-left: 1.25rem;
  border-left: 1px solid var(--color-border);
}
@media (min-width: 1024px) {
  .stat--ruled {
    padding-left: 1.25rem;
    border-left: 1px solid var(--color-border);
  }
}
</style>
