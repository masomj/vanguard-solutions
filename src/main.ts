import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

emailjs.init('xGdd0WXQy-kq81htP')

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)

router.isReady().then(() => app.mount('#app'))
