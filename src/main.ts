import { ViteSSG } from 'vite-ssg'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { createAppI18n, getRememberedLocale } from './i18n'
import { defaultLocale, localeFromPath, localisePath, type AppLocale } from './i18n/locales'
import './assets/styles/main.css'

function localeOf(path: string, meta: unknown): AppLocale {
  return (meta as AppLocale | undefined) ?? localeFromPath(path)
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
  ({ app, router }) => {
    // One i18n instance per app, never shared -- see createAppI18n.
    const i18n = createAppI18n()
    app.use(i18n)

    // The URL decides the locale, on the client and during prerender alike.
    router.beforeEach((to) => {
      i18n.global.locale.value = localeOf(to.path, to.meta.locale)
    })

    if (!import.meta.env.SSR) {
      emailjs.init('xGdd0WXQy-kq81htP')

      // First navigation only: if the visitor previously chose Welsh and has
      // landed on an unprefixed (English) URL, send them to the Welsh
      // equivalent. Switching language stores 'en', so this is always
      // escapable, and an explicit /cy/... link is never redirected away.
      let firstNavigation = true
      router.beforeEach((to) => {
        if (!firstNavigation) return
        firstNavigation = false

        const remembered = getRememberedLocale()
        if (!remembered || remembered === defaultLocale) return
        if (localeFromPath(to.path) !== defaultLocale) return

        return localisePath(to.path, remembered)
      })
    }
  }
)
