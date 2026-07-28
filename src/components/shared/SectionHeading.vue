<template>
  <div :class="['text-center', centered ? 'mx-auto max-w-2xl' : '']">
    <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
      <slot />
    </h2>
    <p v-if="subtitle" class="text-lg text-text-secondary leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  subtitle?: string
  centered?: boolean
}>(), {
  centered: true,
})
</script>
