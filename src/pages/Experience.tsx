import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react'

const Experience: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const xp   = data.experience
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

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
            <div className="section-label">{language === 'ja' ? '経歴' : 'Experience'}</div>
            <h1 className="mb-3">{getLocalizedText(xp, 'title', language)}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja' ? '8年のプロフェッショナルな経験の軌跡' : 'A journey of 8 years of professional experience'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats row ────────────────────────────────────────── */}
      <section className="border-t border-b border-soft-200 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {Object.entries(xp.career_highlights).map(([key, value], i) => {
              if (key.startsWith('japanese_')) return null
              const jaKey = `japanese_${key}`
              const jaVal = xp.career_highlights[jaKey as keyof typeof xp.career_highlights]
              return (
                <motion.div
                  key={key}
                  {...fade(i * 0.08)}
                  className="px-8 py-8 border-r border-soft-200 last:border-r-0 text-center"
                >
                  <div className="font-mono font-bold text-3xl text-soft-900 tabular-nums mb-1">{value}</div>
                  <div className="font-mono text-xs text-soft-400 uppercase tracking-widest">
                    {language === 'ja' ? jaVal : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-12">
            <div className="section-label">· {language === 'ja' ? 'タイムライン' : 'Timeline'}</div>
            <h2>{language === 'ja' ? '経験のタイムライン' : 'Experience Timeline'}</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical rule */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-soft-200 md:-translate-x-px" />

            <div className="space-y-10">
              {xp.timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  {...fade(i * 0.1)}
                  className={`relative flex items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-soft-900 -translate-x-1 md:-translate-x-1.5 mt-5 z-10" />

                  <div className={`ml-8 md:ml-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="card p-7 group hover:border-soft-400 transition-colors duration-200">
                      {/* Date row */}
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-3.5 h-3.5 text-soft-400" />
                        <span className="font-mono text-xs text-soft-400 tracking-wide">
                          {getLocalizedText(item, 'period', language)}
                        </span>
                      </div>

                      {/* Position & company */}
                      <h3 className="mb-1">{getLocalizedText(item, 'position', language)}</h3>
                      <p className="font-sans font-medium text-beni-600 text-sm mb-2">
                        {getLocalizedText(item, 'company', language)}
                      </p>

                      <div className="flex items-center gap-1.5 mb-4">
                        <MapPin className="w-3 h-3 text-soft-400" />
                        <span className="font-mono text-xs text-soft-400">
                          {getLocalizedText(item, 'location', language)}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-soft-600 leading-relaxed mb-5">
                        {getLocalizedText(item, 'description', language)}
                      </p>

                      {/* Achievements */}
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-3.5 h-3.5 text-soft-400" />
                          <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                            {language === 'ja' ? '主要な成果' : 'Key Achievements'}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {getLocalizedArray(item, 'key_achievements', language).map((a: string, j: number) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="mt-1.5 w-1 h-1 bg-beni-500 flex-shrink-0" />
                              <span className="font-sans text-xs text-soft-600 leading-relaxed">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-3.5 h-3.5 text-soft-400" />
                          <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                            {language === 'ja' ? '使用技術' : 'Technologies'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((t, j) => (
                            <span key={j} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experience
