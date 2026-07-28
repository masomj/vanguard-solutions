<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="localisedTo"
    :type="to ? undefined : type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-md transition-colors no-underline',
      sizeClasses,
      variantClasses,
      { 'opacity-60 cursor-not-allowed': disabled },
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../../composables/useLocale'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const { localePath } = useLocale()

// Callers pass locale-agnostic paths ('/contact'); keep the visitor in their tree.
const localisedTo = computed(() => (props.to ? localePath(props.to) : undefined))

const sizeClasses = computed(() => ({
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}[props.size]))

const variantClasses = computed(() => ({
  primary: 'bg-primary hover:bg-primary-light text-white',
  secondary: 'bg-white hover:bg-surface text-primary border border-primary',
  accent: 'bg-accent hover:bg-accent-light text-white',
}[props.variant]))
</script>
