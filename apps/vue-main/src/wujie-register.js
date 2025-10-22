// Helper to register micro apps with Wujie.
// Accepts an optional router so the caller can perform route-driven mount/unmount behavior.
export async function registerMicroApps(router, options = {}) {
  const apps = [
    { name: 'vue1', url: 'http://localhost:9528', el: '#wujie-microAppVue1', route: '/vue1', pkg: '@micro/vue1' },
    { name: 'vue2', url: 'http://localhost:9529', el: '#wujie-microAppVue2', route: '/vue2', pkg: '@micro/vue2' },
    { name: 'react', url: 'http://localhost:9530', el: '#wujie-microAppReact', route: '/react', pkg: '@micro/react' }
  ]

  // Try to import wujie dynamically; fall back to global window.Wujie
  let wujieLib = null
  try {
    wujieLib = await import('wujie')
  } catch (e) {
    // ignore import error, try to use global
  }

  const wujie = (wujieLib && (wujieLib.default || wujieLib)) || window.Wujie
  if (!wujie) {
    console.warn('Wujie runtime not found. Please install wujie or ensure it is available on window.Wujie')
    return
  }

  // expose a global bridge for micro apps to interact with host state
  try {
    const { globalState, setUser, inc, subscribe, unsubscribe } = await import('./wujie-global')
    // set an example user
    setUser('dev-user')
    // expose bridge with subscription helpers
    window.__WUJIE_GLOBAL__ = { globalState, setUser, inc, subscribe, unsubscribe }
  } catch (e) {
    // ignore
  }

  apps.forEach(a => {
    try {
      const opts = {
        name: a.name,
        url: a.url,
        el: a.el,
        // keep alive to speed up switch, set to false if you want full cleanup
        alive: options.alive ?? true,
        // sandbox / fetch-hook / style isolation are passed through when provided
        sandbox: options.sandbox,
        fetch: options.fetchHook,
        // wujie supports various style isolation flags; we'll forward a hint
        styleIsolation: options.styleIsolation,
        // props passed to the micro app
        props: Object.assign({ globalState: { user: 'dev' } }, options.defaultProps || {}),
        // lifecycle hooks for debugging/metrics
        beforeLoad: () => console.log(`[wujie] beforeLoad ${a.name}`),
        beforeMount: () => console.log(`[wujie] beforeMount ${a.name}`),
        afterMount: () => console.log(`[wujie] afterMount ${a.name}`),
        beforeUnmount: () => console.log(`[wujie] beforeUnmount ${a.name}`),
        afterUnmount: () => console.log(`[wujie] afterUnmount ${a.name}`)
      }

      // allow passing pnpm package selector as name if provided
      if (options.usePackageName && a.pkg) opts.name = a.pkg

      if (typeof wujie.register === 'function') {
        wujie.register(opts)
      } else if (typeof wujie.registerApp === 'function') {
        wujie.registerApp(opts)
      } else if (typeof window.Wujie?.register === 'function') {
        window.Wujie.register(opts)
      } else {
        console.warn('No compatible register API found on Wujie')
      }
    } catch (err) {
      console.warn('register micro app failed', a.name, err)
    }
  })

  // If router is provided, mount/unmount based on route change
  if (router) {
    // route-driven mount/unmount: when route matches, try to mount or show the micro app;
    // when leaving, try to hide or unmount depending on runtime API.
    router.afterEach((to) => {
      const match = apps.find(a => to.path.startsWith(a.route))
      apps.forEach(a => {
        try {
          if (match && match.name === a.name) {
            // preferred: mount if available, otherwise show
            if (typeof wujie.mount === 'function') {
              wujie.mount(a.name)
            } else if (typeof wujie.show === 'function') {
              wujie.show(a.name)
            } else if (window.__WUJIE_MOUNT) {
              // fallback: call exposed mount function on the micro app window
              try { window.__WUJIE_MOUNT() } catch (e) {}
            }
          } else {
            // preferred: unmount if available, otherwise hide
            if (typeof wujie.unmount === 'function') {
              wujie.unmount(a.name)
            } else if (typeof wujie.hide === 'function') {
              wujie.hide(a.name)
            } else if (window.__WUJIE_UNMOUNT) {
              try { window.__WUJIE_UNMOUNT() } catch (e) {}
            }
          }
        } catch (e) {
          // silent
        }
      })
    })
  }
}
