import { ViteSSG } from 'vite-ssg'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { i18n } from './i18n'
import './assets/styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
  ({ app, isClient }) => {
    app.use(i18n)

    if (isClient) {
      emailjs.init('xGdd0WXQy-kq81htP')
    }
  }
)
