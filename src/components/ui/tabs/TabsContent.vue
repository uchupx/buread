<template>
  <div class="tabs-content mt-4" v-if="isActive">
    <slot />
  </div>
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
  throw new Error('TabsContent must be used within a Tabs component')
}

const isActive = computed(() => {
  return tabsContext.activeTab.value === props.value
})
</script>