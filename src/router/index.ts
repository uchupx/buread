import { createRouter, createWebHistory } from 'vue-router'
import Library from '@/views/Library.vue'
import Reader from '@/views/Reader.vue'
import SettingsPage from '@/views/SettingsPage.vue' // Used for reading settings route

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'library',
      component: Library,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
    },
    {
      path: '/reader/:type/:id',
      name: 'reader',
      component: Reader,
      props: true,
    },
  ],
})

export default router
