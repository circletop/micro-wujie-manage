import { reactive, watch } from 'vue'

// simple global state for demo between host and micro apps
export const globalState = reactive({
  user: null,
  count: 0
})

const listeners = new Set()

export function setUser(u) {
  globalState.user = u
}

export function inc() {
  globalState.count++
}

// subscribe/unsubscribe helpers for micro apps
export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function unsubscribe(fn) {
  listeners.delete(fn)
}

// broadcast changes as CustomEvent and postMessage for cross-context
watch(
  globalState,
  (newVal, oldVal) => {
    // compute shallow diffs of keys that changed
    const changes = {}
    Object.keys(newVal).forEach(k => {
      if (newVal[k] !== oldVal[k]) changes[k] = newVal[k]
    })

    // notify internal subscribers
    listeners.forEach(fn => {
      try { fn(changes, newVal) } catch (e) {}
    })

    // emit window CustomEvent for micro apps
    try {
      const ev = new CustomEvent('wujie:global:change', { detail: { changes, state: newVal } })
      window.dispatchEvent(ev)
    } catch (e) {}

    // postMessage to guests that may listen via message event
    try {
      window.postMessage({ type: 'wujie:global:change', payload: { changes, state: newVal } }, '*')
    } catch (e) {}
  },
  { deep: true }
)

// emit initial state for late subscribers
export function emitInit() {
  try {
    const ev = new CustomEvent('wujie:global:init', { detail: { state: globalState } })
    window.dispatchEvent(ev)
  } catch (e) {}
  try {
    window.postMessage({ type: 'wujie:global:init', payload: { state: globalState } }, '*')
  } catch (e) {}
}
