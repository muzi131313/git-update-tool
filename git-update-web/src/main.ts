import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vClickOutside from "click-outside-vue3"

const app = createApp(App)

app.use(createPinia())
app.use(vClickOutside)

app.mount('#app')
