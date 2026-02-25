export type Language = 'en' | 'ja'

export interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}
