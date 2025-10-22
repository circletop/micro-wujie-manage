<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/vue1">Vue子应用1</RouterLink>
      <RouterLink to="/vue2">Vue子应用2</RouterLink>
      <RouterLink to="/react">React子应用</RouterLink>
      <RouterLink to="/map">地图</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}

nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

nav a {
  margin-right: 20px;
  color: #666;
  text-decoration: none;
}

nav a.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style>
