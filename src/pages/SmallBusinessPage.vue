<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">
          {{ t('smallBusiness.hero.kicker') }}
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('smallBusiness.hero.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('smallBusiness.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="why-matters-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="why-matters-heading" :subtitle="t('smallBusiness.whyMatters.subtitle')">
          {{ t('smallBusiness.whyMatters.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article v-for="item in whyMattersContent" :key="item.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="bring-enquiries-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="bring-enquiries-heading" :subtitle="t('smallBusiness.bringEnquiries.subtitle')">
          {{ t('smallBusiness.bringEnquiries.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="item in bringEnquiriesContent" :key="item.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="included-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="included-heading" :subtitle="t('smallBusiness.included.subtitle')">
          {{ t('smallBusiness.included.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="feature in includedFeatures" :key="feature" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
            <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ feature }}
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="signs-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="signs-heading" :subtitle="t('smallBusiness.signs.subtitle')">
          {{ t('smallBusiness.signs.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="item in signsContent" :key="item.text" class="bg-white rounded-lg p-6 border border-border">
            <div class="flex items-start gap-3">
              <span class="text-2xl shrink-0" aria-hidden="true">{{ item.icon }}</span>
              <p class="text-text-primary text-sm leading-relaxed">{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="who-for-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="who-for-heading" :subtitle="t('smallBusiness.whoFor.subtitle')">
          {{ t('smallBusiness.whoFor.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="item in whoForItems" :key="item.title" class="bg-surface rounded-lg p-6 border border-border">
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="cost-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="cost-heading" :subtitle="t('smallBusiness.cost.subtitle')">
          {{ t('smallBusiness.cost.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('smallBusiness.cost.p1') }}</p>
            <p>{{ t('smallBusiness.cost.p2') }}</p>
            <p class="text-text-primary font-medium">{{ t('smallBusiness.cost.p3') }}</p>
          </div>

          <div class="mt-8 text-center">
            <BaseButton variant="secondary" to="/pricing">{{ t('smallBusiness.cost.ctaText') }}</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="how-works-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="how-works-heading" :subtitle="t('smallBusiness.howWorks.subtitle')">
          {{ t('smallBusiness.howWorks.heading') }}
        </SectionHeading>

        <ol class="mt-12 max-w-4xl mx-auto space-y-6 list-none m-0 p-0">
          <li v-for="step in howWorksSteps" :key="step.number" class="bg-white rounded-lg p-6 border border-border">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold shrink-0" aria-hidden="true">
                {{ step.number }}
              </div>
              <p class="text-text-secondary text-sm leading-relaxed">{{ step.description }}</p>
            </div>
          </li>
        </ol>

        <div class="mt-8 max-w-4xl mx-auto text-center">
          <p class="text-text-secondary text-sm mb-4">{{ t('smallBusiness.howWorks.fullProcess') }}</p>
          <BaseButton to="/process" variant="secondary">{{ t('smallBusiness.howWorks.viewFullProcess') }}</BaseButton>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="faq-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="faq-heading" :subtitle="t('smallBusiness.faq.subtitle')">
          {{ t('smallBusiness.faq.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-3xl mx-auto space-y-4">
          <details v-for="item in faqItems" :key="item.question" class="border border-border rounded-lg bg-white p-4 sm:p-6">
            <summary class="cursor-pointer font-semibold text-text-primary">{{ item.question }}</summary>
            <p class="mt-3 text-text-secondary text-sm leading-relaxed">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="links-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="links-heading" :subtitle="t('smallBusiness.links.subtitle')">
          {{ t('smallBusiness.links.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <router-link v-for="link in pageLinks" :key="link.to" :to="link.to" class="bg-white rounded-lg p-6 border border-border hover:border-primary transition-colors no-underline group">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors" aria-hidden="true">
              <span class="text-2xl">{{ link.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">{{ link.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ link.description }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../components/shared/SectionHeading.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { useLocale } from '../composables/useLocale'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()
const { localePath } = useLocale()

const whyMattersContent = computed(() => [
  {
    icon: '✓',
    title: t('smallBusiness.whyMatters.item1.title'),
    description: t('smallBusiness.whyMatters.item1.description'),
  },
  {
    icon: '🔑',
    title: t('smallBusiness.whyMatters.item2.title'),
    description: t('smallBusiness.whyMatters.item2.description'),
  },
  {
    icon: '🔍',
    title: t('smallBusiness.whyMatters.item3.title'),
    description: t('smallBusiness.whyMatters.item3.description'),
  },
  {
    icon: '💬',
    title: t('smallBusiness.whyMatters.item4.title'),
    description: t('smallBusiness.whyMatters.item4.description'),
  },
])

const bringEnquiriesContent = computed(() => [
  {
    icon: '📍',
    title: t('smallBusiness.bringEnquiries.item1.title'),
    description: t('smallBusiness.bringEnquiries.item1.description'),
  },
  {
    icon: '📞',
    title: t('smallBusiness.bringEnquiries.item2.title'),
    description: t('smallBusiness.bringEnquiries.item2.description'),
  },
  {
    icon: '📄',
    title: t('smallBusiness.bringEnquiries.item3.title'),
    description: t('smallBusiness.bringEnquiries.item3.description'),
  },
  {
    icon: '📸',
    title: t('smallBusiness.bringEnquiries.item4.title'),
    description: t('smallBusiness.bringEnquiries.item4.description'),
  },
  {
    icon: '📧',
    title: t('smallBusiness.bringEnquiries.item5.title'),
    description: t('smallBusiness.bringEnquiries.item5.description'),
  },
])

const includedFeatures = computed(() => [
  t('smallBusiness.included.f1'),
  t('smallBusiness.included.f2'),
  t('smallBusiness.included.f3'),
  t('smallBusiness.included.f4'),
  t('smallBusiness.included.f5'),
  t('smallBusiness.included.f6'),
  t('smallBusiness.included.f7'),
  t('smallBusiness.included.f8'),
  t('smallBusiness.included.f9'),
  t('smallBusiness.included.f10'),
  t('smallBusiness.included.f11'),
  t('smallBusiness.included.f12'),
])

const signsContent = computed(() => [
  {
    icon: '✓',
    text: t('smallBusiness.signs.item1'),
  },
  {
    icon: '✓',
    text: t('smallBusiness.signs.item2'),
  },
  {
    icon: '✓',
    text: t('smallBusiness.signs.item3'),
  },
  {
    icon: '✓',
    text: t('smallBusiness.signs.item4'),
  },
  {
    icon: '✓',
    text: t('smallBusiness.signs.item5'),
  },
  {
    icon: '✓',
    text: t('smallBusiness.signs.item6'),
  },
])

const howWorksSteps = computed(() => [
  {
    number: 1,
    description: t('smallBusiness.howWorks.step1'),
  },
  {
    number: 2,
    description: t('smallBusiness.howWorks.step2'),
  },
  {
    number: 3,
    description: t('smallBusiness.howWorks.step3'),
  },
  {
    number: 4,
    description: t('smallBusiness.howWorks.step4'),
  },
])

const faqItems = computed(() => [
  {
    question: t('smallBusiness.faq.q1.question'),
    answer: t('smallBusiness.faq.q1.answer'),
  },
  {
    question: t('smallBusiness.faq.q2.question'),
    answer: t('smallBusiness.faq.q2.answer'),
  },
  {
    question: t('smallBusiness.faq.q3.question'),
    answer: t('smallBusiness.faq.q3.answer'),
  },
  {
    question: t('smallBusiness.faq.q4.question'),
    answer: t('smallBusiness.faq.q4.answer'),
  },
  {
    question: t('smallBusiness.faq.q5.question'),
    answer: t('smallBusiness.faq.q5.answer'),
  },
  {
    question: t('smallBusiness.faq.q6.question'),
    answer: t('smallBusiness.faq.q6.answer'),
  },
  {
    question: t('smallBusiness.faq.q7.question'),
    answer: t('smallBusiness.faq.q7.answer'),
  },
])

const pageLinks = computed(() => [
  {
    to: localePath('/technology'),
    icon: '⚙️',
    title: t('smallBusiness.links.technology.title'),
    description: t('smallBusiness.links.technology.description'),
  },
  {
    to: localePath('/process'),
    icon: '📋',
    title: t('smallBusiness.links.process.title'),
    description: t('smallBusiness.links.process.description'),
  },
  {
    to: localePath('/services'),
    icon: '🛠️',
    title: t('smallBusiness.links.services.title'),
    description: t('smallBusiness.links.services.description'),
  },
])

const whoForItems = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({
    title: t(`smallBusiness.whoFor.item${n}Title`),
    description: t(`smallBusiness.whoFor.item${n}Description`),
  }))
)

usePageSchema(() => faqPageSchema(faqItems.value))
</script>
