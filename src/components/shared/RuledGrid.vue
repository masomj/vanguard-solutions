<template>
  <ul :class="['list-none m-0 p-0 grid grid-cols-1 gap-x-8', colClass]">
    <li
      v-for="(item, index) in items"
      :key="item.title"
      :class="['py-7 border-t', tone === 'ink' ? 'border-[#3A3E44]' : 'border-border']"
    >
      <span v-if="numbered" :class="['block font-mono text-xs mb-3', tone === 'ink' ? 'text-signal' : 'text-text-secondary']" aria-hidden="true">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <component :is="headingTag" class="text-xl mt-0 mb-2" style="font-stretch: 100%">{{ item.title }}</component>
      <p :class="['text-[0.9375rem] m-0', tone === 'ink' ? 'text-[#D6D6D0]' : 'text-ink-soft']">{{ item.description }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/** Title + description items laid out on a ruled grid. Replaces icon cards. */
const props = withDefaults(defineProps<{
  items: { title: string; description: string }[]
  columns?: 2 | 3 | 4
  numbered?: boolean
  tone?: 'paper' | 'ink'
  headingTag?: 'h3' | 'h4'
}>(), {
  columns: 3,
  numbered: false,
  tone: 'paper',
  headingTag: 'h3',
})

const colClass = computed(() => ({
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}[props.columns]))
</script>
