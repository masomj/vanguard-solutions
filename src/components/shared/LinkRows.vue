<template>
  <ul class="list-none m-0 p-0 border-b border-border">
    <li v-for="link in links" :key="link.to">
      <router-link
        :to="link.to"
        class="link-row grid gap-x-8 gap-y-1 py-6 border-t border-border no-underline text-ink"
      >
        <span class="link-title text-xl sm:text-2xl font-bold transition-colors">{{ link.title }}</span>
        <span class="text-ink-soft">{{ link.description }}</span>
        <span class="hidden lg:block font-mono text-sm text-right" aria-hidden="true">&rarr;</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
/** Cross-links to related pages, as ruled rows. */
defineProps<{
  links: { to: string; title: string; description: string }[]
}>()
</script>

<style scoped>
.link-row:hover .link-title {
  color: var(--color-accent);
}
@media (min-width: 1024px) {
  .link-row {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 3rem;
    align-items: baseline;
  }
}
</style>
