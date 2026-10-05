<template>
  <div class="w-full h-full flex items-center justify-center bg-ink relative overflow-hidden" aria-hidden="true">
    <BrandLogo variant="paper" :class="markSizeClass" class="relative" />
  </div>
</template>

<script setup lang="ts">
/**
 * Brand-mark placeholder for a portfolio entry with no heroImage. Deliberately
 * not a "broken image" icon -- some entries will carry this permanently
 * rather than as a loading state (not every build is worth a screenshot), so
 * it needs to read as an intentional design choice, not an unfinished one.
 */
import { computed } from 'vue'
import BrandLogo from '../shared/BrandLogo.vue'

const props = withDefaults(
  defineProps<{
    /** sm - grid card thumbnail. lg - detail page hero. */
    size?: 'sm' | 'lg'
  }>(),
  { size: 'sm' }
)

const markSizeClass = computed(() => (props.size === 'lg' ? 'w-20 h-auto sm:w-28' : 'w-12 h-auto'))
</script>
