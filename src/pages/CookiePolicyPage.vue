<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">Cookie Policy</h1>
        <p class="text-lg text-white/80 max-w-2xl">
          How we use cookies and how you can control your preferences.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto cookie-prose">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website.
            They help website operators understand how visitors interact with their site.
          </p>

          <h2>Cookies We Use</h2>
          <p>This website uses only <strong>analytics cookies</strong> provided by Google Analytics 4 (GA4).</p>

          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Distinguishes unique visitors</td>
                <td>2 years</td>
              </tr>
              <tr>
                <td>_ga_*</td>
                <td>Maintains session state</td>
                <td>2 years</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Distinguishes unique visitors</td>
                <td>24 hours</td>
              </tr>
            </tbody>
          </table>

          <h2>Why We Use Analytics</h2>
          <p>
            We use Google Analytics 4 to understand how visitors use our site, which pages are most
            popular, and how we can improve the user experience. GA4 collects data such as pages
            visited, time spent on pages, and approximate geographic region. We do not collect
            personal data beyond what GA4 provides by default, and IP anonymisation is enabled.
          </p>

          <h2>Your Consent</h2>
          <p>
            Analytics cookies are <strong>only</strong> set after you explicitly consent by clicking
            "Accept" on the cookie banner. If you decline or do not interact with the banner,
            no analytics cookies are set and no tracking occurs.
          </p>

          <h2>Managing Your Preferences</h2>
          <p>
            You can change your cookie preferences at any time using the controls below.
            If you revoke consent, all analytics cookies will be removed and tracking will stop
            immediately.
          </p>

          <div class="rounded-lg border border-border bg-surface p-6">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Your Current Preference</h3>
            <p class="text-sm text-text-secondary mb-4">
              Status:
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
                Accept Cookies
              </BaseButton>
              <BaseButton
                v-if="consentStatus !== 'declined'"
                variant="secondary"
                size="sm"
                @click="declineCookies"
              >
                Decline Cookies
              </BaseButton>
              <BaseButton
                v-if="consentStatus !== 'undecided'"
                variant="secondary"
                size="sm"
                @click="resetConsent"
              >
                Reset Preference
              </BaseButton>
            </div>
          </div>

          <h2>Further Information</h2>
          <p>
            For more details about how Google processes data, see
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's Privacy Policy</a>.
            If you have questions about our use of cookies, please
            <router-link to="/contact">contact us</router-link>.
          </p>

          <p class="text-sm text-text-secondary mt-12">Last updated: March 2026</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../components/shared/BaseButton.vue'
import { useCookieConsent } from '../composables/useCookieConsent'

const { consentStatus, acceptCookies, declineCookies, resetConsent } = useCookieConsent()

const statusLabel = computed(() => ({
  accepted: 'Accepted',
  declined: 'Declined',
  undecided: 'Not yet decided',
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
