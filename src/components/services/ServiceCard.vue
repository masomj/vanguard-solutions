<template>
  <article class="bg-white rounded-lg border border-border p-6 lg:p-8 hover:shadow-lg transition-shadow">
    <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
      <span class="text-2xl">{{ icon }}</span>
    </div>
    <h3 class="text-xl font-semibold text-text mb-3">{{ title }}</h3>
    <p class="text-text-light leading-relaxed mb-4">{{ description }}</p>
    <ul v-if="features.length" class="space-y-2 mb-4">
      <li v-for="feature in features" :key="feature" class="flex items-start gap-2 text-sm text-text-light">
        <svg class="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ feature }}
      </li>
    </ul>
    <slot />
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  icon: string
  title: string
  description: string
  features?: string[]
}>(), {
  features: () => [],
})
</script>
