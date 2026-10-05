<template>
  <section class="pt-14 pb-14 sm:pt-20 sm:pb-16 border-b border-border" :aria-labelledby="headingId">
    <div class="wrap">
      <nav v-if="crumbs?.length" :aria-label="t('nav.breadcrumb')" class="mb-8">
        <ol class="list-none m-0 p-0 flex flex-wrap gap-x-2 font-mono text-xs uppercase tracking-wide text-text-secondary">
          <li v-for="(crumb, index) in crumbs" :key="crumb.to" class="flex gap-2">
            <router-link :to="crumb.to" class="text-text-secondary hover:text-ink">{{ crumb.label }}</router-link>
            <span v-if="index < crumbs.length - 1" aria-hidden="true">/</span>
          </li>
        </ol>
      </nav>
      <div :class="$slots.aside ? 'grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-end' : ''">
        <div>
          <p v-if="kicker" class="label text-accent mb-6">{{ kicker }}</p>
          <h1 :id="headingId" class="display text-[2.75rem] sm:text-6xl xl:text-7xl m-0 max-w-5xl">{{ title }}</h1>
          <p v-if="subtitle" class="mt-8 mb-0 text-xl leading-relaxed text-ink-soft max-w-3xl">{{ subtitle }}</p>
        </div>
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/** Standard page opener: mono kicker, wide display headline, lead paragraph. */
withDefaults(defineProps<{
  title: string
  kicker?: string
  subtitle?: string
  headingId?: string
  crumbs?: { to: string; label: string }[]
}>(), {
  headingId: 'page-heading',
})

const { t } = useI18n()
</script>
