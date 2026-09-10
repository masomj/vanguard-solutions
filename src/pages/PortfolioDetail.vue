<template>
  <div v-if="item">
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="mb-4 text-sm text-white/60" :aria-label="t('nav.breadcrumb')">
          <router-link :to="localePath('/')" class="text-white/70 hover:text-white no-underline">{{ t('nav.home') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <router-link :to="localePath('/portfolio')" class="text-white/70 hover:text-white no-underline">{{ t('nav.portfolio') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <span class="text-white/90">{{ item.title }}</span>
        </nav>
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">{{ item.client }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ item.title }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">{{ item.summary }}</p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="portfolio-detail-heading">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="portfolio-detail-heading" class="sr-only">{{ item.title }}</h2>

        <div class="aspect-video rounded-lg overflow-hidden bg-surface mb-12">
          <img :src="item.heroImage" :alt="item.title" class="w-full h-full object-cover" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-6 text-text-secondary leading-relaxed text-lg">
            <p>{{ item.summary }}</p>
          </div>

          <aside class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-2">
                {{ t('portfolioDetail.clientLabel') }}
              </h3>
              <p class="text-text-primary font-medium">{{ item.client }}</p>
            </div>

            <div v-if="item.services.length">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-2">
                {{ t('portfolioDetail.servicesLabel') }}
              </h3>
              <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                <li v-for="service in item.services" :key="service" class="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {{ service }}
                </li>
              </ul>
            </div>

            <div v-if="item.tech.length">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-2">
                {{ t('portfolioDetail.techLabel') }}
              </h3>
              <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                <li v-for="tech in item.tech" :key="tech" class="text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary">
                  {{ tech }}
                </li>
              </ul>
            </div>

            <div v-if="item.externalUrl">
              <a
                :href="item.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center font-semibold rounded-md transition-colors no-underline px-4 py-2 text-sm bg-white hover:bg-surface text-primary border border-primary"
              >
                {{ t('portfolioDetail.visitSite') }}
              </a>
            </div>
          </aside>
        </div>

        <div v-if="item.gallery?.length" class="mt-16">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-4">
            {{ t('portfolioDetail.galleryLabel') }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              v-for="(image, index) in item.gallery"
              :key="image"
              :src="image"
              :alt="t('portfolioDetail.galleryImageAlt', { title: item.title, index: index + 1 })"
              loading="lazy"
              class="w-full rounded-lg border border-border object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>

  <div v-else class="py-24 sm:py-32 text-center">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{{ t('portfolioDetail.notFound.heading') }}</h1>
      <p class="text-lg text-text-secondary mb-8">{{ t('portfolioDetail.notFound.body') }}</p>
      <BaseButton to="/portfolio" variant="primary" size="lg">{{ t('portfolioDetail.notFound.cta') }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { useLocale } from '../composables/useLocale'
import { usePageSchema, creativeWorkSchema } from '../composables/usePageSchema'
import { portfolioItems } from '../data/portfolio'

const route = useRoute()
const { t } = useI18n()
const { localePath } = useLocale()

const item = computed(() => portfolioItems.find((candidate) => candidate.slug === route.params.slug))

usePageSchema(() => (item.value ? creativeWorkSchema(item.value) : []))
</script>
