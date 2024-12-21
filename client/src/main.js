import { createApp } from 'vue'
import App from './App.vue'

import './css/common.css'
import * as Tools from './utils/tools.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router/index'
import store from './store'
import API from './network'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.provide('$API', API)
app.provide('$Tools', Tools)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
