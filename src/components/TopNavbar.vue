<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-30"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <BookOpen
            class="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3"
          />
          <h1
            class="text-2xl font-bold text-gray-900 dark:text-white"
          >
            WebReader
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>