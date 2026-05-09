<template>
  <div class="relative">
    <button
      @click="toggleTheme"
      class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      :title="`Switch to ${nextTheme} theme`"
    >
      <Sun
        v-if="currentTheme === 'dark'"
        class="w-5 h-5 text-yellow-500"
      />
      <Moon
        v-else-if="currentTheme === 'sepia'"
        class="w-5 h-5 text-orange-600"
      />
      <Eye
        v-else-if="currentTheme === 'high-contrast'"
        class="w-5 h-5 text-black"
      />
      <Moon
        v-else
        class="w-5 h-5 text-gray-600"
      />
    </button>

    <!-- Theme Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <button
        v-for="theme in themes"
        :key="theme.value"
        @click="setTheme(theme.value)"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
      >
        <div class="flex items-center">
          <component :is="theme.icon" class="w-4 h-4 mr-3" :class="theme.iconClass" />
          <span class="text-gray-900 dark:text-white">{{ theme.label }}</span>
        </div>
        <Check
          v-if="currentTheme === theme.value"
          class="w-4 h-4 text-primary-600"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Sun, Moon, Eye, Check } from 'lucide-vue-next'

type Theme = 'light' | 'dark' | 'sepia' | 'high-contrast'

interface ThemeOption {
  value: Theme
  label: string
  icon: any
  iconClass: string
}

const themes: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
    iconClass: 'text-yellow-500',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
    iconClass: 'text-blue-400',
  },
  {
    value: 'high-contrast',
    label: 'High Contrast',
    icon: Eye,
    iconClass: 'text-black',
  },
]

const currentTheme = ref<Theme>('light')
const showDropdown = ref(false)

const nextTheme = computed(() => {
  const currentIndex = themes.findIndex(theme => theme.value === currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  return themes[nextIndex].label.toLowerCase()
})

const toggleTheme = () => {
  const currentIndex = themes.findIndex(theme => theme.value === currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  setTheme(themes[nextIndex].value)
}

const setTheme = (theme: Theme) => {
  currentTheme.value = theme
  
  // Remove all theme classes
  document.documentElement.classList.remove('dark', 'high-contrast')
  
  // Add the new theme class
  if (theme !== 'light') {
    document.documentElement.classList.add(theme)
  }
  
  // Save to localStorage
  localStorage.setItem('webreader-theme', theme)
  
  // Close dropdown
  showDropdown.value = false
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  // Load saved theme
  const savedTheme = localStorage.getItem('webreader-theme') as Theme
  if (savedTheme && themes.find(theme => theme.value === savedTheme)) {
    setTheme(savedTheme)
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
