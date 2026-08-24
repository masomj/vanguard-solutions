<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('technology.hero.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('technology.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="foundations-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="foundations-heading" :subtitle="t('technology.foundations.subtitle')">
          {{ t('technology.foundations.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="item in foundations" :key="item.title" class="bg-white rounded-lg p-6 border border-border">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
              <span class="text-2xl">{{ item.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="frameworks-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="frameworks-heading" :subtitle="t('technology.frameworks.subtitle')">
          {{ t('technology.frameworks.heading') }}
        </SectionHeading>

        <div class="mt-12 space-y-8">
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">⚡</div>
              <div>
                <h3 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('technology.frameworks.vue.title') }}</h3>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('technology.frameworks.vue.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in vueFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🚀</div>
              <div>
                <h3 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('technology.frameworks.nuxt.title') }}</h3>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('technology.frameworks.nuxt.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in nuxtFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">⚙️</div>
              <div>
                <h3 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('technology.frameworks.vite.title') }}</h3>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('technology.frameworks.vite.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in viteFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="static-sites-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="static-sites-heading" :subtitle="t('technology.staticSites.subtitle')">
          {{ t('technology.staticSites.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.staticSites.p1') }}</p>
            <p>{{ t('technology.staticSites.p2') }}</p>
            <p>{{ t('technology.staticSites.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="builders-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="builders-heading" :subtitle="t('technology.builders.subtitle')">
          {{ t('technology.builders.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.builders.p1') }}</p>
            <p>{{ t('technology.builders.p2') }}</p>
            <p>{{ t('technology.builders.p3') }}</p>
            <p>{{ t('technology.builders.p4') }}</p>
          </div>
          <div class="mt-8 text-center">
            <BaseButton variant="secondary" to="/pricing">{{ t('pricing.hero.title') }}</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="apis-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="apis-heading" :subtitle="t('technology.apis.subtitle')">
          {{ t('technology.apis.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.apis.p1') }}</p>
            <p>{{ t('technology.apis.p2') }}</p>
            <p>{{ t('technology.apis.p3') }}</p>
            <p>{{ t('technology.apis.p4') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="accessibility-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="accessibility-heading" :subtitle="t('technology.accessibility.subtitle')">
          {{ t('technology.accessibility.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.accessibility.p1') }}</p>
            <p>{{ t('technology.accessibility.p2') }}</p>
            <p>{{ t('technology.accessibility.p3') }}</p>
            <p>{{ t('technology.accessibility.p4') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="gdpr-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="gdpr-heading" :subtitle="t('technology.gdpr.subtitle')">
          {{ t('technology.gdpr.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.gdpr.p1') }}</p>
            <p>{{ t('technology.gdpr.p2') }}</p>
            <p>{{ t('technology.gdpr.p3') }}</p>
            <div class="mt-8 rounded-xl bg-primary/5 border border-primary/10 p-5">
              <p class="text-sm text-text-secondary">{{ t('technology.gdpr.disclaimer') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="cloud-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="cloud-heading" :subtitle="t('technology.cloud.subtitle')">
          {{ t('technology.cloud.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.cloud.p1') }}</p>
            <p>{{ t('technology.cloud.p2') }}</p>
            <p>{{ t('technology.cloud.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="containers-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="containers-heading" :subtitle="t('technology.containers.subtitle')">
          {{ t('technology.containers.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.containers.p1') }}</p>
            <p>{{ t('technology.containers.p2') }}</p>
            <p>{{ t('technology.containers.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="performance-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="performance-heading" :subtitle="t('technology.performance.subtitle')">
          {{ t('technology.performance.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.performance.p1') }}</p>
            <p>{{ t('technology.performance.p2') }}</p>
            <p>{{ t('technology.performance.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="seo-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading-id="seo-heading" :subtitle="t('technology.seo.subtitle')">
          {{ t('technology.seo.heading') }}
        </SectionHeading>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="space-y-6 text-text-secondary leading-relaxed">
            <p>{{ t('technology.seo.p1') }}</p>
            <p>{{ t('technology.seo.p2') }}</p>
            <p>{{ t('technology.seo.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../components/shared/SectionHeading.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

const foundations = computed(() => [
  {
    icon: '🏗️',
    title: t('technology.foundations.html.title'),
    description: t('technology.foundations.html.description'),
  },
  {
    icon: '🎨',
    title: t('technology.foundations.css.title'),
    description: t('technology.foundations.css.description'),
  },
  {
    icon: '⚡',
    title: t('technology.foundations.typescript.title'),
    description: t('technology.foundations.typescript.description'),
  },
])

const vueFeatures = computed(() => [
  t('technology.frameworks.vue.f1'),
  t('technology.frameworks.vue.f2'),
  t('technology.frameworks.vue.f3'),
  t('technology.frameworks.vue.f4'),
  t('technology.frameworks.vue.f5'),
  t('technology.frameworks.vue.f6'),
])

const nuxtFeatures = computed(() => [
  t('technology.frameworks.nuxt.f1'),
  t('technology.frameworks.nuxt.f2'),
  t('technology.frameworks.nuxt.f3'),
  t('technology.frameworks.nuxt.f4'),
  t('technology.frameworks.nuxt.f5'),
  t('technology.frameworks.nuxt.f6'),
])

const viteFeatures = computed(() => [
  t('technology.frameworks.vite.f1'),
  t('technology.frameworks.vite.f2'),
  t('technology.frameworks.vite.f3'),
  t('technology.frameworks.vite.f4'),
  t('technology.frameworks.vite.f5'),
  t('technology.frameworks.vite.f6'),
])
</script>
