import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'
import Test from './components/Test.vue'

const routes = [
	{ path: '/', component: App },
	{ path: '/test', component: Test }
]

const router = createRouter({ history: createWebHashHistory(), routes })

let instance = null

function render() {
	const app = createApp(App)
	app.use(router)
	instance = app.mount('#app')
}

// expose lifecycle for wujie
if (window.__POWERED_BY_WUJIE__) {
	window.__WUJIE_MOUNT = () => render()
	window.__WUJIE_UNMOUNT = () => {
		if (instance) instance.unmount()
		instance = null
	}
} else {
	render()
}
