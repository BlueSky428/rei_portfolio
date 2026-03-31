import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// Components
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Achievements from './pages/Achievements'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Specializations from './pages/Specializations'
import Footer from './components/Footer'

// Context
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Types
import { Language } from './types/language'

function App() {
  const [language, setLanguage] = useState<Language>('ja')

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('portfolio-language') as Language
    if (savedLanguage && ['en', 'ja'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('portfolio-language', newLanguage)
  }

  return (
    <ThemeProvider>
    <LanguageProvider value={{ language, setLanguage: handleLanguageChange }}>
      <div className="min-h-screen bg-soft-50 text-soft-900">
        <Navigation />
        
        <main>
          <section id="about">
            <Home />
            <About />
            <Testimonials />
          </section>
          <section id="experience">
            <Experience />
            <Achievements />
          </section>
          <section id="education">
            <Education />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="skills">
            <Skills />
            <Specializations />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'toast-adaptive',
            style: {
              borderRadius: '0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            },
          }}
        />
      </div>
    </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
