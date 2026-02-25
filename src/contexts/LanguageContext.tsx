import React, { createContext, useContext, ReactNode } from 'react'
import { LanguageContextType } from '../types/language'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
  value: LanguageContextType
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, value }) => {
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext }
