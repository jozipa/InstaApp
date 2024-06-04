import './assets/main.css'

import "primeflex/primeflex.css";
import 'primevue/resources/themes/md-light-deeppurple/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import modules from '@/store/index.js'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Chip from 'primevue/chip';
import Menubar from 'primevue/menubar';




const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.component("Button", Button)
app.component("Chip", Chip)
app.component("Menubar", Menubar)
app.use(modules).mount('#app')
