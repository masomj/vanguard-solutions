<template>
  <router-link
    :to="localePath(`/portfolio/${item.slug}`)"
    class="group flex flex-col bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary transition-all no-underline"
  >
    <div class="aspect-video bg-surface overflow-hidden">
      <img
        :src="item.heroImage"
        :alt="item.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <div class="p-6 flex flex-col flex-1">
      <p class="text-sm font-semibold text-primary mb-1">{{ item.client }}</p>
      <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
      <p class="text-sm text-text-secondary leading-relaxed flex-1">{{ item.summary }}</p>
      <ul v-if="item.services.length" class="mt-4 flex flex-wrap gap-2 list-none p-0 m-0">
        <li
          v-for="service in item.services"
          :key="service"
          class="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
        >
          {{ service }}
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useLocale } from '../../composables/useLocale'
import type { PortfolioItem } from '../../types'

defineProps<{
  item: PortfolioItem
}>()

const { localePath } = useLocale()
</script>
