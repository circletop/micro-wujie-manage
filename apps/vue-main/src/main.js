import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { registerMicroApps } from './wujie-register'
import { emitInit } from './wujie-global'
import createWujiePlugin from './plugins/wujie-plugin'

// try to register wujie vue plugin if available
try {
		// wujie-vue3 exports a plugin to render Wujie inside Vue 3
		const pkg = 'wujie-vue3'
		const { registerWujie, WujieApp } = await import(/* @vite-ignore */ pkg)
			const app = createApp(App)
			app.use(router)
			// try to use the wujie-vue3 plugin if available, otherwise use our wrapper plugin
			try {
				app.use(registerWujie)
			} catch (e) {
				app.use(createWujiePlugin(router, { sandbox: true, styleIsolation: true }))
			}
			app.mount('#app')
			// ensure micro apps registered if plugin did not already
			registerMicroApps(router, { sandbox: true, styleIsolation: true, usePackageName: false })
			emitInit()
} catch (e) {
	// fallback if wujie-vue3 is not installed
		const app = createApp(App)
		app.use(router)
		app.use(createWujiePlugin(router, { sandbox: true, styleIsolation: true }))
		app.mount('#app')
		registerMicroApps(router, { sandbox: true, styleIsolation: true, usePackageName: false })
		emitInit()
}
