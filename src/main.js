import './assets/style/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import '@/api'
import IconSvg from './components/IconSvg.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 注册 element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component(IconSvg)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
