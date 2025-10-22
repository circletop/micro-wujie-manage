import { reactive } from 'vue'

// simple global state for demo between host and micro apps
export const globalState = reactive({
  user: null,
  count: 0
})

export function setUser(u) {
  globalState.user = u
}

export function inc() {
  globalState.count++
}
