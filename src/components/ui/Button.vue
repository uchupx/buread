<template>
  <button
    class="btn flex items-center justify-center gap-2"
    :class="[variantClass, sizeClass]"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  if (!props.disabled) emits('click', e)
}

const variantClass = computed(() => {
  return {
    'bg-primary-600 text-white hover:bg-primary-700': props.variant === 'primary',
    'bg-gray-200 text-gray-800 hover:bg-gray-300': props.variant === 'secondary',
    'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100': props.variant === 'outline'
  }
})

const sizeClass = computed(() => {
  return {
    'px-2 py-1 text-xs': props.size === 'sm',
    'px-4 py-2 text-sm': props.size === 'medium',
    'px-6 py-3 text-base': props.size === 'lg'
  }
})
</script>

<style scoped>
.btn {
  border-radius: 4px;
  //transition-colors: duration-200;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>