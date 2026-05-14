<template>
  <label
    class="label text-sm font-medium"
    :for="forLabel"
    :class="{ 'text-gray-500 dark:text-gray-400': !required, 'text-gray-900 dark:text-white': required}"
  >
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  forLabel: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.label {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
