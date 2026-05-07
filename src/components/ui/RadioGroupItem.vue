<template>
  <div class="radio-item flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      class="radio-input hidden"
      :id="id"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
    >
    <label
      class="radio-toggle flex h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600 transition-colors duration-200"
      :for="id"
      :class="{ 'bg-primary-600 border-primary-600': isChecked }"
    >
      <span class="radio-dot h-2 w-2 rounded-full bg-white hidden absolute left-1 top-1"
        :class="{ 'block': isChecked }"
      ></span>
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  }
})

const radioGroupContext = inject('radioGroupContext')

if (!radioGroupContext) {
  throw new Error('RadioGroupItem must be used within a RadioGroup')
}

const isChecked = computed(() => {
  return radioGroupContext.selectedValue.value === props.value
})

const handleChange = () => {
  radioGroupContext.onSelect(props.value)
}
</script>