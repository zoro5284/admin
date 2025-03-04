import './assets/style/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import '@/api'
import IconSvg from './components/IconSvg.vue'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.component(IconSvg)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
