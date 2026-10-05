<template>
  <section class="py-24 lg:py-28" aria-labelledby="process-heading">
    <div class="wrap">
      <div class="flex flex-wrap justify-between items-end gap-6 mb-14">
        <div>
          <p class="label text-accent mb-4">{{ t('home.process.kicker') }}</p>
          <h2 id="process-heading" class="text-[clamp(2rem,10.5vw,3rem)] sm:text-6xl m-0 max-w-4xl">{{ t('home.process.heading') }}</h2>
        </div>
        <router-link to="/process" class="font-semibold text-ink">{{ t('home.process.learnMore') }}</router-link>
      </div>

      <ol class="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="pt-5 border-t-2"
          :class="index === 3 ? 'border-signal' : 'border-ink'"
        >
          <span class="font-mono text-[0.8125rem] text-text-secondary">{{ t('home.process.stageLabel', { n: index + 1 }) }}</span>
          <h3 class="text-[1.375rem] mt-2 mb-2">{{ step.title }}</h3>
          <p class="text-[0.9375rem] text-ink-soft m-0">{{ step.description }}</p>
        </li>
      </ol>

      <p class="font-mono text-[0.8125rem] text-text-secondary mt-12 mb-0">{{ t('home.process.payment') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const steps = computed(() => tm('home.process.steps') as { title: string; description: string }[])
</script>
