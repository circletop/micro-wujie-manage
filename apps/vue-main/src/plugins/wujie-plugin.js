import { registerMicroApps } from '../wujie-register'

// create a Vue plugin that will register Wujie micro apps when installed
// router: vue-router instance required for route-driven mount/unmount
// options: { sandbox, fetchHook, styleIsolation, alive, usePackageName, defaultProps }
export function createWujiePlugin(router, options = {}) {
  return {
    install(app) {
      // attach options to globalProperties for access in components if needed
      app.config.globalProperties.$wujieOptions = options
      // perform registration (no await to avoid blocking install)
      try {
        registerMicroApps(router, options)
      } catch (e) {
        console.warn('[wujie-plugin] failed to register micro apps', e)
      }
    }
  }
}

export default createWujiePlugin
