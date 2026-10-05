import { ViteSSG } from 'vite-ssg'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { createAppI18n } from './i18n'
// Fonts are self-hosted (no request to Google before cookie consent).
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './assets/styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
  ({ app }) => {
    // One i18n instance per app, never shared -- see createAppI18n.
    app.use(createAppI18n())

    if (!import.meta.env.SSR) {
      emailjs.init('xGdd0WXQy-kq81htP')
    }
  }
)
