import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import modules from '@/store/index.js'
import PrimeVue from 'primevue/config';
const app = createApp(App)
import Button from "primevue/button"


app.use(router)
app.use(PrimeVue)
app.component("Button", Button)
app.use(modules).mount('#app')
