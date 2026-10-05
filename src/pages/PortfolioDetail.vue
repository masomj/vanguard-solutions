<template>
  <div v-if="item">
    <PageHero
      :kicker="`${category} / ${status}`"
      :title="title"
      :subtitle="summary"
      :crumbs="[{ to: '/', label: t('nav.home') }, { to: '/portfolio', label: t('nav.portfolio') }]"
    />

    <section class="py-16 lg:py-20" aria-labelledby="portfolio-detail-heading">
      <div class="wrap">
        <h2 id="portfolio-detail-heading" class="sr-only">{{ title }}</h2>
        <div class="aspect-video overflow-hidden bg-ink mb-14">
          <img v-if="item.heroImage" :src="item.heroImage" :alt="title" class="w-full h-full object-cover" />
          <PortfolioPlaceholderImage v-else size="lg" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-12 lg:gap-16">
          <div>
            <div class="prose-vds text-lg max-w-3xl">
              <p>{{ description }}</p>
            </div>
            <div v-if="features.length" class="mt-12">
              <h3 class="label text-text-secondary font-normal mt-0 mb-3" style="font-stretch: 100%">{{ t('portfolioDetail.featuresLabel') }}</h3>
              <RuledList :items="features" :columns="1" />
            </div>
          </div>

          <aside>
            <dl class="m-0 border-t-2 border-ink">
              <div class="py-4 border-b border-border">
                <dt class="label text-xs text-text-secondary mb-1">{{ t('portfolioDetail.clientLabel') }}</dt>
                <dd class="m-0 font-semibold">{{ client }}</dd>
              </div>
              <div class="py-4 border-b border-border">
                <dt class="label text-xs text-text-secondary mb-1">{{ t('portfolioDetail.statusLabel') }}</dt>
                <dd class="m-0 font-semibold">{{ status }}</dd>
              </div>
              <div v-if="item.tech.length" class="py-4 border-b border-border">
                <dt class="label text-xs text-text-secondary mb-2">{{ t('portfolioDetail.techLabel') }}</dt>
                <dd class="m-0">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0 font-mono text-xs">
                    <li v-for="tech in item.tech" :key="tech" class="border border-ink px-2.5 py-1">{{ tech }}</li>
                  </ul>
                </dd>
              </div>
            </dl>
            <a
              v-if="item.externalLink"
              :href="item.externalLink"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex items-center gap-2 min-h-12 px-6 bg-ink hover:bg-ink-soft text-paper font-semibold no-underline"
            >
              {{ t('portfolioDetail.visitSite') }} <span aria-hidden="true">&#8599;</span>
            </a>
          </aside>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>

  <section v-else class="py-24 sm:py-32" aria-labelledby="portfolio-missing-heading">
    <div class="wrap">
      <h1 id="portfolio-missing-heading" class="display text-5xl mt-0 mb-6">{{ t('portfolioDetail.notFound.heading') }}</h1>
      <p class="text-xl text-ink-soft mt-0 mb-10 max-w-xl">{{ t('portfolioDetail.notFound.body') }}</p>
      <BaseButton to="/portfolio" size="lg">{{ t('portfolioDetail.notFound.cta') }}</BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import RuledList from '../components/shared/RuledList.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import CallToAction from '../components/home/CallToAction.vue'
import PortfolioPlaceholderImage from '../components/portfolio/PortfolioPlaceholderImage.vue'
import { usePageSchema, creativeWorkSchema, breadcrumbListSchema } from '../composables/usePageSchema'
import { portfolioItems } from '../data/portfolio'

const route = useRoute()
const { t, tm } = useI18n()

const item = computed(() => portfolioItems.find((candidate) => candidate.slug === route.params.slug))

const field = (name: string) => computed(() => (item.value ? t(`portfolioItems.${item.value.slug}.${name}`) : ''))
const title = field('title')
const client = field('client')
const status = field('status')
const category = field('category')
const summary = field('summary')
const description = field('description')

// Feature count varies per project, so it's an array (tm), not a fixed
// f1..fN set like the service pages' lists.
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
          { name: t('nav.home'), path: '/' },
          { name: t('nav.portfolio'), path: '/portfolio' },
          { name: title.value, path: `/portfolio/${item.value.slug}` },
        ]),
      ]
    : []
)
</script>
