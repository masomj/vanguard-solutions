<template>
  <div>
    <PageHero :kicker="t('nav.contact')" :title="t('contactPage.title')" :subtitle="t('contactPage.subtitle')" />

    <section class="py-16 lg:py-20">
      <div class="wrap grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-12 lg:gap-16 items-start">
        <ContactForm />

        <aside class="lg:sticky lg:top-28">
          <dl class="m-0 border-t-2 border-ink">
            <div class="py-5 border-b border-border">
              <dt class="label text-xs text-text-secondary mb-2">{{ t('contactPage.email') }}</dt>
              <dd class="m-0">
                <a href="mailto:enquiries@vanguarddigitalsolutions.co.uk" class="font-semibold text-ink break-all">
                  enquiries@vanguarddigitalsolutions.co.uk
                </a>
              </dd>
            </div>
            <div class="py-5 border-b border-border">
              <dt class="label text-xs text-text-secondary mb-2">{{ t('contactPage.responseHeading') }}</dt>
              <dd class="m-0 text-ink-soft">{{ t('contactPage.responseBody') }}</dd>
            </div>
            <div class="py-5 border-b border-border">
              <dt class="label text-xs text-text-secondary mb-2">{{ t('contactPage.beforeYouAskHeading') }}</dt>
              <dd class="m-0 text-ink-soft">
                {{ t('contactPage.beforeYouAskBody') }}
                <router-link to="/pricing" class="block mt-3 font-semibold text-ink">
                  {{ t('contactPage.beforeYouAskCta') }} <span aria-hidden="true">&rarr;</span>
                </router-link>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHero from '../components/shared/PageHero.vue'
import ContactForm from '../components/contact/ContactForm.vue'

const { t } = useI18n()
</script>
