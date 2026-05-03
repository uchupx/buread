<template>
  <button
    @click="handleClick"
    class="fixed right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
    :class="{
      'bottom-20': isDark,
      'bottom-6': !isDark
    }"
    title="Add Book"
  >
    <Plus class="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus } from 'lucide-vue-next'

interface Props {
  onClick?: () => void
}

const props = defineProps<Props>()

const isDark = computed(() => document.documentElement.classList.contains('dark'))

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<style scoped>
button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

button:hover {
  animation: none;
}
</style>
