<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="mb-4 text-sm text-white/60" :aria-label="t('nav.breadcrumb')">
          <router-link :to="localePath('/')" class="text-white/70 hover:text-white no-underline">{{ t('nav.home') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <router-link :to="localePath('/services')" class="text-white/70 hover:text-white no-underline">{{ t('nav.services') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <span class="text-white/90">{{ c('navLabel') }}</span>
        </nav>
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">{{ c('kicker') }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ c('title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">{{ c('subtitle') }}</p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" :aria-label="c('title')">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-6 text-text-secondary leading-relaxed text-lg">
          <p>{{ c('intro.p1') }}</p>
          <p>{{ c('intro.p2') }}</p>
          <p>{{ c('intro.p3') }}</p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="included-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="included-heading" :subtitle="c('included.subtitle')">
          {{ c('included.heading') }}
        </SectionHeading>
        <ul class="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
          <li v-for="feature in features" :key="feature" class="flex items-start gap-3 bg-white rounded-lg border border-border p-4">
            <span class="text-primary font-bold shrink-0" aria-hidden="true">&check;</span>
            <span class="text-text-secondary text-sm leading-relaxed">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="who-for-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="who-for-heading" :subtitle="c('whoFor.subtitle')">
          {{ c('whoFor.heading') }}
        </SectionHeading>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article v-for="item in whoFor" :key="item.title" class="bg-surface rounded-lg p-6 border border-border">
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="service-pricing-heading">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="service-pricing-heading" class="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
          {{ c('pricing.heading') }}
        </h2>
        <p class="text-text-secondary leading-relaxed text-lg">{{ c('pricing.body') }}</p>
        <div class="mt-8">
          <BaseButton variant="secondary" :to="pricingCtaTo">{{ c('pricing.cta') }}</BaseButton>
        </div>
      </div>
    </section>

    <FaqSection
      :items="faqItems"
      :heading="c('faq.heading')"
      :subtitle="c('faq.subtitle')"
      heading-id="service-faq-heading"
      background="bg-white"
    />

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="service-related-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="service-related-heading">{{ c('relatedHeading') }}</SectionHeading>
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="bg-white rounded-lg p-6 border border-border hover:border-primary transition-colors no-underline"
          >
            <h3 class="text-base font-semibold text-text-primary">{{ link.label }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../components/shared/SectionHeading.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { useLocale } from '../composables/useLocale'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const route = useRoute()
const { t } = useI18n()
const { localePath } = useLocale()

/** Which `serviceDetail.*` subtree this route renders. Set in the router. */
const serviceKey = computed(() => route.meta.serviceKey as string)

/** Short helper so the template reads `c('intro.p1')` rather than the full path. */
function c(suffix: string): string {
  return t(`serviceDetail.${serviceKey.value}.${suffix}`)
}

const features = computed(() => [1, 2, 3, 4, 5, 6, 7, 8].map((n) => c(`included.f${n}`)))

const whoFor = computed(() =>
  [1, 2, 3, 4].map((n) => ({
    title: c(`whoFor.item${n}Title`),
    description: c(`whoFor.item${n}Description`),
  }))
)

const faqItems = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({
    question: c(`faq.q${n}.question`),
    answer: c(`faq.q${n}.answer`),
  }))
)

// Bespoke work is quote-only, so its CTA goes to contact rather than a price list.
const pricingCtaTo = computed(() => (serviceKey.value === 'bespoke' ? '/contact' : '/pricing'))

const siblings = [
  { key: 'ecommerce', to: '/services/ecommerce' },
  { key: 'booking', to: '/services/booking-systems' },
  { key: 'businessWebsite', to: '/services/business-website' },
  { key: 'bespoke', to: '/services/bespoke-software' },
]

const relatedLinks = computed(() => [
  ...siblings
    .filter((s) => s.key !== serviceKey.value)
    .map((s) => ({ to: localePath(s.to), label: t(`serviceDetail.${s.key}.navLabel`) })),
  { to: localePath('/small-business'), label: t('nav.smallBusiness') },
  { to: localePath('/pricing'), label: t('nav.pricing') },
  { to: localePath('/process'), label: t('nav.process') },
].slice(0, 4))

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
