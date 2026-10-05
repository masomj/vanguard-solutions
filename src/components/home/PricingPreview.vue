<template>
  <section class="py-20 lg:py-28 bg-white border-y border-border" aria-labelledby="pricing-preview-heading">
    <div class="wrap">
      <div class="flex flex-wrap justify-between items-end gap-6 mb-12">
        <div class="max-w-2xl">
          <p class="label text-accent mb-4">{{ t('home.pricing.kicker') }}</p>
          <h2 id="pricing-preview-heading" class="text-[clamp(2rem,10.5vw,3rem)] sm:text-6xl mb-5">{{ t('home.pricing.heading') }}</h2>
          <p class="text-ink-soft m-0">{{ t('home.pricing.body') }}</p>
        </div>
        <router-link to="/pricing" class="font-semibold text-ink">{{ t('home.pricing.link') }}</router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 border-t-2 border-ink">
        <div
          v-for="(tier, index) in tiers"
          :key="tier.name"
          class="tier relative pt-8 pb-10"
          :class="{ 'tier--ruled': index > 0, 'tier--featured': !!tier.flag }"
        >
          <span
            v-if="tier.flag"
            class="absolute -top-3.5 bg-signal text-ink font-mono text-[0.6875rem] font-medium uppercase px-2.5 py-1 flag"
          >{{ tier.flag }}</span>
          <h3 class="label text-text-secondary font-normal m-0">{{ tier.name }}</h3>
          <p class="display text-5xl mt-3 mb-1">{{ tier.price }}</p>
          <p class="font-mono text-xs text-text-secondary uppercase mb-6">{{ tier.meta }}</p>
          <p class="text-ink-soft m-0">{{ tier.body }}</p>
        </div>
      </div>

      <p class="font-mono text-[0.8125rem] text-text-secondary mt-10 pt-5 border-t border-border mb-0">
        {{ t('home.pricing.careNote') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const tiers = computed(() => tm('home.pricing.tiers') as { name: string; price: string; meta: string; body: string; flag?: string }[])
</script>

<style scoped>
.tier h3 {
  font-stretch: 100%;
  letter-spacing: 0.02em;
  line-height: 1.4;
}
.tier--ruled {
  border-top: 1px solid var(--color-border);
}
.tier--featured {
  background: var(--color-paper);
  padding-inline: 1.25rem;
}
.flag {
  left: 1.25rem;
}
@media (min-width: 768px) {
  .tier {
    padding-inline: 2rem;
  }
  .tier:first-child {
    padding-left: 0;
  }
  .tier--ruled {
    border-top: 0;
    border-left: 1px solid var(--color-border);
  }
  .tier--featured {
    padding-inline: 2rem;
  }
  .flag {
    left: 2rem;
  }
}
</style>
