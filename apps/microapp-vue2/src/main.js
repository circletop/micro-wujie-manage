import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// 这些生命周期函数将允许 wujie 正确管理应用
if (window.__POWERED_BY_WUJIE__) {
  let instance
  window.__WUJIE_MOUNT = () => {
    instance = app.mount('#app')
  }
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount()
  }
} else {
  app.mount('#app')
}