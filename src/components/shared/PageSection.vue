<template>
  <section :class="['py-20 lg:py-24', toneClass]" :aria-labelledby="headingId">
    <div class="wrap">
      <div
        :class="[
          'flex flex-wrap justify-between items-end gap-6',
          $slots.default ? 'mb-10 sm:mb-12' : '',
        ]"
      >
        <div class="max-w-3xl">
          <p v-if="kicker" :class="['label mb-4', tone === 'ink' ? 'text-signal' : 'text-accent']">{{ kicker }}</p>
          <h2 :id="headingId" class="text-[clamp(1.875rem,9.5vw,2.25rem)] sm:text-5xl m-0">{{ heading }}</h2>
          <p v-if="subtitle" :class="['mt-5 mb-0 text-lg', tone === 'ink' ? 'text-[#D6D6D0]' : 'text-ink-soft']">{{ subtitle }}</p>
        </div>
        <slot name="link" />
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * A titled band of content. `tone` picks the surface: paper (default), white
 * (alternate bands), or ink (one dark band per page at most).
 */
const props = withDefaults(defineProps<{
  heading: string
  headingId: string
  kicker?: string
  subtitle?: string
  tone?: 'paper' | 'white' | 'ink'
}>(), {
  tone: 'paper',
})

const toneClass = computed(() => ({
  paper: 'border-t border-border',
  white: 'bg-white border-t border-border',
  ink: 'bg-ink text-paper',
}[props.tone]))
</script>
