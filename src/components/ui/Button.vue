<template>
  <button
      class="btn gap-2 border-2 rounded rounded-lg "
      :class="[variantClass, sizeClass, props.class]"
      @click="handleClick"
      :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue'

type ValidVariant = 'primary' | 'secondary' | 'outline'

const props = defineProps({
  variant: {
    type: String as () => ValidVariant,
    default: 'primary',
    validator: (value: string): value is ValidVariant => ['primary', 'secondary', 'outline'].includes(value)
  },
  class: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  if (!props.disabled) emits('click', e)
}

const variantClass = computed(() => {
  const classes: Record<ValidVariant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-gray-300 text-gray-800 hover:opacity-60'
  }
  if (props.focus) {
    return {
      primary: 'bg-white text-primary-600 border-primary-600',
      secondary: 'bg-gray-800 text-gray-200 border-gray-300',
      outline: 'bg-gray-300 opacity-90 text-white border-gray-300'
    }[props.variant]
  }

  return classes[props.variant];
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
  /* border-radius: 4px; */
  /* transition-colors: duration-200; */
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>