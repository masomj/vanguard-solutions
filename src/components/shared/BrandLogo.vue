<template>
  <svg
    :class="$attrs.class"
    viewBox="0 0 737 540"
    fill="none"
    role="img"
    :aria-hidden="title ? undefined : 'true'"
    :aria-label="title || undefined"
  >
    <title v-if="title">{{ title }}</title>
    <defs>
      <linearGradient v-if="variant === 'gradient'" :id="gradientId" x1="0" y1="0" x2="0.62" y2="0.79">
        <stop offset="0" stop-color="#176ACC" />
        <stop offset="1" stop-color="#00D1FF" />
      </linearGradient>
      <!-- Explicit units are required. Without them the mask region is read as
           objectBoundingBox and the mark collapses to a fragment in the corner. -->
      <mask
        :id="maskId"
        maskUnits="userSpaceOnUse"
        maskContentUnits="userSpaceOnUse"
        x="-60"
        y="-60"
        width="860"
        height="660"
      >
        <rect x="-60" y="-60" width="860" height="660" fill="#fff" />
        <polygon points="-40,199 475,162 475,180 -40,217" fill="#000" />
      </mask>
    </defs>
    <g :mask="`url(#${maskId})`" :fill="fill">
      <polygon points="0,0 250,540 500,0 355,0 250,370 145,0" />
      <polygon points="582,0 627,21 543,202 498,181" />
      <polygon points="692,0 737,21 683,139 638,118" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  /**
   * gradient - the full brand mark, for light surfaces.
   * white    - single colour, for navy/dark surfaces.
   * cyan     - accent mark, for navy/dark surfaces.
   * current  - inherits currentColor from the parent.
   */
  variant?: 'gradient' | 'white' | 'cyan' | 'current'
  /** Accessible name. Omit to render the mark as decorative. */
  title?: string
}>(), {
  variant: 'gradient',
  title: '',
})

// Unique per instance so the header and footer marks don't collide in the DOM.
const uid = useId()
const gradientId = `vds-grad-${uid}`
const maskId = `vds-seam-${uid}`

const fill = computed(() => ({
  gradient: `url(#${gradientId})`,
  white: '#FFFFFF',
  cyan: 'var(--color-accent-cyan)',
  current: 'currentColor',
}[props.variant]))
</script>
