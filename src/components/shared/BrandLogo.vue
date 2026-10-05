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
    <g :mask="`url(#${maskId})`">
      <polygon :fill="colours.v" points="0,0 250,540 500,0 355,0 250,370 145,0" />
      <polygon :fill="colours.ticks" points="582,0 627,21 543,202 498,181" />
      <polygon :fill="colours.ticks" points="692,0 737,21 683,139 638,118" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  /**
   * ink     - ink V with signal ticks, for paper/white surfaces (default).
   * paper   - paper V with signal ticks, for ink surfaces.
   * signal  - all signal orange, for ink surfaces.
   * current - inherits currentColor from the parent.
   * gradient, white, cyan - legacy names, mapped to ink, paper and signal.
   */
  variant?: 'ink' | 'paper' | 'signal' | 'current' | 'gradient' | 'white' | 'cyan'
  /** Accessible name. Omit to render the mark as decorative. */
  title?: string
}>(), {
  variant: 'ink',
  title: '',
})

// Unique per instance so the header and footer marks don't collide in the DOM.
const maskId = `vds-seam-${useId()}`

const colours = computed(() => {
  const signal = 'var(--color-signal)'
  switch (props.variant) {
    case 'paper':
    case 'white':
      return { v: 'var(--color-paper)', ticks: signal }
    case 'signal':
    case 'cyan':
      return { v: signal, ticks: signal }
    case 'current':
      return { v: 'currentColor', ticks: 'currentColor' }
    default:
      return { v: 'var(--color-ink)', ticks: signal }
  }
})
</script>
