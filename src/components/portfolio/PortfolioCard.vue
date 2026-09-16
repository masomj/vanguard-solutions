<template>
  <router-link
    :to="localePath(`/portfolio/${item.slug}`)"
    class="group flex flex-col bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary transition-all no-underline"
  >
    <div class="aspect-video bg-surface overflow-hidden">
      <img
        v-if="item.heroImage"
        :src="item.heroImage"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      <div v-else class="w-full h-full flex items-center justify-center" aria-hidden="true">
        <svg class="w-10 h-10 text-text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
        </svg>
      </div>
    </div>
    <div class="p-6 flex flex-col flex-1">
      <p class="text-sm font-semibold text-primary mb-1">{{ client }}</p>
      <h3 class="text-lg font-semibold text-text-primary mb-2">{{ title }}</h3>
      <p class="text-sm text-text-secondary leading-relaxed flex-1">{{ summary }}</p>
      <p class="mt-4 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary self-start">
        {{ status }}
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import type { PortfolioItem } from '../../types'

const props = defineProps<{
  item: PortfolioItem
}>()

const { t } = useI18n()
const { localePath } = useLocale()

const title = computed(() => t(`portfolioItems.${props.item.slug}.title`))
const client = computed(() => t(`portfolioItems.${props.item.slug}.client`))
const summary = computed(() => t(`portfolioItems.${props.item.slug}.summary`))
const status = computed(() => t(`portfolioItems.${props.item.slug}.status`))
</script>
