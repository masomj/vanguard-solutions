import { ref, computed, readonly } from 'vue'
import type { ConsentStatus } from '../types'

const STORAGE_KEY = 'vds_cookie_consent'

function loadStoredConsent(): ConsentStatus {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') return stored
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return 'undecided'
}

function persistConsent(status: ConsentStatus): void {
  try {
    localStorage.setItem(STORAGE_KEY, status)
  } catch {
    // Silently fail
  }
}

// Module-level singleton state
const consentStatus = ref<ConsentStatus>(loadStoredConsent())
const bannerVisible = ref<boolean>(consentStatus.value === 'undecided')

export function useCookieConsent() {
  const hasConsented = computed(() => consentStatus.value === 'accepted')

  function acceptCookies(): void {
    consentStatus.value = 'accepted'
    bannerVisible.value = false
    persistConsent('accepted')
  }

  function declineCookies(): void {
    consentStatus.value = 'declined'
    bannerVisible.value = false
    persistConsent('declined')
  }

  function resetConsent(): void {
    consentStatus.value = 'undecided'
    bannerVisible.value = true
    persistConsent('undecided')
  }

  return {
    consentStatus: readonly(consentStatus),
    bannerVisible: readonly(bannerVisible),
    hasConsented,
    acceptCookies,
    declineCookies,
    resetConsent,
  }
}
