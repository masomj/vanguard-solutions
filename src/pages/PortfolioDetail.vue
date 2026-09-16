<template>
  <div v-if="item">
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="mb-4 text-sm text-white/60" :aria-label="t('nav.breadcrumb')">
          <router-link :to="localePath('/')" class="text-white/70 hover:text-white no-underline">{{ t('nav.home') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <router-link :to="localePath('/portfolio')" class="text-white/70 hover:text-white no-underline">{{ t('nav.portfolio') }}</router-link>
          <span class="mx-2" aria-hidden="true">/</span>
          <span class="text-white/90">{{ title }}</span>
        </nav>
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">{{ client }}</p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ title }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">{{ summary }}</p>
        <p class="mt-4 inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full bg-white/10 text-white/90">
          {{ status }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="portfolio-detail-heading">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="portfolio-detail-heading" class="sr-only">{{ title }}</h2>

        <div class="aspect-video rounded-lg overflow-hidden bg-surface mb-12">
          <img v-if="item.heroImage" :src="item.heroImage" :alt="title" class="w-full h-full object-cover" />
          <PortfolioPlaceholderImage v-else size="lg" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-6 text-text-secondary leading-relaxed text-lg">
            <p>{{ description }}</p>

            <div v-if="features.length">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-3">
                {{ t('portfolioDetail.featuresLabel') }}
              </h3>
              <ul class="space-y-2 list-none p-0 m-0">
                <li v-for="feature in features" :key="feature" class="flex items-start gap-2 text-base">
                  <svg class="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>

          <aside class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-2">
                {{ t('portfolioDetail.clientLabel') }}
              </h3>
              <p class="text-text-primary font-medium">{{ client }}</p>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wide text-text-secondary mb-2">
                {{ t('portfolioDetail.statusLabel') }}
              </h3>
              <p class="text-text-primary font-medium">{{ status }}</p>
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

            <div v-if="item.externalLink">
              <a
                :href="item.externalLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center font-semibold rounded-md transition-colors no-underline px-4 py-2 text-sm bg-white hover:bg-surface text-primary border border-primary"
              >
                {{ t('portfolioDetail.visitSite') }}
              </a>
            </div>
          </aside>
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
import PortfolioPlaceholderImage from '../components/portfolio/PortfolioPlaceholderImage.vue'
import { useLocale } from '../composables/useLocale'
import { usePageSchema, creativeWorkSchema, breadcrumbListSchema } from '../composables/usePageSchema'
import { portfolioItems } from '../data/portfolio'

const route = useRoute()
const { t, tm } = useI18n()
const { localePath } = useLocale()

const item = computed(() => portfolioItems.find((candidate) => candidate.slug === route.params.slug))

const title = computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.title`) : ''))
const client = computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.client`) : ''))
const status = computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.status`) : ''))
const summary = computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.summary`) : ''))
const description = computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.description`) : ''))
// Feature count varies per project, so it's a translated array (tm), not a
// fixed f1..fN set like the service pages' checklists.
const features = computed(() => (item.value ? (tm(`portfolioItems.${item.value.slug}.features`) as string[]) : []))

usePageSchema(() =>
  item.value
    ? [
        creativeWorkSchema({
          slug: item.value.slug,
          title: title.value,
          description: description.value,
          image: item.value.heroImage,
          tech: item.value.tech,
          externalLink: item.value.externalLink,
        }),
        breadcrumbListSchema([
          { name: t('nav.home'), path: localePath('/') },
          { name: t('nav.portfolio'), path: localePath('/portfolio') },
          { name: title.value, path: localePath(`/portfolio/${item.value.slug}`) },
        ]),
      ]
    : []
)
</script>
