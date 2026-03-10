<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-md transition-colors no-underline focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2',
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
