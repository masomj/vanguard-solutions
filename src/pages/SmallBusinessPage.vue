<template>
  <div>
    <PageHero :kicker="t('smallBusiness.hero.kicker')" :title="t('smallBusiness.hero.title')" :subtitle="t('smallBusiness.hero.subtitle')">
      <template #aside>
        <div class="quote-sheet p-6">
          <p class="label text-xs text-text-secondary mt-0 mb-2">{{ t('pricing.starter.name') }}</p>
          <p class="display text-5xl mt-0 mb-1">{{ t('pricing.starter.figure') }}</p>
          <p class="font-mono text-xs text-text-secondary uppercase mt-0 mb-5">{{ t('pricing.starter.meta') }}</p>
          <p class="text-[0.9375rem] text-ink-soft mt-0 mb-5">{{ t('pricing.starter.tagline') }}</p>
          <BaseButton to="/contact" variant="signal" size="sm" arrow>{{ t('nav.getQuote') }}</BaseButton>
        </div>
      </template>
    </PageHero>

    <PageSection
      kicker="01"
      heading-id="why-matters-heading"
      :heading="t('smallBusiness.whyMatters.heading')"
      :subtitle="t('smallBusiness.whyMatters.subtitle')"
    >
      <RuledGrid :items="items('whyMatters', 4)" :columns="4" numbered />
    </PageSection>

    <PageSection
      kicker="02"
      heading-id="bring-enquiries-heading"
      :heading="t('smallBusiness.bringEnquiries.heading')"
      :subtitle="t('smallBusiness.bringEnquiries.subtitle')"
      tone="white"
    >
      <RuledGrid :items="items('bringEnquiries', 5)" numbered />
    </PageSection>

    <PageSection
      kicker="03"
      heading-id="included-heading"
      :heading="t('smallBusiness.included.heading')"
      :subtitle="t('smallBusiness.included.subtitle')"
    >
      <RuledList :items="included" />
    </PageSection>

    <PageSection
      kicker="04"
      heading-id="who-for-heading"
      :heading="t('smallBusiness.whoFor.heading')"
      :subtitle="t('smallBusiness.whoFor.subtitle')"
      tone="white"
    >
      <RuledGrid :items="whoFor" />
    </PageSection>

    <PageSection
      kicker="05"
      heading-id="signs-heading"
      :heading="t('smallBusiness.signs.heading')"
      :subtitle="t('smallBusiness.signs.subtitle')"
      tone="ink"
    >
      <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        <li v-for="sign in signs" :key="sign" class="py-5 border-t border-[#3A3E44] text-lg text-[#E4E4DE]">{{ sign }}</li>
      </ul>
    </PageSection>

    <section class="py-20 lg:py-24" aria-labelledby="cost-heading">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-16">
        <div>
          <p class="label text-accent mt-0 mb-4">06</p>
          <h2 id="cost-heading" class="text-4xl sm:text-5xl mt-0 mb-5">{{ t('smallBusiness.cost.heading') }}</h2>
          <p class="text-lg text-text-secondary m-0">{{ t('smallBusiness.cost.subtitle') }}</p>
        </div>
        <div class="prose-vds text-lg max-w-3xl">
          <p>{{ t('smallBusiness.cost.p1') }}</p>
          <p>{{ t('smallBusiness.cost.p2') }}</p>
          <p class="!text-ink font-semibold">{{ t('smallBusiness.cost.p3') }}</p>
          <p class="mt-6">
            <router-link to="/pricing" class="font-semibold text-ink">{{ t('smallBusiness.cost.ctaText') }} <span aria-hidden="true">&rarr;</span></router-link>
          </p>
        </div>
      </div>
    </section>

    <PageSection
      kicker="07"
      heading-id="how-works-heading"
      :heading="t('smallBusiness.howWorks.heading')"
      :subtitle="t('smallBusiness.howWorks.subtitle')"
      tone="white"
    >
      <template #link>
        <router-link to="/process" class="font-semibold text-ink">{{ t('smallBusiness.howWorks.viewFullProcess') }}</router-link>
      </template>
      <ol class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        <li v-for="(step, index) in steps" :key="step" class="pt-5 border-t-2 border-ink">
          <span class="font-mono text-[0.8125rem] text-text-secondary">{{ t('home.process.stageLabel', { n: index + 1 }) }}</span>
          <p class="text-[0.9375rem] text-ink-soft mt-2 mb-0">{{ step }}</p>
        </li>
      </ol>
    </PageSection>

    <FaqSection
      :items="faqItems"
      kicker="08"
      :heading="t('smallBusiness.faq.heading')"
      :subtitle="t('smallBusiness.faq.subtitle')"
      heading-id="small-business-faq-heading"
      background="border-t border-border"
    />

    <PageSection
      heading-id="links-heading"
      :heading="t('smallBusiness.links.heading')"
      :subtitle="t('smallBusiness.links.subtitle')"
      tone="white"
    >
      <LinkRows :links="pageLinks" />
    </PageSection>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import PageSection from '../components/shared/PageSection.vue'
import RuledGrid from '../components/shared/RuledGrid.vue'
import RuledList from '../components/shared/RuledList.vue'
import LinkRows from '../components/shared/LinkRows.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

function items(group: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    title: t(`smallBusiness.${group}.item${i + 1}.title`),
    description: t(`smallBusiness.${group}.item${i + 1}.description`),
  }))
}

const included = computed(() => Array.from({ length: 12 }, (_, i) => t(`smallBusiness.included.f${i + 1}`)))

const signs = computed(() => Array.from({ length: 6 }, (_, i) => t(`smallBusiness.signs.item${i + 1}`)))

const whoFor = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({
    title: t(`smallBusiness.whoFor.item${n}Title`),
    description: t(`smallBusiness.whoFor.item${n}Description`),
  }))
)

const steps = computed(() => [1, 2, 3, 4].map((n) => t(`smallBusiness.howWorks.step${n}`)))

const faqItems = computed(() =>
  [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    question: t(`smallBusiness.faq.q${n}.question`),
    answer: t(`smallBusiness.faq.q${n}.answer`),
  }))
)

const pageLinks = computed(() => [
  { to: '/technology', title: t('smallBusiness.links.technology.title'), description: t('smallBusiness.links.technology.description') },
  { to: '/process', title: t('smallBusiness.links.process.title'), description: t('smallBusiness.links.process.description') },
  { to: '/services', title: t('smallBusiness.links.services.title'), description: t('smallBusiness.links.services.description') },
])

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
