<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('process.hero.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('process.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="lifecycle-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.lifecycle.subtitle')">
          {{ t('process.lifecycle.heading') }}
        </SectionHeading>

        <ol class="mt-12 max-w-5xl mx-auto space-y-8 list-none m-0 p-0">
          <li v-for="stage in deliveryStages" :key="stage.number" class="bg-white rounded-lg p-6 sm:p-8 border border-border">
            <div class="flex items-start gap-4 sm:gap-6 mb-4">
              <div class="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0" aria-hidden="true">
                {{ stage.number }}
              </div>
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-text-primary mb-2">{{ stage.title }}</h3>
                <p class="text-text-secondary leading-relaxed">{{ stage.description }}</p>
              </div>
            </div>
            <div class="ml-0 sm:ml-18 mt-4 bg-surface rounded-lg p-4">
              <p class="font-semibold text-text-primary text-sm mb-2">{{ t('process.lifecycle.outputs') }}</p>
              <ul class="list-none m-0 p-0 space-y-2">
                <li v-for="output in stage.outputs" :key="output" class="text-sm text-text-secondary flex items-start gap-2">
                  <span class="text-primary font-semibold shrink-0" aria-hidden="true">+</span>
                  <span>{{ output }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="milestones-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.milestones.subtitle')">
          {{ t('process.milestones.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article v-for="item in milestonesContent" :key="item.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="ai-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.ai.subtitle')">
          {{ t('process.ai.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-5xl mx-auto space-y-6">
          <article v-for="item in aiContent" :key="item.title" class="bg-surface rounded-lg p-6 border border-border">
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="quality-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.quality.subtitle')">
          {{ t('process.quality.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="item in qualityGates" :key="item.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="hosting-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.hosting.subtitle')">
          {{ t('process.hosting.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('process.hosting.p1') }}</p>
            <p>{{ t('process.hosting.p2') }}</p>
            <p>{{ t('process.hosting.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="working-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.working.subtitle')">
          {{ t('process.working.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('process.working.p1') }}</p>
            <p>{{ t('process.working.p2') }}</p>
            <p>{{ t('process.working.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="faq-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('process.faq.subtitle')">
          {{ t('process.faq.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-3xl mx-auto space-y-4">
          <details v-for="item in faqItems" :key="item.question" class="border border-border rounded-lg bg-white p-4">
            <summary class="cursor-pointer font-semibold text-text-primary">{{ item.question }}</summary>
            <p class="mt-3 text-text-secondary text-sm leading-relaxed">{{ item.answer }}</p>
          </details>
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
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

const deliveryStages = computed(() => [
  {
    number: 1,
    title: t('process.lifecycle.stage1.title'),
    description: t('process.lifecycle.stage1.description'),
    outputs: [
      t('process.lifecycle.stage1.output1'),
      t('process.lifecycle.stage1.output2'),
      t('process.lifecycle.stage1.output3'),
    ],
  },
  {
    number: 2,
    title: t('process.lifecycle.stage2.title'),
    description: t('process.lifecycle.stage2.description'),
    outputs: [
      t('process.lifecycle.stage2.output1'),
      t('process.lifecycle.stage2.output2'),
      t('process.lifecycle.stage2.output3'),
    ],
  },
  {
    number: 3,
    title: t('process.lifecycle.stage3.title'),
    description: t('process.lifecycle.stage3.description'),
    outputs: [
      t('process.lifecycle.stage3.output1'),
      t('process.lifecycle.stage3.output2'),
      t('process.lifecycle.stage3.output3'),
      t('process.lifecycle.stage3.output4'),
    ],
  },
  {
    number: 4,
    title: t('process.lifecycle.stage4.title'),
    description: t('process.lifecycle.stage4.description'),
    outputs: [
      t('process.lifecycle.stage4.output1'),
      t('process.lifecycle.stage4.output2'),
      t('process.lifecycle.stage4.output3'),
    ],
  },
  {
    number: 5,
    title: t('process.lifecycle.stage5.title'),
    description: t('process.lifecycle.stage5.description'),
    outputs: [
      t('process.lifecycle.stage5.output1'),
      t('process.lifecycle.stage5.output2'),
      t('process.lifecycle.stage5.output3'),
      t('process.lifecycle.stage5.output4'),
    ],
  },
])

const milestonesContent = computed(() => [
  {
    icon: '📊',
    title: t('process.milestones.item1.title'),
    description: t('process.milestones.item1.description'),
  },
  {
    icon: '👁️',
    title: t('process.milestones.item2.title'),
    description: t('process.milestones.item2.description'),
  },
  {
    icon: '🔄',
    title: t('process.milestones.item3.title'),
    description: t('process.milestones.item3.description'),
  },
  {
    icon: '🚪',
    title: t('process.milestones.item4.title'),
    description: t('process.milestones.item4.description'),
  },
])

const aiContent = computed(() => [
  {
    title: t('process.ai.item1.title'),
    description: t('process.ai.item1.description'),
  },
  {
    title: t('process.ai.item2.title'),
    description: t('process.ai.item2.description'),
  },
  {
    title: t('process.ai.item3.title'),
    description: t('process.ai.item3.description'),
  },
  {
    title: t('process.ai.item4.title'),
    description: t('process.ai.item4.description'),
  },
  {
    title: t('process.ai.item5.title'),
    description: t('process.ai.item5.description'),
  },
])

const qualityGates = computed(() => [
  {
    icon: '🔍',
    title: t('process.quality.item1.title'),
    description: t('process.quality.item1.description'),
  },
  {
    icon: '🧪',
    title: t('process.quality.item2.title'),
    description: t('process.quality.item2.description'),
  },
  {
    icon: '⚡',
    title: t('process.quality.item3.title'),
    description: t('process.quality.item3.description'),
  },
  {
    icon: '♿',
    title: t('process.quality.item4.title'),
    description: t('process.quality.item4.description'),
  },
  {
    icon: '🚀',
    title: t('process.quality.item5.title'),
    description: t('process.quality.item5.description'),
  },
  {
    icon: '🔒',
    title: t('process.quality.item6.title'),
    description: t('process.quality.item6.description'),
  },
  {
    icon: '✅',
    title: t('process.quality.item7.title'),
    description: t('process.quality.item7.description'),
  },
])

const faqItems = computed(() => [
  {
    question: t('process.faq.q1.question'),
    answer: t('process.faq.q1.answer'),
  },
  {
    question: t('process.faq.q2.question'),
    answer: t('process.faq.q2.answer'),
  },
  {
    question: t('process.faq.q3.question'),
    answer: t('process.faq.q3.answer'),
  },
  {
    question: t('process.faq.q4.question'),
    answer: t('process.faq.q4.answer'),
  },
  {
    question: t('process.faq.q5.question'),
    answer: t('process.faq.q5.answer'),
  },
  {
    question: t('process.faq.q6.question'),
    answer: t('process.faq.q6.answer'),
  },
])
</script>
