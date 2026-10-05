<template>
  <div>
    <section class="pt-16 pb-14 sm:pt-24 sm:pb-18" aria-labelledby="pricing-heading">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-end">
        <div>
          <p class="label text-accent mb-6">{{ t('pricing.hero.kicker') }}</p>
          <h1 id="pricing-heading" class="display text-[3.25rem] sm:text-7xl xl:text-[5.5rem] m-0">
            {{ t('pricing.hero.title') }}
          </h1>
        </div>
        <div>
          <p class="text-ink-soft mt-0 mb-4">{{ t('pricing.intro.p1') }}</p>
          <p class="font-mono text-[0.8125rem] text-text-secondary m-0">{{ t('pricing.intro.vat') }}</p>
        </div>
      </div>
    </section>

    <section class="pb-20 lg:pb-24" aria-labelledby="packages-heading">
      <div class="wrap">
        <h2 id="packages-heading" class="sr-only">{{ t('pricing.packagesHeading') }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[42rem] border-collapse text-left">
            <caption class="label text-text-secondary text-left pb-5">{{ t('pricing.compare.caption') }}</caption>
            <thead>
              <tr class="border-t-2 border-ink">
                <th scope="col" class="w-[40%] pt-7 pb-5 pr-5 align-bottom">
                  <span class="label text-xs text-text-secondary font-normal">{{ t('pricing.compare.included') }}</span>
                </th>
                <th v-for="tier in tableTiers" :key="tier.key" scope="col" class="pt-7 pb-5 px-5 align-bottom font-normal" :class="tier.featured ? 'bg-white border-t-[6px] border-signal' : ''">
                  <span class="label block text-text-secondary">{{ tier.name }}</span>
                  <span class="display block text-5xl my-1">{{ tier.figure }}</span>
                  <span class="font-mono block text-xs text-text-secondary">{{ tier.meta }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows" :key="row.feature" class="border-t border-border">
                <th scope="row" class="py-4 pr-5 font-normal align-top" :class="{ 'font-semibold': index === rows.length - 1 }">{{ row.feature }}</th>
                <td class="py-4 px-5 align-top" :class="cellClass(row.starter, index)">{{ row.starter }}</td>
                <td class="py-4 px-5 align-top bg-white" :class="cellClass(row.business, index)">{{ row.business }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-6 mb-0 max-w-3xl text-ink-soft">{{ t('pricing.compare.domainNote') }}</p>
        <div class="mt-8">
          <BaseButton variant="signal" size="lg" to="/contact" arrow>{{ t('pricing.ctaPrimary') }}</BaseButton>
        </div>
      </div>
    </section>

    <section class="pb-20 lg:pb-28" :aria-label="t('pricing.otherOptions')">
      <div class="wrap"><div class="grid grid-cols-1 md:grid-cols-2 border-t-2 border-ink">
        <div class="py-10 md:pr-10">
          <h2 class="label text-text-secondary font-normal mb-3 leading-normal tracking-wide" style="font-stretch: 100%">{{ t('pricing.bespoke.name') }}</h2>
          <p class="display text-4xl sm:text-[2.75rem] mt-0 mb-4">{{ t('pricing.bespoke.price') }}</p>
          <p class="text-ink-soft mt-0 mb-6">{{ t('pricing.bespoke.forWho') }}</p>
          <router-link to="/contact" class="font-semibold text-ink">{{ t('pricing.bespoke.cta') }}</router-link>
        </div>
        <div id="care" class="py-10 md:pl-10 border-t md:border-t-0 md:border-l border-border">
          <h2 class="label text-text-secondary font-normal mb-3 leading-normal tracking-wide" style="font-stretch: 100%">{{ t('pricing.care.heading') }}</h2>
          <p class="display text-4xl sm:text-[2.75rem] mt-0 mb-4">{{ t('pricing.care.price') }}</p>
          <ul class="mt-0 mb-5 pl-5 text-ink-soft space-y-1">
            <li v-for="feature in careFeatures" :key="feature">{{ feature }}</li>
          </ul>
          <p class="font-mono text-[0.8125rem] text-text-secondary m-0">{{ t('pricing.care.note') }}</p>
        </div>
      </div></div>
    </section>

    <FaqSection
      :items="faqItems"
      :kicker="t('pricing.faqKicker')"
      :heading="t('pricing.faqHeading')"
      heading-id="pricing-faq-heading"
    />

    <section class="py-20 lg:py-28 border-t border-border" aria-labelledby="contact-form-heading">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-16">
        <div>
          <p class="label text-accent mb-4">{{ t('pricing.ctaKicker') }}</p>
          <p class="display text-4xl sm:text-5xl mt-0 mb-5">{{ t('pricing.ctaHeading') }}</p>
          <p class="text-ink-soft m-0">{{ t('pricing.ctaBody') }}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'
import { SITE_ORIGIN, businessId } from '../seo/siteSchema'

const { t, tm } = useI18n()

const tableTiers = computed(() => [
  { key: 'starter', name: t('pricing.starter.name'), figure: t('pricing.starter.figure'), meta: t('pricing.starter.meta'), featured: false },
  { key: 'business', name: t('pricing.business.name'), figure: t('pricing.business.figure'), meta: t('pricing.business.meta'), featured: true },
])

const rows = computed(() => tm('pricing.compare.rows') as { feature: string; starter: string; business: string }[])

/** "No" cells are muted so the eye lands on what each tier adds. */
function cellClass(value: string, index: number) {
  return {
    'text-text-secondary': value === t('pricing.compare.no'),
    'font-semibold': index === rows.value.length - 1,
  }
}

const careFeatures = computed(() => [1, 2, 3, 4].map((n) => t(`pricing.care.f${n}`)))

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
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
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
          minPrice: '100',
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
          minPrice: '400',
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
