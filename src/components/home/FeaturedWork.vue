<template>
  <section v-if="item" class="py-24 lg:py-28 bg-ink text-paper" aria-labelledby="work-heading">
    <div class="wrap">
      <p class="label text-signal mb-4">{{ t('home.work.kicker') }}</p>
      <div class="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-16 items-start">
        <div>
          <h2 id="work-heading" class="text-5xl sm:text-7xl mb-2">{{ t(`${base}.title`) }}</h2>
          <p class="label text-[#A6A6A0] mb-7">{{ t(`${base}.category`) }} / {{ t(`${base}.status`) }}</p>
          <p class="text-[#D6D6D0] mb-8">{{ t(`${base}.summary`) }}</p>
          <ul class="list-none m-0 p-0 flex flex-wrap gap-2 font-mono text-xs mb-9" :aria-label="t('portfolioDetail.techLabel')">
            <li v-for="tech in item.tech.slice(0, 7)" :key="tech" class="border border-[#50555B] px-2.5 py-1">{{ tech }}</li>
          </ul>
          <div class="flex flex-wrap gap-6">
            <router-link :to="`/portfolio/${item.slug}`" class="text-paper font-semibold hover:text-signal">
              {{ t('home.work.readCaseStudy') }}
            </router-link>
            <a :href="item.externalLink" class="text-paper font-semibold hover:text-signal" rel="noopener">
              {{ host }} <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>

        <div class="border border-[#3A3E44] bg-[#1C1F23] aspect-[4/3] overflow-hidden">
          <img
            v-if="item.heroImage"
            :src="item.heroImage"
            :alt="t(`${base}.title`)"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <PortfolioPlaceholderImage v-else size="lg" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioPlaceholderImage from '../portfolio/PortfolioPlaceholderImage.vue'
import { portfolioItems } from '../../data/portfolio'

const { t } = useI18n()

/** The most recent case study leads the home page. */
const item = portfolioItems[0]
const base = item ? `portfolioItems.${item.slug}` : ''
const host = computed(() => (item ? new URL(item.externalLink).host : ''))
</script>
