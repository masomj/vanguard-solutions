<template>
  <div>
    <PageHero :title="t('cookiePolicy.title')" :subtitle="t('cookiePolicy.subtitle')" />

    <section class="py-16 lg:py-20">
      <div class="wrap">
        <div class="max-w-3xl cookie-prose">
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

          <div class="quote-sheet p-6 my-8">
            <h3 class="label text-xs text-text-secondary font-normal mt-0 mb-3" style="font-stretch: 100%">{{ t('cookiePolicy.currentPreferenceHeading') }}</h3>
            <p class="mt-0 mb-5">
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
                variant="signal"
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
            <router-link :to="'/contact'">{{ t('cookiePolicy.contactUs') }}</router-link>.
          </p>

          <p class="font-mono text-xs text-text-secondary mt-12">{{ t('cookiePolicy.lastUpdated') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/shared/BaseButton.vue'
import PageHero from '../components/shared/PageHero.vue'
import { useCookieConsent } from '../composables/useCookieConsent'

const { t } = useI18n()
const { consentStatus, acceptCookies, declineCookies, resetConsent } = useCookieConsent()

const statusLabel = computed(() => ({
  accepted: t('cookiePolicy.accepted'),
  declined: t('cookiePolicy.declined'),
  undecided: t('cookiePolicy.undecided'),
}[consentStatus.value]))
</script>

<style scoped>
.cookie-prose h2 {
  font-size: 1.75rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}
.cookie-prose h2:first-child {
  margin-top: 0;
}
.cookie-prose p {
  color: var(--color-ink-soft);
  line-height: 1.75;
  margin-bottom: 1rem;
}
.cookie-prose a {
  color: var(--color-ink);
  text-decoration: underline;
}
.cookie-prose a:hover {
  color: var(--color-accent);
}
.cookie-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9375rem;
}
.cookie-prose th {
  text-align: left;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 2px solid var(--color-ink);
}
.cookie-prose td {
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink-soft);
}
.cookie-prose td:first-child {
  font-family: var(--font-mono);
  color: var(--color-ink);
}
</style>
