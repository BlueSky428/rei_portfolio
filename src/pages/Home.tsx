import React, { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { loadPortfolioData } from '../utils/dataLoader'

const Home: React.FC = () => {
  const { language } = useLanguage()
  const { theme }    = useTheme()
  const [loaded, setLoaded] = useState(false)
  const data     = loadPortfolioData()
  const homeData = data.home

  useEffect(() => { setLoaded(true) }, [])

  const isDark = theme === 'dark'

  // ── Semantic colour tokens that flip with theme ────────────────
  const c = {
    bg:          isDark ? '#0C0C0C'                  : '#FAFAFA',
    grid:        isDark ? 'rgba(255,255,255,0.018)'  : 'rgba(0,0,0,0.04)',
    watermark:   isDark ? 'rgba(255,255,255,0.028)'  : 'rgba(0,0,0,0.038)',
    text1:       isDark ? 'rgba(255,255,255,1)'      : '#111111',
    text2:       isDark ? 'rgba(255,255,255,0.55)'   : 'rgba(0,0,0,0.58)',
    text3:       isDark ? 'rgba(255,255,255,0.30)'   : 'rgba(0,0,0,0.44)',
    text4:       isDark ? 'rgba(255,255,255,0.22)'   : 'rgba(0,0,0,0.32)',
    text5:       isDark ? 'rgba(255,255,255,0.18)'   : 'rgba(0,0,0,0.26)',
    text6:       isDark ? 'rgba(255,255,255,0.12)'   : 'rgba(0,0,0,0.16)',
    lineH:       isDark ? 'rgba(255,255,255,0.10)'   : 'rgba(0,0,0,0.12)',
    lineFade:    isDark ? 'rgba(255,255,255,0.08)'   : 'rgba(0,0,0,0.08)',
    border:      isDark ? 'rgba(255,255,255,0.07)'   : 'rgba(0,0,0,0.09)',
    btnPrimBg:   isDark ? '#FFFFFF'                  : '#111111',
    btnPrimText: isDark ? '#0C0C0C'                  : '#FFFFFF',
    btnSecBorder:isDark ? 'rgba(255,255,255,0.20)'   : 'rgba(0,0,0,0.22)',
    btnSecText:  isDark ? 'rgba(255,255,255,0.55)'   : 'rgba(0,0,0,0.55)',
    btnSecHoverB:isDark ? 'rgba(255,255,255,0.55)'   : 'rgba(0,0,0,0.55)',
    btnSecHoverT:isDark ? 'rgba(255,255,255,0.90)'   : 'rgba(0,0,0,0.88)',
    leftLine:    'rgba(192,48,37,0.72)',
    dot:         'rgba(192,48,37,0.55)',
  }

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const loc         = homeData.languages[language === 'ja' ? 'japanese' : 'english']
  const nameParts   = language === 'ja' ? ['藤本', '麗'] : loc.title.split(' ')
  const nameRomaji  = language === 'ja' ? 'Rei Fujimoto' : '藤本 麗'
  const subtitle    = loc.subtitle
  const description = loc.description
  const ctaText     = loc.cta.text

  const fade = (delay: number) => ({
    initial:    { opacity: 0 },
    animate:    { opacity: loaded ? 1 : 0 },
    transition: { duration: 0.7, delay },
  })

  const rise = (delay: number) => ({
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 },
    transition: { duration: 0.8, delay, ease: 'easeOut' as const },
  })

  const stats = [
    { value: '10',     labelEn: 'Years Exp.',    labelJa: '年の経験'     },
    { value: '20+',    labelEn: 'Projects',       labelJa: 'プロジェクト' },
    { value: 'Tokyo',  labelEn: 'Based In',       labelJa: '拠点'        },
  ]

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: c.bg, transition: 'background-color 0.4s ease' }}
    >

      {/* ── Watermark kanji ───────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-end overflow-hidden select-none pointer-events-none"
      >
        <span
          className="font-heading font-bold leading-none"
          style={{
            fontSize: 'clamp(18rem, 45vw, 52rem)',
            color: c.watermark,
            letterSpacing: '-0.05em',
            marginRight: '-4vw',
            transition: 'color 0.4s ease',
          }}
        >
          山
        </span>
      </div>

      {/* ── Fine grid texture ─────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            `linear-gradient(${c.grid} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${c.grid} 1px, transparent 1px)`,
          ].join(','),
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Left red accent line ───────────────────────────────── */}
      <div
        aria-hidden
        className="absolute left-0 inset-y-0 w-px"
        style={{ background: `linear-gradient(to bottom, transparent 0%, ${c.leftLine} 30%, ${c.leftLine} 70%, transparent 100%)` }}
      />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top meta strip */}
        <motion.div {...fade(0.15)} className="flex items-center justify-between px-6 sm:px-8 pt-24 md:pt-[5.5rem]">
          <div className="flex items-center gap-4">
            <span className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: c.text4 }}>
              Portfolio
            </span>
            <span className="h-px w-8" style={{ background: c.lineH }} />
            <span className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: c.text4 }}>
              {language === 'ja' ? '東京 · 日本' : 'Tokyo · Japan'}
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: c.text6 }}>
            {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* Name + role block */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
            <div className="flex items-center gap-16">

              {/* ── Left: text ──────────────────────────────────── */}
              <div className="flex-1 min-w-0">

                {/* Index badge */}
                <motion.div {...fade(0.25)} className="mb-6 flex items-center gap-3">
                  <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: c.text5 }}>
                    001
                  </span>
                  <span className="h-px w-6" style={{ background: c.lineH }} />
                  <span className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: c.text5 }}>
                    {language === 'ja' ? 'プロフィール' : 'Profile'}
                  </span>
                </motion.div>

                {/* Name - stacked lines */}
                <motion.div {...rise(0.35)}>
                  {nameParts.map((part, i) => (
                    <div
                      key={i}
                      className="font-heading font-bold leading-[0.88] block"
                      style={{ fontSize: 'clamp(3.2rem, 9.5vw, 7rem)', letterSpacing: '-0.025em', color: c.text1 }}
                    >
                      {part}
                    </div>
                  ))}
                  <div
                    className="font-mono mt-3"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.16em', color: c.text4 }}
                  >
                    {nameRomaji}
                  </div>
                </motion.div>

                {/* Red rule - animated draw */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: loaded ? 1 : 0 }}
                  transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left', width: '4rem', height: '1px', background: '#C03025', margin: '1.5rem 0' }}
                />

                {/* Subtitle / role */}
                <motion.p {...fade(0.85)}
                  className="font-sans font-light leading-snug mb-3"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1.15rem)', color: c.text2 }}
                >
                  {subtitle}
                </motion.p>

                {/* Description */}
                <motion.p {...fade(0.95)}
                  className="font-sans font-light leading-relaxed mb-10 max-w-[38rem]"
                  style={{ fontSize: '0.9375rem', color: c.text3 }}
                >
                  {description}
                </motion.p>

                {/* CTA buttons */}
                <motion.div {...rise(1.05)} className="flex flex-wrap gap-4">
                  <button
                    onClick={() => goTo('projects')}
                    className="inline-flex items-center gap-3 font-sans font-semibold
                               text-xs tracking-widest uppercase px-7 py-3.5
                               transition-opacity duration-200 hover:opacity-80"
                    style={{ background: c.btnPrimBg, color: c.btnPrimText }}
                  >
                    {ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => goTo('about')}
                    className="inline-flex items-center gap-3 font-sans font-medium
                               text-xs tracking-widest uppercase px-7 py-3.5
                               transition-all duration-200"
                    style={{ border: `1px solid ${c.btnSecBorder}`, color: c.btnSecText }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = c.btnSecHoverB
                      ;(e.currentTarget as HTMLButtonElement).style.color       = c.btnSecHoverT
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = c.btnSecBorder
                      ;(e.currentTarget as HTMLButtonElement).style.color       = c.btnSecText
                    }}
                  >
                    {language === 'ja' ? '自己紹介' : 'About Me'}
                  </button>
                </motion.div>
              </div>

              {/* ── Right: vertical text accent (lg+) ─────────── */}
              <motion.div
                {...fade(1.2)}
                className="hidden lg:flex flex-col items-center gap-5 self-stretch justify-center"
              >
                <div className="w-px flex-1 max-h-24" style={{ background: `linear-gradient(to bottom, transparent, ${c.lineFade})` }} />
                <div
                  className="writing-vertical font-mono uppercase select-none"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: c.text6 }}
                >
                  {language === 'ja' ? 'ソフトウェアエンジニア' : 'Software  Engineer'}
                </div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
                <div
                  className="writing-vertical font-mono uppercase select-none"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.28em', color: c.text6 }}
                >
                  {language === 'ja' ? 'フルスタック開発者' : 'Full-Stack  Developer'}
                </div>
                <div className="w-px flex-1 max-h-24" style={{ background: `linear-gradient(to bottom, ${c.lineFade}, transparent)` }} />
              </motion.div>

            </div>
          </div>
        </div>

        {/* ── Bottom stats + scroll ─────────────────────────── */}
        <motion.div
          {...fade(1.3)}
          className="border-t px-4 sm:px-6 lg:px-8"
          style={{ borderColor: c.border }}
        >
          <div className="max-w-6xl mx-auto py-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-8">
              {stats.map(stat => (
                <div key={stat.value} className="flex items-baseline gap-2">
                  <span className="font-mono font-bold" style={{ fontSize: '0.875rem', color: c.text2 }}>
                    {stat.value}
                  </span>
                  <span className="font-mono uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.16em', color: c.text4 }}>
                    {language === 'ja' ? stat.labelJa : stat.labelEn}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => goTo('about')}
              className="flex items-center gap-2 cursor-pointer"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-mono uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: c.text4 }}>
                {language === 'ja' ? 'スクロール' : 'Scroll'}
              </span>
              <ChevronDown className="w-3 h-3" style={{ color: c.text4 }} />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Home
