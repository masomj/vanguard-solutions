<template>
  <div>
    <HeroSection />
    <ServicesOverview />
    <TechStackSection />
    <WhyChooseUs />
    <ProcessSection />
    <LocalPresenceSection />
    <FaqSection
      :items="faqItems"
      :heading="t('home.faq.heading')"
      :subtitle="t('home.faq.subtitle')"
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
import TechStackSection from '../components/home/TechStackSection.vue'
import WhyChooseUs from '../components/home/WhyChooseUs.vue'
import ProcessSection from '../components/home/ProcessSection.vue'
import LocalPresenceSection from '../components/home/LocalPresenceSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

const faqItems = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({ question: t(`home.faq.q${n}`), answer: t(`home.faq.a${n}`) }))
)

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
