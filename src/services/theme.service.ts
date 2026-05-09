import {DEFAULT_SETTINGS, type EbookSettings} from '@/types/ebook.types.ts'
import {useSettingsStore} from '../stores/settings'
import localforage from "localforage";

export const THEME_PRESETS = {
    light: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
    },
    dark: {
        backgroundColor: '#1a1a1a',
        textColor: '#e0e0e0',
    },
}

const DEFAULT_THEME: Pick<EbookSettings, 'theme' | 'backgroundColor' | 'textColor'> = {
    theme: 'light',
    backgroundColor: '#ffffff',
    textColor: '#000000',
}

export class ThemeService {
    private static readonly STORAGE_KEY = "webreader-settings"
    private static store: ReturnType<typeof useSettingsStore> | null = null

    /**
     * Initialize the service with the store instance
     */
    static initialize(store: ReturnType<typeof useSettingsStore>): void {
        this.store = store
    }

    static applyTheme(setting: EbookSettings): void {
        try {
            localforage.setItem(this.STORAGE_KEY, JSON.stringify(setting))
        } catch (error) {
            console.error('Error saving settings:', error)
        } finally {
            this.updateTheme()
        }
        //
        // // Sync with Pinia store if settings provided
        // if (settings) {
        //     if (themeType === 'ui') {
        //         settingsStore.updateUiSetting('theme', theme)
        //         settingsStore.updateUiSetting('backgroundColor', preset.backgroundColor)
        //         settingsStore.updateUiSetting('textColor', preset.textColor)
        //     } else {
        //         settingsStore.updateReaderSetting('theme', theme)
        //         settingsStore.updateReaderSetting('backgroundColor', preset.backgroundColor)
        //         settingsStore.updateReaderSetting('textColor', preset.textColor)
        //     }
        // }
        //
        // return preset
    }

    static async loadSetting(): Promise<void> {
        try {
            const saved = await localforage.getItem(this.STORAGE_KEY) as string
            if (saved) {
                const settings = JSON.parse(saved)
                const store = this.getStore()
                store.setting = settings
            } else {
                const store = this.getStore()
                store.setting = DEFAULT_SETTINGS
            }
        } catch (e) {
            console.error("error loading settings", e)
        }
    }

    static initializeTheme(): void {
        this.updateTheme()

    }

    private static updateTheme(): void {
        const store = this.getStore()
        document.documentElement.classList.remove('dark')

        if (store.setting.theme !== 'light') {
            document.documentElement.classList.add(store.setting.theme)
        }

    }


    /**
     * Get store instance
     */
    private static getStore(): ReturnType<typeof useSettingsStore> {
        if (!this.store) {
            throw new Error('SettingStore not initialized. Call initialize() first.')
        }
        return this.store
    }
}