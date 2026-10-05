<template>
  <div>
    <PageHero :kicker="t('nav.services')" :title="t('servicesPage.title')" :subtitle="t('servicesPage.subtitle')">
      <template #aside>
        <nav :aria-label="t('servicesPage.allServices')">
          <ol class="list-none m-0 p-0 border-t-2 border-ink">
            <li v-for="(service, index) in services" :key="service.id" class="border-b border-border">
              <a :href="`#${service.id}`" class="flex gap-4 py-3 no-underline text-ink hover:text-accent">
                <span class="font-mono text-xs text-text-secondary pt-1">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="font-semibold">{{ service.title }}</span>
              </a>
            </li>
          </ol>
        </nav>
      </template>
    </PageHero>

    <section
      v-for="(service, index) in services"
      :id="service.id"
      :key="service.id"
      :class="['py-20 lg:py-24 border-t border-border', index % 2 === 1 ? 'bg-white' : '']"
      :aria-labelledby="`${service.id}-heading`"
    >
      <div class="wrap grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
        <div>
          <p class="label text-accent mb-4">{{ String(index + 1).padStart(2, '0') }}</p>
          <h2 :id="`${service.id}-heading`" class="text-[clamp(1.875rem,9.5vw,2.25rem)] sm:text-[2.75rem] mt-0 mb-5">{{ service.title }}</h2>
          <p class="text-ink-soft mt-0 mb-6">{{ service.description }}</p>
          <router-link v-if="service.to" :to="service.to" class="font-semibold text-ink">
            {{ t('servicesPage.readMore', { service: service.navLabel }) }} <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
        <div>
          <RuledList :items="service.features" />

          <div v-if="service.id === 'booking'" class="mt-8 pt-5 border-t-2 border-ink">
            <p class="label text-text-secondary mt-0 mb-2">{{ t('servicesPage.booking.integrationsHeading') }}</p>
            <p class="m-0">{{ t('servicesPage.booking.integrationsList') }}</p>
          </div>

          <div v-if="service.id === 'bespoke'" class="mt-10">
            <h3 class="label text-text-secondary font-normal mt-0 mb-2" style="font-stretch: 100%">{{ t('servicesPage.bespoke.approachHeading') }}</h3>
            <RuledGrid :items="approach" :columns="3" numbered heading-tag="h4" />
          </div>
        </div>
      </div>
    </section>

    <PageSection
      heading-id="related-heading"
      :heading="t('servicesPage.related.heading')"
      :subtitle="t('servicesPage.related.subtitle')"
      tone="white"
    >
      <LinkRows :links="relatedLinks" />
    </PageSection>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import PageSection from '../components/shared/PageSection.vue'
import RuledList from '../components/shared/RuledList.vue'
import RuledGrid from '../components/shared/RuledGrid.vue'
import LinkRows from '../components/shared/LinkRows.vue'
import CallToAction from '../components/home/CallToAction.vue'

const { t } = useI18n()

const features = (key: string) => [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`servicesPage.${key}.f${n}`))

const services = computed(() => [
  { id: 'small-business', key: 'smallBusiness', to: '/small-business', navLabel: t('nav.smallBusiness') },
  { id: 'ecommerce', key: 'ecommerce', to: '/services/ecommerce', navLabel: t('serviceDetail.ecommerce.navLabel') },
  { id: 'booking', key: 'booking', to: '/services/booking-systems', navLabel: t('serviceDetail.booking.navLabel') },
  { id: 'business-websites', key: 'brochure', to: '/services/business-website', navLabel: t('serviceDetail.businessWebsite.navLabel') },
  { id: 'bespoke', key: 'bespoke', to: '/services/bespoke-software', navLabel: t('serviceDetail.bespoke.navLabel') },
  { id: 'integrations', key: 'integrations', to: '', navLabel: '' },
].map((s) => ({
  ...s,
  title: t(`servicesPage.${s.key}.title`),
  description: t(`servicesPage.${s.key}.description`),
  features: features(s.key),
})))

const approach = computed(() =>
  [1, 2, 3].map((n) => ({
    title: t(`servicesPage.bespoke.approach${n}Title`),
    description: t(`servicesPage.bespoke.approach${n}Description`),
  }))
)

const relatedLinks = computed(() => [
  { to: '/technology', title: t('servicesPage.related.link1Title'), description: t('servicesPage.related.link1Description') },
  { to: '/process', title: t('servicesPage.related.link2Title'), description: t('servicesPage.related.link2Description') },
  { to: '/small-business', title: t('servicesPage.related.link3Title'), description: t('servicesPage.related.link3Description') },
  { to: '/pricing', title: t('servicesPage.related.link4Title'), description: t('servicesPage.related.link4Description') },
])
</script>
