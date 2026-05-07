<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initializeTheme } from '@/services/theme.service'

onMounted(() => {
  // Initialize theme from local storage or use default
  initializeTheme()
})
</script>

<style scoped>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
