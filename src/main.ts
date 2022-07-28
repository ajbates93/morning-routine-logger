import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import UUID from 'vue3-uuid'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(UUID)

app.mount('#app')
