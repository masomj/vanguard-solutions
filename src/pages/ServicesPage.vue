<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('servicesPage.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('servicesPage.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-list-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="services-list-heading" class="sr-only">{{ t('servicesPage.allServices') }}</h2>
        <div class="space-y-16">
          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🎨</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.smallBusiness.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.smallBusiness.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in smallBizFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🛒</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.ecommerce.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.ecommerce.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in ecomFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">📅</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.booking.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.booking.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in bookingFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
            <div class="mt-8 rounded-xl bg-primary/5 border border-primary/10 p-5">
              <p class="text-sm font-semibold text-text-primary mb-1">{{ t('servicesPage.booking.integrationsHeading') }}</p>
              <p class="text-sm text-text-secondary">{{ t('servicesPage.booking.integrationsList') }}</p>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">📋</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.brochure.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.brochure.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in infoFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">⚙️</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.bespoke.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.bespoke.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in bespokeFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
            <div class="mt-10 border-t border-border pt-8">
              <h3 class="text-lg font-semibold text-text-primary mb-4">{{ t('servicesPage.bespoke.approachHeading') }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="item in deliveryApproach" :key="item.title" class="rounded-lg border border-border bg-white px-4 py-4">
                  <p class="font-semibold text-text-primary text-sm">{{ item.title }}</p>
                  <p class="mt-1 text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </article>

          <article class="rounded-2xl border border-border bg-surface p-6 sm:p-10">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">🔗</div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">{{ t('servicesPage.integrations.title') }}</h2>
                <p class="mt-2 text-text-secondary leading-relaxed max-w-3xl">
                  {{ t('servicesPage.integrations.description') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div v-for="f in integrationFeatures" :key="f" class="rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-secondary">
                <span class="text-primary font-semibold mr-2" aria-hidden="true">+</span>{{ f }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-surface" aria-labelledby="related-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading :subtitle="t('servicesPage.related.subtitle')">
          {{ t('servicesPage.related.heading') }}
        </SectionHeading>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <router-link v-for="link in relatedLinks" :key="link.to" :to="link.to"
            class="bg-white rounded-lg p-6 border border-border hover:border-primary transition-colors flex flex-col gap-3">
            <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center" aria-hidden="true">
              <span class="text-2xl">{{ link.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary">{{ link.title }}</h3>
            <p class="text-sm text-text-secondary leading-relaxed flex-1">{{ link.description }}</p>
          </router-link>
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
import CallToAction from '../components/home/CallToAction.vue'
import { useLocale } from '../composables/useLocale'

const { t } = useI18n()
const { localePath } = useLocale()

const smallBizFeatures = computed(() => [
  t('servicesPage.smallBusiness.f1'),
  t('servicesPage.smallBusiness.f2'),
  t('servicesPage.smallBusiness.f3'),
  t('servicesPage.smallBusiness.f4'),
  t('servicesPage.smallBusiness.f5'),
  t('servicesPage.smallBusiness.f6'),
  t('servicesPage.smallBusiness.f7'),
  t('servicesPage.smallBusiness.f8'),
])

const ecomFeatures = computed(() => [
  t('servicesPage.ecommerce.f1'),
  t('servicesPage.ecommerce.f2'),
  t('servicesPage.ecommerce.f3'),
  t('servicesPage.ecommerce.f4'),
  t('servicesPage.ecommerce.f5'),
  t('servicesPage.ecommerce.f6'),
  t('servicesPage.ecommerce.f7'),
  t('servicesPage.ecommerce.f8'),
])

const bookingFeatures = computed(() => [
  t('servicesPage.booking.f1'),
  t('servicesPage.booking.f2'),
  t('servicesPage.booking.f3'),
  t('servicesPage.booking.f4'),
  t('servicesPage.booking.f5'),
  t('servicesPage.booking.f6'),
  t('servicesPage.booking.f7'),
  t('servicesPage.booking.f8'),
])

const infoFeatures = computed(() => [
  t('servicesPage.brochure.f1'),
  t('servicesPage.brochure.f2'),
  t('servicesPage.brochure.f3'),
  t('servicesPage.brochure.f4'),
  t('servicesPage.brochure.f5'),
  t('servicesPage.brochure.f6'),
  t('servicesPage.brochure.f7'),
  t('servicesPage.brochure.f8'),
])

const bespokeFeatures = computed(() => [
  t('servicesPage.bespoke.f1'),
  t('servicesPage.bespoke.f2'),
  t('servicesPage.bespoke.f3'),
  t('servicesPage.bespoke.f4'),
  t('servicesPage.bespoke.f5'),
  t('servicesPage.bespoke.f6'),
  t('servicesPage.bespoke.f7'),
  t('servicesPage.bespoke.f8'),
])

const integrationFeatures = computed(() => [
  t('servicesPage.integrations.f1'),
  t('servicesPage.integrations.f2'),
  t('servicesPage.integrations.f3'),
  t('servicesPage.integrations.f4'),
  t('servicesPage.integrations.f5'),
  t('servicesPage.integrations.f6'),
  t('servicesPage.integrations.f7'),
  t('servicesPage.integrations.f8'),
])

const deliveryApproach = computed(() => [
  {
    title: t('servicesPage.bespoke.approach1Title'),
    description: t('servicesPage.bespoke.approach1Description'),
  },
  {
    title: t('servicesPage.bespoke.approach2Title'),
    description: t('servicesPage.bespoke.approach2Description'),
  },
  {
    title: t('servicesPage.bespoke.approach3Title'),
    description: t('servicesPage.bespoke.approach3Description'),
  },
])

const relatedLinks = computed(() => [
  {
    to: localePath('/technology'),
    icon: '⚡',
    title: t('servicesPage.related.link1Title'),
    description: t('servicesPage.related.link1Description'),
  },
  {
    to: localePath('/process'),
    icon: '📋',
    title: t('servicesPage.related.link2Title'),
    description: t('servicesPage.related.link2Description'),
  },
  {
    to: localePath('/small-business'),
    icon: '🎨',
    title: t('servicesPage.related.link3Title'),
    description: t('servicesPage.related.link3Description'),
  },
])
</script>
