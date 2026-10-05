<template>
  <div>
    <PageHero
      :kicker="c('kicker')"
      :title="c('title')"
      :subtitle="c('subtitle')"
      :crumbs="[{ to: '/', label: t('nav.home') }, { to: '/services', label: t('nav.services') }]"
    />

    <section class="py-20 lg:py-24" :aria-label="c('title')">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-16">
        <aside class="lg:pt-2">
          <div class="quote-sheet p-6">
            <p class="label text-xs text-text-secondary mt-0 mb-2">{{ c('pricing.heading') }}</p>
            <p class="display text-4xl mt-0 mb-3">{{ priceFigure }}</p>
            <p class="text-[0.9375rem] text-ink-soft mt-0 mb-5">{{ c('pricing.body') }}</p>
            <BaseButton :to="pricingCtaTo" size="sm" variant="secondary">{{ c('pricing.cta') }}</BaseButton>
          </div>
        </aside>
        <div class="prose-vds text-lg max-w-3xl">
          <p>{{ c('intro.p1') }}</p>
          <p>{{ c('intro.p2') }}</p>
          <p>{{ c('intro.p3') }}</p>
        </div>
      </div>
    </section>

    <PageSection
      kicker="01"
      heading-id="included-heading"
      :heading="c('included.heading')"
      :subtitle="c('included.subtitle')"
      tone="white"
    >
      <RuledList :items="features" />
    </PageSection>

    <PageSection
      kicker="02"
      heading-id="who-for-heading"
      :heading="c('whoFor.heading')"
      :subtitle="c('whoFor.subtitle')"
    >
      <RuledGrid :items="whoFor" :columns="4" numbered />
    </PageSection>

    <FaqSection
      :items="faqItems"
      kicker="03"
      :heading="c('faq.heading')"
      :subtitle="c('faq.subtitle')"
      heading-id="service-faq-heading"
    />

    <PageSection heading-id="service-related-heading" :heading="c('relatedHeading')">
      <LinkRows :links="relatedLinks" />
    </PageSection>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import PageSection from '../components/shared/PageSection.vue'
import RuledList from '../components/shared/RuledList.vue'
import RuledGrid from '../components/shared/RuledGrid.vue'
import LinkRows from '../components/shared/LinkRows.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const route = useRoute()
const { t } = useI18n()

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

/** The figure on the price card. Shops and bespoke work are quoted. */
const priceFigure = computed(() => ({
  businessWebsite: t('pricing.starter.price'),
  booking: t('pricing.business.price'),
}[serviceKey.value] ?? t('pricing.bespoke.price')))

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
    .map((s) => ({ to: s.to, title: t(`serviceDetail.${s.key}.navLabel`), description: t(`serviceDetail.${s.key}.subtitle`) })),
  { to: '/pricing', title: t('nav.pricing'), description: t('servicesPage.related.link4Description') },
])

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
