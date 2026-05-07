<template>
  <div class="tabs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, provide, ref, watch } from 'vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'

const props = defineProps({
  defaultValue: {
    type: String,
    required: true
  }
})

const activeTab = ref(props.defaultValue)

provide('tabsContext', {
  activeTab,
  onTabChange: (tab: string) => {
    activeTab.value = tab
  }
})

defineExpose({ TabsList, TabsTrigger, TabsContent })
</script>