<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-3 font-semibold transition-colors no-underline whitespace-nowrap',
      sizeClasses,
      variantClasses,
      { 'opacity-60 cursor-not-allowed': disabled },
    ]"
  >
    <slot />
    <span v-if="arrow" aria-hidden="true">&rarr;</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * primary   - ink fill, paper text. The default action on paper.
 * signal    - signal-orange fill, ink text. The one loud action per screen.
 * secondary - ink outline on paper.
 * inverse   - paper fill on ink bands.
 * accent    - legacy alias for signal.
 */
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'signal' | 'secondary' | 'inverse' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  arrow?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  arrow: false,
})

const sizeClasses = computed(() => ({
  sm: 'px-4 min-h-10 text-sm',
  md: 'px-6 min-h-12 text-base',
  lg: 'px-7 min-h-14 text-[1.0625rem]',
}[props.size]))

const variantClasses = computed(() => ({
  primary: 'bg-ink hover:bg-ink-soft text-paper',
  signal: 'bg-signal hover:bg-signal-dark text-ink',
  accent: 'bg-signal hover:bg-signal-dark text-ink',
  secondary: 'bg-transparent hover:bg-ink hover:text-paper text-ink border border-ink',
  inverse: 'bg-paper hover:bg-white text-ink',
}[props.variant]))
</script>
