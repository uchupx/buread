<template>
  <div class="slider-group space-y-2">
    <input
      type="range"
      class="slider-input w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="handleInput"
    >
    <div class="slider-value text-sm text-gray-500 dark:text-gray-400">
      {{ modelValue }}{{ unit }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  min: {
    type: [String, Number],
    default: 0
  },
  max: {
    type: [String, Number],
    default: 100
  },
  step: {
    type: [String, Number],
    default: 1
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const handleInput = (e: Event) => {
  emits('update:modelValue', Number((e.target as HTMLInputElement).value))
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
