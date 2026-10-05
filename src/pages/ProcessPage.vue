<template>
  <div>
    <PageHero :kicker="t('nav.process')" :title="t('process.hero.title')" :subtitle="t('process.hero.subtitle')" />

    <PageSection
      kicker="01"
      heading-id="lifecycle-heading"
      :heading="t('process.lifecycle.heading')"
      :subtitle="t('process.lifecycle.subtitle')"
    >
      <ol class="list-none m-0 p-0 border-b border-border">
        <li
          v-for="(stage, index) in stages"
          :key="stage.title"
          class="stage grid gap-x-10 gap-y-5 py-10 border-t"
          :class="index === 0 ? 'border-t-2 border-ink' : 'border-border'"
        >
          <span class="display text-6xl text-ink leading-none" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="text-2xl mt-0 mb-3" style="font-stretch: 100%">{{ stage.title }}</h3>
            <p class="text-ink-soft m-0">{{ stage.description }}</p>
          </div>
          <div class="bg-white border border-border p-5">
            <p class="label text-xs text-text-secondary mt-0 mb-3">{{ t('process.lifecycle.outputs') }}</p>
            <ul class="list-none m-0 p-0 space-y-2 text-[0.9375rem]">
              <li v-for="output in stage.outputs" :key="output" class="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-1.5 before:bg-signal">
                {{ output }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </PageSection>

    <PageSection
      kicker="02"
      heading-id="milestones-heading"
      :heading="t('process.milestones.heading')"
      :subtitle="t('process.milestones.subtitle')"
      tone="white"
    >
      <RuledGrid :items="items('milestones', 4)" :columns="4" numbered />
    </PageSection>

    <PageSection
      kicker="03"
      heading-id="quality-heading"
      :heading="t('process.quality.heading')"
      :subtitle="t('process.quality.subtitle')"
    >
      <RuledGrid :items="items('quality', 7)" numbered />
    </PageSection>

    <PageSection
      kicker="04"
      heading-id="ai-heading"
      :heading="t('process.ai.heading')"
      :subtitle="t('process.ai.subtitle')"
      tone="ink"
    >
      <RuledGrid :items="items('ai', 5)" tone="ink" numbered />
    </PageSection>

    <section class="py-20 lg:py-24 border-t border-border">
      <div class="wrap grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
        <div v-for="(block, index) in proseBlocks" :key="block.key">
          <p class="label text-accent mt-0 mb-4">{{ String(index + 5).padStart(2, '0') }}</p>
          <h2 class="text-[clamp(1.875rem,9.5vw,2.25rem)] mt-0 mb-3">{{ t(`process.${block.key}.heading`) }}</h2>
          <p class="text-lg text-text-secondary mt-0 mb-8">{{ t(`process.${block.key}.subtitle`) }}</p>
          <div class="prose-vds">
            <p v-for="n in 3" :key="n">{{ t(`process.${block.key}.p${n}`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <FaqSection
      :items="faqItems"
      kicker="07"
      :heading="t('process.faq.heading')"
      :subtitle="t('process.faq.subtitle')"
      heading-id="process-faq-heading"
    />

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import PageSection from '../components/shared/PageSection.vue'
import RuledGrid from '../components/shared/RuledGrid.vue'
import FaqSection from '../components/shared/FaqSection.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { usePageSchema, faqPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

const outputCounts = [3, 3, 4, 3, 4]

const stages = computed(() =>
  outputCounts.map((count, i) => ({
    title: t(`process.lifecycle.stage${i + 1}.title`),
    description: t(`process.lifecycle.stage${i + 1}.description`),
    outputs: Array.from({ length: count }, (_, j) => t(`process.lifecycle.stage${i + 1}.output${j + 1}`)),
  }))
)

function items(group: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    title: t(`process.${group}.item${i + 1}.title`),
    description: t(`process.${group}.item${i + 1}.description`),
  }))
}

const proseBlocks = [{ key: 'working' }, { key: 'hosting' }]

const faqItems = computed(() =>
  [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    question: t(`process.faq.q${n}.question`),
    answer: t(`process.faq.q${n}.answer`),
  }))
)

usePageSchema(() => faqPageSchema(faqItems.value))
</script>

<style scoped>
@media (min-width: 1024px) {
  .stage {
    grid-template-columns: 7rem minmax(0, 6fr) minmax(0, 4fr);
    align-items: start;
  }
}
</style>
