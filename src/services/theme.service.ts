import type { EbookSettings } from '@/types/ebook.types.ts'

export const THEME_PRESETS = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#e0e0e0',
  },
  sepia: {
    backgroundColor: '#f4ecd8',
    textColor: '#5c4033',
  },
}

const DEFAULT_THEME: Pick<EbookSettings, 'theme' | 'backgroundColor' | 'textColor'> = {
  theme: 'light',
  backgroundColor: '#ffffff',
  textColor: '#000000',
}

/**
 * Apply theme to document and save to local storage
 */
export const applyTheme = (theme: 'light' | 'dark' | 'sepia', settings?: EbookSettings) => {
  const preset = THEME_PRESETS[theme]
  const root = document.documentElement

  // Update document classes
  root.classList.remove('light', 'dark', 'sepia')
  root.classList.add(theme)

  // Save to local storage if settings provided
  if (settings) {
    localStorage.setItem('ebookSettings', JSON.stringify(settings))
  }

  return preset
}

/**
 * Initialize theme from local storage or use default
 */
export const initializeTheme = (): Pick<EbookSettings, 'theme' | 'backgroundColor' | 'textColor'> => {
  const saved = localStorage.getItem('ebookSettings')
  if (saved) {
    try {
      const settings = JSON.parse(saved) as EbookSettings
      applyTheme(settings.theme, settings)
      return {
        theme: settings.theme,
        backgroundColor: settings.backgroundColor,
        textColor: settings.textColor
      }
    } catch (e) {
      console.error('Failed to load saved theme', e)
    }
  }

  // Fallback to default theme
  applyTheme(DEFAULT_THEME.theme)
  return DEFAULT_THEME
}