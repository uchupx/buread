import { defineStore } from 'pinia'
import type { EbookSettings } from '@/types/ebook.types'
import { ThemeService } from '@/services/theme.service'
import { DEFAULT_SETTINGS } from '@/types/ebook.types.ts'

export const useSettingsStore = defineStore('settings', {
  state: (): { setting: EbookSettings} => ({
    setting: DEFAULT_SETTINGS,
  }),
  actions: {
    updateSetting<K extends keyof EbookSettings>(key: K, value: EbookSettings[K]) {
      this.setting[key] = value
      ThemeService.applyTheme(this.setting)
    },
    resetAllSettings() {
      this.setting = DEFAULT_SETTINGS
      ThemeService.applyTheme(DEFAULT_SETTINGS)
    }
  },
  persist: true // Leverages existing pinia-plugin-persistedstate with localforage IndexedDB setup
})