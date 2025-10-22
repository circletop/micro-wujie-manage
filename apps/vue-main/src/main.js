import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { registerMicroApps } from './wujie-register'

// try to register wujie vue plugin if available
try {
		// wujie-vue3 exports a plugin to render Wujie inside Vue 3
		const pkg = 'wujie-vue3'
		const { registerWujie, WujieApp } = await import(/* @vite-ignore */ pkg)
		const app = createApp(App)
		app.use(router)
		app.use(registerWujie)
		app.mount('#app')
		// register micro apps after mount
		registerMicroApps(router)
} catch (e) {
	// fallback if wujie-vue3 is not installed
		const app = createApp(App)
		app.use(router)
		app.mount('#app')
		registerMicroApps(router)
}
