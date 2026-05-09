export interface EbookSettings {
  theme: 'light' | 'dark'
  fontSize: number
  fontFamily: 'serif' | 'sans-serif'
  lineHeight: number
  letterSpacing: number
  pageWidth: number
  backgroundColor: string
  textColor: string
  justify: boolean
}

export const DEFAULT_SETTINGS: EbookSettings = {
  theme: 'light',
  fontSize: 18,
  fontFamily: 'serif',
  lineHeight: 1.8,
  letterSpacing: 0,
  pageWidth: 800,
  backgroundColor: '#ffffff',
  textColor: '#000000',
  justify: false,
}