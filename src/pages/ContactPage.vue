<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('contactPage.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('contactPage.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div class="lg:col-span-3">
            <ContactForm />
          </div>

          <aside class="lg:col-span-2">
            <div class="bg-surface rounded-lg p-6 lg:p-8 border border-border sticky top-24">
              <h2 class="text-xl font-bold text-text-primary mb-6">{{ t('contactPage.contactInformation') }}</h2>

              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-text-primary text-sm mb-1">{{ t('contactPage.email') }}</h3>
                    <a href="mailto:enquiries@vanguarddigitalsolutions.co.uk" class="text-primary hover:text-primary-light transition-colors no-underline text-sm">
                      enquiries@vanguarddigitalsolutions.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactForm from '../components/contact/ContactForm.vue'

const { t } = useI18n()
</script>
