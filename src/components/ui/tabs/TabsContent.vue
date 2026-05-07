<template>
  <div class="tabs-content mt-4" v-if="isActive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject, computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const tabsContext = inject('tabsContext')

if (!tabsContext) {
  throw new Error('TabsContent must be used within a Tabs component')
}

const isActive = computed(() => {
  return tabsContext.activeTab.value === props.value
})
</script>