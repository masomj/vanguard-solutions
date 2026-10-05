<template>
  <router-link :to="`/portfolio/${item.slug}`" class="group flex flex-col no-underline text-ink border-t-2 border-ink pt-5">
    <div class="aspect-video bg-ink overflow-hidden mb-5">
      <img
        v-if="item.heroImage"
        :src="item.heroImage"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
      />
      <PortfolioPlaceholderImage v-else size="sm" />
    </div>
    <p class="label text-xs text-text-secondary mt-0 mb-2">{{ category }} / {{ status }}</p>
    <h3 class="text-2xl mt-0 mb-2 group-hover:text-accent transition-colors" style="font-stretch: 100%">{{ title }}</h3>
    <p class="text-ink-soft m-0">{{ summary }}</p>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioPlaceholderImage from './PortfolioPlaceholderImage.vue'
import type { PortfolioItem } from '../../types'

const props = defineProps<{
  item: PortfolioItem
}>()

const { t } = useI18n()

const title = computed(() => t(`portfolioItems.${props.item.slug}.title`))
const category = computed(() => t(`portfolioItems.${props.item.slug}.category`))
const summary = computed(() => t(`portfolioItems.${props.item.slug}.summary`))
const status = computed(() => t(`portfolioItems.${props.item.slug}.status`))
</script>
