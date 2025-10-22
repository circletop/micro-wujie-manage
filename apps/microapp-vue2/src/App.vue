<script setup>
import { ref, onMounted } from 'vue'

const msg = ref('Vue Micro App 2')
const globalState = ref(null)

onMounted(() => {
  if (window.__WUJIE_GLOBAL__) {
    globalState.value = window.__WUJIE_GLOBAL__.globalState
  }
})

function incHost() {
  if (window.__WUJIE_GLOBAL__ && window.__WUJIE_GLOBAL__.inc) {
    window.__WUJIE_GLOBAL__.inc()
  }
}
</script>

<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <p>This is a second Vue micro application</p>
    <div v-if="globalState">
      <p>Host user: {{ globalState.user }}</p>
      <p>Host count: {{ globalState.count }}</p>
      <button @click="incHost">Increment host count</button>
    </div>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}
</style>