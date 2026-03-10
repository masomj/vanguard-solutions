import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCookieConsent } from './useCookieConsent'

const GA_MEASUREMENT_ID = 'G-3P6Z7MTJLN'
let scriptLoaded = false

function injectGtagScript(): void {
  if (scriptLoaded) return
  scriptLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function (..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
}

function removeGtagScript(): void {
  document
    .querySelectorAll('script[src*="googletagmanager.com/gtag"]')
    .forEach((el) => el.remove())

  window.dataLayer = []
  window.gtag = undefined

  // Delete GA cookies
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim()
    if (name && (name.startsWith('_ga') || name.startsWith('_gid'))) {
      const hostname = window.location.hostname
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`
    }
  })

  scriptLoaded = false
}

function trackPageView(path: string): void {
  if (!scriptLoaded || !window.gtag) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: path })
}

export function useAnalytics(): void {
  const { consentStatus, hasConsented } = useCookieConsent()
  const router = useRouter()

  watch(
    consentStatus,
    (status) => {
      if (status === 'accepted') {
        injectGtagScript()
        trackPageView(router.currentRoute.value.fullPath)
      } else if (status === 'declined') {
        removeGtagScript()
      }
    },
    { immediate: true },
  )

  router.afterEach((to) => {
    if (hasConsented.value) {
      trackPageView(to.fullPath)
    }
  })
}
