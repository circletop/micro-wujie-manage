<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div :id="`wujie-${name}`" style="width:100%;height:100%;min-height:400px"></div>
</template>