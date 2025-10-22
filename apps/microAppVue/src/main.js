import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let instance = null

function render() {
	const app = createApp(App)
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
