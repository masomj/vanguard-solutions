<template>
  <ul :class="['list-none m-0 p-0 grid grid-cols-1 gap-x-10', columns === 2 ? 'md:grid-cols-2' : '']">
    <li
      v-for="(item, index) in items"
      :key="item"
      class="flex gap-4 py-3.5 border-t border-border"
    >
      <span class="font-mono text-xs text-text-secondary pt-1 w-6 shrink-0" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
/** A numbered, ruled list for features and inclusions. Replaces tick-icon lists. */
withDefaults(defineProps<{
  items: string[]
  columns?: 1 | 2
}>(), {
  columns: 2,
})
</script>
