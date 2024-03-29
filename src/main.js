import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify icon
import '@mdi/font/css/materialdesignicons.css'
// import "@fortawesome/fontawesome-free/css/all.css"; npm install @fortawesome/fontawesome-free -D

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// Translations provided by Vuetify
import { ru } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@/assets/main.css'

const vuetify = createVuetify({
  locale: {
    locale: 'ru',
    fallback: 'ru',
    messages: { ru }
  },
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
