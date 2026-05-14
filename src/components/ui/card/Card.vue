<template>
  <div class="card bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <slot />
  </div>
</template>

<script setup lang="ts">
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'
import CardDescription from './CardDescription.vue'
import CardContent from './CardContent.vue'

defineExpose({ CardHeader, CardTitle, CardDescription, CardContent })
</script>

<style scoped>
.card {
  /* transition-shadow: duration-200; */
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}
</style>