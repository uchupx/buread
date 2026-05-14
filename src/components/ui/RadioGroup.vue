<template>
  <div class="radio-group space-y-2" role="radiogroup" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, provide, ref, watch } from 'vue'
import RadioGroupItem from './RadioGroupItem.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

watch(selectedValue, (newVal) => {
  emits('update:modelValue', newVal)
})

provide('radioGroupContext', {
  selectedValue,
  onSelect: (value: any) => {
    selectedValue.value = value
  }
})

defineExpose({ RadioGroupItem })
</script>