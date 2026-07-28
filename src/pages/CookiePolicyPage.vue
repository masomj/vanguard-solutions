<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('cookiePolicy.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          {{ t('cookiePolicy.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto cookie-prose">
          <h2>{{ t('cookiePolicy.whatAreCookiesHeading') }}</h2>
          <p>
            {{ t('cookiePolicy.whatAreCookiesBody') }}
          </p>

          <h2>{{ t('cookiePolicy.cookiesWeUseHeading') }}</h2>
          <p>{{ t('cookiePolicy.cookiesWeUseBody') }}</p>

          <table>
            <thead>
              <tr>
                <th>{{ t('cookiePolicy.tableCookie') }}</th>
                <th>{{ t('cookiePolicy.tablePurpose') }}</th>
                <th>{{ t('cookiePolicy.tableDuration') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>{{ t('cookiePolicy.gaPurpose') }}</td>
                <td>{{ t('cookiePolicy.gaDuration') }}</td>
              </tr>
              <tr>
                <td>_ga_*</td>
                <td>{{ t('cookiePolicy.gaSessionPurpose') }}</td>
                <td>{{ t('cookiePolicy.gaSessionDuration') }}</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>{{ t('cookiePolicy.gidPurpose') }}</td>
                <td>{{ t('cookiePolicy.gidDuration') }}</td>
              </tr>
            </tbody>
          </table>

          <h2>{{ t('cookiePolicy.analyticsHeading') }}</h2>
          <p>
            {{ t('cookiePolicy.analyticsBody') }}
          </p>

          <h2>{{ t('cookiePolicy.consentHeading') }}</h2>
          <p>
            {{ t('cookiePolicy.consentBody') }}
          </p>

          <h2>{{ t('cookiePolicy.manageHeading') }}</h2>
          <p>
            {{ t('cookiePolicy.manageBody') }}
          </p>

          <div class="rounded-lg border border-border bg-surface p-6">
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ t('cookiePolicy.currentPreferenceHeading') }}</h3>
            <p class="text-sm text-text-secondary mb-4">
              {{ t('cookiePolicy.statusLabel') }}
              <span
                :class="[
                  'font-semibold',
                  consentStatus === 'accepted' ? 'text-success' :
                  consentStatus === 'declined' ? 'text-error' : 'text-text-secondary'
                ]"
              >
                {{ statusLabel }}
              </span>
            </p>
            <div class="flex flex-wrap gap-3">
              <BaseButton
                v-if="consentStatus !== 'accepted'"
                variant="accent"
                size="sm"
                @click="acceptCookies"
              >
                {{ t('cookiePolicy.accept') }}
              </BaseButton>
              <BaseButton
                v-if="consentStatus !== 'declined'"
                variant="secondary"
                size="sm"
                @click="declineCookies"
              >
                {{ t('cookiePolicy.decline') }}
              </BaseButton>
              <BaseButton
                v-if="consentStatus !== 'undecided'"
                variant="secondary"
                size="sm"
                @click="resetConsent"
              >
                {{ t('cookiePolicy.reset') }}
              </BaseButton>
            </div>
          </div>

          <h2>{{ t('cookiePolicy.furtherInfoHeading') }}</h2>
          <p>
            {{ t('cookiePolicy.furtherInfoPart1') }}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              {{ t('cookiePolicy.googlePolicy') }}</a>.
            {{ t('cookiePolicy.furtherInfoPart2') }}
            <router-link :to="localePath('/contact')">{{ t('cookiePolicy.contactUs') }}</router-link>.
          </p>

          <p class="text-sm text-text-secondary mt-12">{{ t('cookiePolicy.lastUpdated') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'
import { useCookieConsent } from '../composables/useCookieConsent'
import { useLocale } from '../composables/useLocale'

const { t } = useI18n()
const { localePath } = useLocale()
const { consentStatus, acceptCookies, declineCookies, resetConsent } = useCookieConsent()

const statusLabel = computed(() => ({
  accepted: t('cookiePolicy.accepted'),
  declined: t('cookiePolicy.declined'),
  undecided: t('cookiePolicy.undecided'),
}[consentStatus.value]))
</script>

<style scoped>
.cookie-prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.cookie-prose h2:first-child {
  margin-top: 0;
}

.cookie-prose p {
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 1rem;
}

.cookie-prose a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color 0.15s;
}

.cookie-prose a:hover {
  color: var(--color-primary-light);
}

.cookie-prose strong {
  color: var(--color-text-primary);
  font-weight: 600;
}

.cookie-prose table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.cookie-prose th {
  text-align: left;
  font-weight: 600;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
}

.cookie-prose td {
  color: var(--color-text-secondary);
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
}
</style>
