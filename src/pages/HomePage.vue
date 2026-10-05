<template>
  <div>
    <HeroSection />
    <ServicesOverview />
    <PricingPreview />
    <FeaturedWork />
    <ProcessSection />
    <StandardsSection />
    <FaqSection
      :items="faqItems"
      :kicker="t('home.faq.kicker')"
      :heading="t('home.faq.heading')"
      :cta-text="t('home.faq.ctaText')"
      heading-id="home-faq-heading"
    />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from '../components/home/HeroSection.vue'
import ServicesOverview from '../components/home/ServicesOverview.vue'
import PricingPreview from '../components/home/PricingPreview.vue'
import FeaturedWork from '../components/home/FeaturedWork.vue'
import ProcessSection from '../components/home/ProcessSection.vue'
import StandardsSection from '../components/home/StandardsSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

const faqItems = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({ question: t(`home.faq.q${n}`), answer: t(`home.faq.a${n}`) }))
)

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
