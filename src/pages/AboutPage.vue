<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('about.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('about.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="our-story">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <h2 id="our-story" class="text-3xl font-bold text-text-primary mb-6">{{ t('about.storyHeading') }}</h2>
          <div class="space-y-4 text-text-secondary leading-relaxed">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
            <p>{{ t('about.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="values-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="values-heading" :subtitle="t('about.valuesSubtitle')">
          {{ t('about.valuesHeading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="value in values" :key="value.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ value.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ value.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="how-i-work-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="how-i-work-heading" :subtitle="t('about.howIWork.subtitle')">
          {{ t('about.howIWork.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <article v-for="item in howIWork" :key="item.title" class="bg-surface rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="skills-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="skills-heading" :subtitle="t('about.skills.subtitle')">
          {{ t('about.skills.heading') }}
        </SectionHeading>

        <div class="mt-8 max-w-3xl mx-auto text-center mb-12">
          <p class="text-text-secondary leading-relaxed">
            {{ t('about.skills.intro') }}
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article v-for="group in skillGroups" :key="group.title" class="bg-white rounded-lg p-6 border border-border">
            <h3 class="text-lg font-semibold text-text-primary mb-4">{{ group.title }}</h3>
            <ul class="list-none m-0 p-0 space-y-2">
              <li v-for="skill in group.skills" :key="skill" class="text-sm text-text-secondary flex items-start gap-2">
                <span class="text-primary mr-2" aria-hidden="true">+</span>
                <span>{{ skill }}</span>
              </li>
            </ul>
          </article>
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

const values = computed(() => [
  {
    icon: '🎯',
    title: t('about.value1Title'),
    description: t('about.value1Description'),
  },
  {
    icon: '🏆',
    title: t('about.value2Title'),
    description: t('about.value2Description'),
  },
  {
    icon: '🚀',
    title: t('about.value3Title'),
    description: t('about.value3Description'),
  },
  {
    icon: '🤝',
    title: t('about.value4Title'),
    description: t('about.value4Description'),
  },
  {
    icon: '🔒',
    title: t('about.value5Title'),
    description: t('about.value5Description'),
  },
  {
    icon: '📊',
    title: t('about.value6Title'),
    description: t('about.value6Description'),
  },
])

const howIWork = computed(() => [
  {
    icon: '💬',
    title: t('about.howIWork.item1Title'),
    description: t('about.howIWork.item1Description'),
  },
  {
    icon: '📋',
    title: t('about.howIWork.item2Title'),
    description: t('about.howIWork.item2Description'),
  },
  {
    icon: '⚙️',
    title: t('about.howIWork.item3Title'),
    description: t('about.howIWork.item3Description'),
  },
  {
    icon: '🔑',
    title: t('about.howIWork.item4Title'),
    description: t('about.howIWork.item4Description'),
  },
])

const skillGroups = computed(() => [
  {
    title: t('about.skills.group1Title'),
    skills: [
      t('about.skills.group1Skill1'),
      t('about.skills.group1Skill2'),
      t('about.skills.group1Skill3'),
      t('about.skills.group1Skill4'),
      t('about.skills.group1Skill5'),
      t('about.skills.group1Skill6'),
      t('about.skills.group1Skill7'),
    ],
  },
  {
    title: t('about.skills.group2Title'),
    skills: [
      t('about.skills.group2Skill1'),
      t('about.skills.group2Skill2'),
      t('about.skills.group2Skill3'),
      t('about.skills.group2Skill4'),
      t('about.skills.group2Skill5'),
      t('about.skills.group2Skill6'),
    ],
  },
  {
    title: t('about.skills.group3Title'),
    skills: [
      t('about.skills.group3Skill1'),
      t('about.skills.group3Skill2'),
      t('about.skills.group3Skill3'),
      t('about.skills.group3Skill4'),
      t('about.skills.group3Skill5'),
    ],
  },
  {
    title: t('about.skills.group4Title'),
    skills: [
      t('about.skills.group4Skill1'),
      t('about.skills.group4Skill2'),
      t('about.skills.group4Skill3'),
      t('about.skills.group4Skill4'),
      t('about.skills.group4Skill5'),
    ],
  },
])

</script>
