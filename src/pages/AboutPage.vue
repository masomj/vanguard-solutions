<template>
  <div>
    <PageHero :kicker="t('nav.about')" :title="t('about.title')" :subtitle="t('about.subtitle')" />

    <section class="py-20 lg:py-24" aria-labelledby="studio-heading">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-16">
        <div>
          <p class="label text-accent mb-4">01</p>
          <h2 id="studio-heading" class="text-4xl sm:text-5xl m-0">{{ t('about.storyHeading') }}</h2>
        </div>
        <div class="prose-vds text-lg max-w-3xl">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <p>{{ t('about.p3') }}</p>
        </div>
      </div>
    </section>

    <PageSection
      kicker="02"
      heading-id="values-heading"
      :heading="t('about.valuesHeading')"
      :subtitle="t('about.valuesSubtitle')"
      tone="white"
    >
      <RuledGrid :items="values" numbered />
    </PageSection>

    <PageSection
      kicker="03"
      heading-id="how-i-work-heading"
      :heading="t('about.howIWork.heading')"
      :subtitle="t('about.howIWork.subtitle')"
    >
      <RuledGrid :items="howIWork" :columns="2" />
    </PageSection>

    <PageSection
      kicker="04"
      heading-id="skills-heading"
      :heading="t('about.skills.heading')"
      :subtitle="t('about.skills.intro')"
      tone="ink"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
        <div v-for="group in skillGroups" :key="group.title" class="pt-6 border-t border-[#3A3E44]">
          <h3 class="label text-signal font-normal mb-4" style="font-stretch: 100%">{{ group.title }}</h3>
          <ul class="list-none m-0 p-0 space-y-2 text-[#D6D6D0] mb-8">
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
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
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

const values = computed(() =>
  [1, 3, 4, 5, 6].map((n) => ({
    title: t(`about.value${n}Title`),
    description: t(`about.value${n}Description`),
  }))
)

const howIWork = computed(() =>
  [1, 2, 3, 4].map((n) => ({
    title: t(`about.howIWork.item${n}Title`),
    description: t(`about.howIWork.item${n}Description`),
  }))
)

const skillCounts = { 1: 7, 2: 6, 3: 5, 4: 5 } as const

const skillGroups = computed(() =>
  ([1, 2, 3, 4] as const).map((g) => ({
    title: t(`about.skills.group${g}Title`),
    skills: Array.from({ length: skillCounts[g] }, (_, i) => t(`about.skills.group${g}Skill${i + 1}`)),
  }))
)
</script>
