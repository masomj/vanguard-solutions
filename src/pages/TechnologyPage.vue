<template>
  <div>
    <PageHero :kicker="t('nav.technology')" :title="t('technology.hero.title')" :subtitle="t('technology.hero.subtitle')" />

    <div class="wrap grid grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)] gap-10 lg:gap-16 py-16 lg:py-20">
      <!-- Contents: a printed spec sheet, sticky on wide screens. -->
      <nav class="hidden lg:block" :aria-label="t('technology.contents')">
        <div class="sticky top-28">
          <p class="label text-text-secondary mt-0 mb-3">{{ t('technology.contents') }}</p>
          <ol class="list-none m-0 p-0 border-t-2 border-ink">
            <li v-for="(section, index) in sections" :key="section.id" class="border-b border-border">
              <a :href="`#${section.id}`" class="flex gap-3 py-2.5 text-[0.9375rem] no-underline text-ink hover:text-accent">
                <span class="font-mono text-xs text-text-secondary pt-1">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ section.heading }}
              </a>
            </li>
          </ol>
        </div>
      </nav>

      <div>
        <section
          v-for="(section, index) in sections"
          :id="section.id"
          :key="section.id"
          :class="['pb-14 mb-14 border-b border-border last:border-b-0 last:mb-0', index === 0 ? '' : '']"
          :aria-labelledby="`${section.id}-heading`"
        >
          <p class="label text-accent mt-0 mb-3">{{ String(index + 1).padStart(2, '0') }}</p>
          <h2 :id="`${section.id}-heading`" class="text-[clamp(1.625rem,8.5vw,1.875rem)] sm:text-4xl mt-0 mb-3">{{ section.heading }}</h2>
          <p class="text-lg text-text-secondary mt-0 mb-8">{{ section.subtitle }}</p>

          <!-- Foundations: three short items. -->
          <RuledGrid v-if="section.id === 'foundations'" :items="foundations" heading-tag="h3" />

          <!-- Frameworks: description plus feature list per tool. -->
          <div v-else-if="section.id === 'frameworks'" class="space-y-12">
            <div v-for="fw in frameworks" :key="fw.title">
              <h3 class="text-2xl mt-0 mb-3" style="font-stretch: 100%">{{ fw.title }}</h3>
              <p class="text-ink-soft mt-0 mb-5 max-w-3xl">{{ fw.description }}</p>
              <RuledList :items="fw.features" />
            </div>
          </div>

          <div v-else class="prose-vds max-w-3xl">
            <p v-for="para in section.paragraphs" :key="para">{{ para }}</p>
            <p v-if="section.id === 'gdpr'" class="font-mono text-[0.8125rem] text-text-secondary border-t border-border pt-4">
              {{ t('technology.gdpr.disclaimer') }}
            </p>
            <p v-if="section.id === 'builders'" class="mt-8">
              <router-link to="/pricing" class="font-semibold text-ink">{{ t('nav.pricing') }} <span aria-hidden="true">&rarr;</span></router-link>
            </p>
          </div>
        </section>
      </div>
    </div>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import RuledGrid from '../components/shared/RuledGrid.vue'
import RuledList from '../components/shared/RuledList.vue'
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

/** Order of the long-read. Each key maps to `technology.<key>` in en.json. */
const order: { id: string; key: string; paras: number }[] = [
  { id: 'foundations', key: 'foundations', paras: 0 },
  { id: 'frameworks', key: 'frameworks', paras: 0 },
  { id: 'static-sites', key: 'staticSites', paras: 3 },
  { id: 'builders', key: 'builders', paras: 4 },
  { id: 'apis', key: 'apis', paras: 4 },
  { id: 'accessibility', key: 'accessibility', paras: 4 },
  { id: 'gdpr', key: 'gdpr', paras: 3 },
  { id: 'cloud', key: 'cloud', paras: 3 },
  { id: 'containers', key: 'containers', paras: 3 },
  { id: 'performance', key: 'performance', paras: 3 },
  { id: 'seo', key: 'seo', paras: 3 },
]

const sections = computed(() =>
  order.map((s) => ({
    id: s.id,
    heading: t(`technology.${s.key}.heading`),
    subtitle: t(`technology.${s.key}.subtitle`),
    paragraphs: Array.from({ length: s.paras }, (_, i) => t(`technology.${s.key}.p${i + 1}`)),
  }))
)

const foundations = computed(() =>
  ['html', 'css', 'typescript'].map((k) => ({
    title: t(`technology.foundations.${k}.title`),
    description: t(`technology.foundations.${k}.description`),
  }))
)

const frameworks = computed(() =>
  ['vue', 'nuxt', 'vite'].map((k) => ({
    title: t(`technology.frameworks.${k}.title`),
    description: t(`technology.frameworks.${k}.description`),
    features: [1, 2, 3, 4, 5, 6].map((n) => t(`technology.frameworks.${k}.f${n}`)),
  }))
)
</script>
