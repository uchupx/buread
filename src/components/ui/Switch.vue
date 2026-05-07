<template>
  <div class="switch-group flex items-center gap-2">
    <input
      type="checkbox"
      class="switch-input hidden"
      :id="id"
      :checked="checked"
      @change="handleChange"
    >
    <label
      class="switch-toggle flex h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 cursor-pointer"
      :for="id"
      :class="{ 'bg-primary-600': checked }"
    >
      <span class="switch-dot h-4 w-4 rounded-full bg-white absolute left-0.5 top-0.5 transition-transform duration-200"
        :class="{ 'transform translate-x-5': checked }"
      ></span>
    </label>
    <slot v-if="$slots.default" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['change'])

const handleChange = (e: Event) => {
  emits('change', (e.target as HTMLInputElement).checked)
}
</script>