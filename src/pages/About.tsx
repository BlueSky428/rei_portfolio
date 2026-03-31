import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Puzzle, Code, Users, GraduationCap } from 'lucide-react'

const About: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const aboutData = data.about
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  const iconMap = {
    'puzzle-piece':   Puzzle,
    'code':           Code,
    'users':          Users,
    'graduation-cap': GraduationCap,
  }

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  return (
    <div className="min-h-screen bg-soft-50" ref={ref}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div {...fade(0)}>
            <div className="section-label">{language === 'ja' ? '自己紹介' : 'About'}</div>
            <h1 className="mb-12">{getLocalizedText(aboutData, 'title', language)}</h1>
          </motion.div>

          {/* Profile grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Avatar */}
            <motion.div {...fade(0.15)}>
              <div className="relative w-full max-w-sm">
                <div className="aspect-square overflow-hidden border border-soft-200">
                  <img
                    src="/avatar.png"
                    alt={getLocalizedText(aboutData.profile, 'name', language)}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Corner accent squares */}
                <span className="absolute -top-2 -left-2 w-4 h-4 bg-beni-600" />
                <span className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-soft-300" />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div {...fade(0.25)} className="space-y-6">
              <div>
                <h2 className="mb-1">{getLocalizedText(aboutData.profile, 'name', language)}</h2>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-px bg-beni-600" />
                  <span className="font-mono text-xs text-soft-500 uppercase tracking-widest">
                    {getLocalizedText(aboutData.profile, 'title', language)}
                  </span>
                </div>
              </div>

              <div className="border-l-2 border-soft-200 pl-5">
                <p className="font-sans text-base text-soft-600 leading-relaxed">
                  {aboutData.introduction[language === 'en' ? 'english' : 'japanese']}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Professional Values ───────────────────────────────── */}
      <section className="section-padding bg-white border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)}>
            <div className="section-label">{language === 'ja' ? '価値観' : 'Values'}</div>
            <h2 className="mb-12">
              {language === 'ja' ? 'プロフェッショナルな価値観' : 'Professional Values'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-soft-200">
            {aboutData.professional_values.map((value, i) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap] || Code
              return (
                <motion.div
                  key={value.title}
                  {...fade(i * 0.08)}
                  className="bg-white p-8 hover:bg-soft-50 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 border border-soft-200 flex items-center justify-center mb-5 group-hover:border-soft-900 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-soft-500 group-hover:text-soft-900 transition-colors" />
                  </div>
                  <h4 className="mb-3">{getLocalizedText(value, 'title', language)}</h4>
                  <p className="font-sans text-sm text-soft-500 leading-relaxed">
                    {getLocalizedText(value, 'description', language)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Personal Highlights ───────────────────────────────── */}
      <section className="section-padding border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)}>
            <div className="section-label">{language === 'ja' ? 'ハイライト' : 'Highlights'}</div>
            <h2 className="mb-12">
              {language === 'ja' ? '個人的なハイライト' : 'Personal Highlights'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.personal_highlights.map((hl, i) => (
              <motion.div key={hl.category} {...fade(i * 0.1)} className="card p-8">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-soft-400 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4>{getLocalizedText(hl, 'category', language)}</h4>
                </div>
                <ul className="space-y-3">
                  {getLocalizedArray(hl, 'items', language).map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-soft-600">
                      <span className="mt-2 w-1 h-1 bg-beni-500 flex-shrink-0" />
                      <span className="font-sans text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
