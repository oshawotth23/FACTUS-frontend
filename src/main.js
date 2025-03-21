import { createApp } from 'vue'
import {Quasar} from 'quasar'
import {router} from "./router/routes.js"
import {createPinia} from 'pinia'


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'


import App from './App.vue'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const myApp = createApp(App)

myApp.use(Quasar, {
    plugins: {},  
})

myApp.use(router)
myApp.use(pinia)
myApp.mount('#app')