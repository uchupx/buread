<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-40 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-around h-16">
        <!-- Home/Library Link -->
        <router-link
          to="/"
          class="flex flex-col items-center justify-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
          :class="{ 'text-primary-400': $route.path === '/' }"
        >
          <Home class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium">Library</span>
        </router-link>

<!--        &lt;!&ndash; Theme Toggle &ndash;&gt;-->
<!--        <div class="flex flex-col items-center justify-center px-4 py-2">-->
<!--          <div class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">-->
<!--            <ThemeToggle />-->
<!--          </div>-->
<!--        </div>-->


        <!-- Settings Link -->
        <router-link
          to="/settings"
          class="flex flex-col items-center justify-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
          :class="{ 'text-primary-400': $route.path === '/settings' }"
        >
          <Settings class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium">Settings</span>
        </router-link>

<!--        &lt;!&ndash; Stats/Info &ndash;&gt;-->
<!--        <div class="flex flex-col items-center justify-center px-4 py-2 text-gray-400">-->
<!--          <BookOpen class="w-6 h-6 mb-1" />-->
<!--          <span class="text-xs font-medium">{{ documents.length }} books</span>-->
<!--        </div>-->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDocumentsStore } from '@/stores/documents'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { Home, BookOpen, Plus, Settings } from 'lucide-vue-next'

const props = defineProps<{}>()

const route = useRoute()
const documentsStore = useDocumentsStore()

const documents = computed(() => documentsStore.documents)
const isDark = computed(() => document.documentElement.classList.contains('dark'))
</script>
