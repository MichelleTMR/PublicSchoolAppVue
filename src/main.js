import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import './assets/sass/style.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
