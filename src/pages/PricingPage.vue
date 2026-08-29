<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">
          {{ t('pricing.hero.kicker') }}
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('pricing.hero.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">{{ t('pricing.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="packages-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="max-w-3xl mx-auto text-center text-lg text-text-secondary leading-relaxed mb-16">
          {{ t('pricing.intro.p1') }}
        </p>

        <SectionHeading heading-id="packages-heading" :subtitle="t('pricing.packagesSubtitle')">
          {{ t('pricing.packagesHeading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <article
            v-for="tier in tiers"
            :key="tier.key"
            class="rounded-lg border bg-white p-6 lg:p-8 h-full flex flex-col"
            :class="tier.featured ? 'border-primary border-2 shadow-lg' : 'border-border'"
          >
            <h3 class="text-xl font-bold text-text-primary">{{ tier.name }}</h3>
            <p class="mt-3 text-3xl font-bold text-primary">{{ tier.price }}</p>
            <p class="mt-1 text-sm text-text-secondary">{{ tier.timeline }}</p>
            <p class="mt-4 font-medium text-text-primary">{{ tier.tagline }}</p>
            <p class="mt-3 text-sm text-text-secondary leading-relaxed">{{ tier.forWho }}</p>

            <ul v-if="tier.features.length" class="mt-6 space-y-3 grow">
              <li v-for="feature in tier.features" :key="feature" class="flex items-start gap-3 text-sm text-text-secondary">
                <span class="text-primary font-bold shrink-0" aria-hidden="true">&check;</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
            <div v-else class="grow" />

            <div class="mt-8">
              <BaseButton :variant="tier.featured ? 'accent' : 'secondary'" to="/contact" class="w-full">
                {{ tier.cta }}
              </BaseButton>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="care-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <div>
            <h2 id="care-heading" class="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              {{ t('pricing.care.heading') }}
            </h2>
            <p class="text-3xl font-bold text-primary mb-2">{{ t('pricing.care.price') }}</p>
            <p class="text-text-secondary">{{ t('pricing.care.subtitle') }}</p>
          </div>
          <div class="space-y-4 text-text-secondary leading-relaxed">
            <p>{{ t('pricing.care.p1') }}</p>
            <p>{{ t('pricing.care.p2') }}</p>
          </div>
        </div>

        <div class="mt-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div class="bg-white rounded-lg border border-border p-6 lg:p-8 h-full">
            <h2 class="text-xl font-bold text-text-primary mb-3">{{ t('pricing.ownership.heading') }}</h2>
            <p class="text-text-secondary leading-relaxed">{{ t('pricing.ownership.p1') }}</p>
          </div>
          <div class="bg-white rounded-lg border border-border p-6 lg:p-8 h-full">
            <h2 class="text-xl font-bold text-text-primary mb-3">{{ t('pricing.bilingual.heading') }}</h2>
            <p class="text-text-secondary leading-relaxed">{{ t('pricing.bilingual.p1') }}</p>
          </div>
        </div>
      </div>
    </section>

    <FaqSection
      :items="faqItems"
      background="bg-white"
      :heading="t('pricing.faqHeading')"
      :subtitle="t('pricing.faqSubtitle')"
      heading-id="pricing-faq-heading"
    />

    <section class="py-16 lg:py-24 bg-primary" aria-labelledby="pricing-cta-heading">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="pricing-cta-heading" class="text-3xl sm:text-4xl font-bold text-white mb-4">
          {{ t('pricing.ctaHeading') }}
        </h2>
        <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{{ t('pricing.ctaBody') }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton variant="accent" size="lg" to="/contact">{{ t('pricing.ctaPrimary') }}</BaseButton>
          <BaseButton size="lg" to="/small-business" class="bg-white/10 hover:bg-white/20 text-white border-white/30">
            {{ t('pricing.ctaSecondary') }}
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../components/shared/SectionHeading.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'
import { SITE_ORIGIN, businessId } from '../seo/siteSchema'

const { t } = useI18n()

const tiers = computed(() => [
  {
    key: 'starter',
    name: t('pricing.starter.name'),
    price: t('pricing.starter.price'),
    timeline: t('pricing.starter.timeline'),
    tagline: t('pricing.starter.tagline'),
    forWho: t('pricing.starter.forWho'),
    features: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`pricing.starter.f${n}`)),
    cta: t('pricing.ctaPrimary'),
    featured: false,
  },
  {
    key: 'business',
    name: t('pricing.business.name'),
    price: t('pricing.business.price'),
    timeline: t('pricing.business.timeline'),
    tagline: t('pricing.business.tagline'),
    forWho: t('pricing.business.forWho'),
    features: [1, 2, 3, 4, 5, 6].map((n) => t(`pricing.business.f${n}`)),
    cta: t('pricing.ctaPrimary'),
    featured: true,
  },
  {
    key: 'bespoke',
    name: t('pricing.bespoke.name'),
    price: t('pricing.bespoke.price'),
    timeline: t('pricing.bespoke.timeline'),
    tagline: t('pricing.bespoke.tagline'),
    forWho: t('pricing.bespoke.forWho'),
    features: [] as string[],
    cta: t('pricing.bespoke.cta'),
    featured: false,
  },
])

const faqItems = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({ question: t(`pricing.q${n}`), answer: t(`pricing.a${n}`) }))
)

// "From £" figures are published as minPrice, never a fixed price, and the
// bespoke tier deliberately carries no priceSpecification at all -- an absent
// price is honest, a placeholder risks being quoted back as fact.
const offerCatalog = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Small business website design',
  serviceType: 'Web design and development',
  provider: { '@id': businessId },
  areaServed: { '@type': 'AdministrativeArea', name: 'South Wales' },
  url: `${SITE_ORIGIN}/pricing`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website design packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: t('pricing.starter.name'),
        description: t('pricing.starter.tagline'),
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '650',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: t('pricing.business.name'),
        description: t('pricing.business.tagline'),
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1250',
          priceCurrency: 'GBP',
          valueAddedTaxIncluded: true,
        },
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: t('pricing.bespoke.name'),
        description: t('pricing.bespoke.tagline'),
        availability: 'https://schema.org/InStock',
      },
    ],
  },
}))

const carePlanSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website care plan',
  serviceType: 'Website maintenance',
  provider: { '@id': businessId },
  url: `${SITE_ORIGIN}/pricing`,
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      minPrice: '35',
      priceCurrency: 'GBP',
      unitText: 'MONTH',
      valueAddedTaxIncluded: true,
    },
  },
}))

usePageSchema(() => [offerCatalog.value, carePlanSchema.value, faqPageSchema(faqItems.value)])
</script>
