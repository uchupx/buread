<template>
  <div class="radio-group space-y-2" role="radiogroup" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, provide, ref, watch } from 'vue'
import RadioGroupItem from './RadioGroupItem.vue'

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:value'])

const selectedValue = ref(props.value)

watch(() => props.value, (newVal) => {
  selectedValue.value = newVal
})

watch(selectedValue, (newVal) => {
  emits('update:value', newVal)
})

provide('radioGroupContext', {
  selectedValue,
  onSelect: (value: any) => {
    selectedValue.value = value
  }
})

defineExpose({ RadioGroupItem })
</script>