<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { ThemeService } from '@/services/theme.service'
import {useSettingsStore} from "@/stores/settings.js";

onMounted(async () => {
  // Initialize theme from local storage or use default
  const setting = useSettingsStore()
  ThemeService.initialize(setting)
  await ThemeService.loadSetting()
  ThemeService.initializeTheme()
})
</script>

<style scoped>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
