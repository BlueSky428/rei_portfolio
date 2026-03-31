import React, { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme }    = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['about', 'experience', 'education', 'projects', 'skills', 'contact']
      const offset    = window.scrollY + 120
      for (const s of sections) {
        const el = document.getElementById(s)
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(s); break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { en: 'About',       ja: '自己紹介',     id: 'about'       },
    { en: 'Experience',  ja: '経歴',          id: 'experience'  },
    { en: 'Education',   ja: '学歴',          id: 'education'   },
    { en: 'Projects',    ja: '制作実績',      id: 'projects'    },
    { en: 'Skills',      ja: 'スキル',        id: 'skills'      },
    { en: 'Contact',     ja: 'お問い合わせ',  id: 'contact'     },
  ]

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  const onHero = activeSection === 'about'
  // White text only when hero is dark (dark mode). Light mode hero is light-coloured.
  const heroIsDark  = onHero && !scrolled && theme === 'dark'

  // ── Text colour helpers ─────────────────────────────────────
  const navText   = heroIsDark ? 'text-white/80'    : 'text-soft-600'
  const navHover  = heroIsDark ? 'hover:text-white'  : 'hover:text-soft-900'
  const logoText  = heroIsDark ? 'text-white'        : 'text-soft-900'
  const bg = scrolled
    ? 'bg-soft-50/[0.97] backdrop-blur-md border-b border-soft-200'
    : onHero ? 'bg-transparent' : 'bg-soft-50/[0.92] backdrop-blur-sm'

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${bg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* ── Logo (matches favicon: R on ocean/beni) ────────── */}
          <button onClick={() => go('about')} className="flex items-center gap-3 group" aria-label="Top">
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-mono font-bold transition-colors duration-200 ${
                heroIsDark
                  ? 'bg-white/10 border border-white/60 text-white group-hover:bg-white/20'
                  : 'bg-ocean-900 border border-ocean-700 text-beni-500 group-hover:bg-ocean-800 group-hover:text-beni-400'
              }`}
            >R</span>
            <span className={`font-heading font-bold text-sm tracking-wide transition-colors duration-200 ${logoText}`}>
              {language === 'ja' ? '藤本麗' : 'Rei Fujimoto'}
            </span>
          </button>

          {/* ── Desktop links ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`relative px-3 py-2 font-sans text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                    active
                      ? heroIsDark ? 'text-white' : 'text-soft-900'
                      : `${navText} ${navHover}`
                  }`}
                >
                  {language === 'ja' ? item.ja : item.en}
                  {active && (
                    <span className="absolute bottom-0 inset-x-3 h-px bg-beni-600" />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Right controls ───────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                heroIsDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-soft-400 hover:text-soft-900'
              }`}
            >
              {language === 'en' ? 'JA' : 'EN'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`transition-colors duration-200 ${
                heroIsDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-soft-400 hover:text-soft-900'
              }`}
            >
              {theme === 'dark'
                ? <Sun  className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />
              }
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden transition-colors duration-200 ${
                heroIsDark ? 'text-white/70 hover:text-white' : 'text-soft-600 hover:text-soft-900'
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────── */}
      {isOpen && (
        <div className="md:hidden bg-soft-50 border-t border-soft-200">
          <div className="max-w-6xl mx-auto px-4">
            {navItems.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex items-center w-full gap-4 py-4 border-b border-soft-100 text-left group transition-colors duration-150 ${
                    active ? 'text-soft-900' : 'text-soft-500 hover:text-soft-900'
                  }`}
                >
                  <span className={`text-xs font-sans font-medium tracking-widest uppercase ${
                    active ? 'text-soft-900' : ''
                  }`}>
                    {language === 'ja' ? item.ja : item.en}
                  </span>
                  {active && <span className="ml-auto w-1 h-4 bg-beni-600" />}
                </button>
              )
            })}
            <div className="py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-soft-300 tracking-widest">TOKYO · JAPAN</span>
              <span className="font-mono text-xs text-soft-300">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
