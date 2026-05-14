<template>
  <button
    class="tabs-trigger px-4 py-2 text-sm rounded-md transition-colors duration-200"
    :class="{ 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white': isActive, 'text-gray-500 dark:text-gray-400': !isActive }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, inject, computed, type Ref } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

interface TabsContext {
  activeTab: Ref<string>
  onTabChange: (tab: string) => void
}

const tabsContext = inject<TabsContext>('tabsContext')

if (!tabsContext) {
  throw new Error('TabsTrigger must be used within a Tabs component')
}

const isActive = computed(() => {
  return tabsContext.activeTab.value === props.value
})

const handleClick = () => {
  tabsContext.onTabChange(props.value)
}
</script>