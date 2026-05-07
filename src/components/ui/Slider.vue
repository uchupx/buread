<template>
  <div class="slider-group space-y-2">
    <input
      type="range"
      class="slider-input w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="handleInput"
    >
    <div class="slider-value text-sm text-gray-500 dark:text-gray-400">
      {{ value }}{{ unit }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['input'])

const handleInput = (e: Event) => {
  emits('input', Number((e.target as HTMLInputElement).value))
}
</script>

<style scoped>
.slider-input::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}
</style>