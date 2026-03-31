import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy } from 'lucide-react'

const Education: React.FC = () => {
  const { language }   = useLanguage()
  const data           = loadPortfolioData()
  const educationData: any[] = data.about.education || []
  const [ref, inView]  = useInView({ triggerOnce: true, threshold: 0.06 })

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
            <div className="section-label">{language === 'ja' ? '学歴' : 'Education'}</div>
            <h1 className="mb-3">{language === 'ja' ? '学歴' : 'Education'}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja' ? '学術的基盤と専門知識の形成' : 'Academic foundation and professional knowledge formation'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-soft-200 md:-translate-x-px" />

            <div className="space-y-10">
              {educationData.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  {...fade(i * 0.12)}
                  className={`relative flex items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-soft-900 -translate-x-1 md:-translate-x-1.5 mt-5 z-10" />

                  <div className={`ml-8 md:ml-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="card p-7">
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-soft-400" />
                          <span className="font-mono text-xs text-soft-400 tracking-wide">
                            {getLocalizedText(edu, 'period', language)}
                          </span>
                        </div>
                        <span className="tag">{getLocalizedText(edu, 'gpa', language)}</span>
                      </div>

                      <h3 className="mb-1">{getLocalizedText(edu, 'degree', language)}</h3>
                      <p className="font-sans font-medium text-beni-600 text-sm mb-2">
                        {getLocalizedText(edu, 'field', language)}
                      </p>

                      <div className="flex items-center gap-2 mb-5">
                        <MapPin className="w-3 h-3 text-soft-400" />
                        <span className="font-sans text-xs text-soft-600 font-medium">
                          {getLocalizedText(edu, 'university', language)}
                        </span>
                        <span className="font-mono text-xs text-soft-400">
                          {getLocalizedText(edu, 'location', language)}
                        </span>
                      </div>

                      {/* Thesis */}
                      {edu.thesis_title && (
                        <div className="mb-5 border-l-2 border-soft-200 pl-4 py-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen className="w-3 h-3 text-soft-400" />
                            <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                              {language === 'ja' ? '卒業論文' : 'Thesis'}
                            </span>
                          </div>
                          <p className="font-sans text-sm text-soft-600">
                            {getLocalizedText(edu, 'thesis_title', language)}
                          </p>
                        </div>
                      )}

                      {/* Key courses */}
                      {edu.key_courses && (
                        <div className="mb-5">
                          <div className="flex items-center gap-1.5 mb-3">
                            <BookOpen className="w-3.5 h-3.5 text-soft-400" />
                            <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                              {language === 'ja' ? '主要科目' : 'Key Courses'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {getLocalizedArray(edu, 'key_courses', language).map((c: string, j: number) => (
                              <span key={j} className="tag">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {edu.achievements && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Trophy className="w-3.5 h-3.5 text-soft-400" />
                            <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                              {language === 'ja' ? '主な成果' : 'Achievements'}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {getLocalizedArray(edu, 'achievements', language).map((a: string, j: number) => (
                              <li key={j} className="flex items-start gap-3">
                                <Award className="w-3 h-3 text-soft-300 mt-1 flex-shrink-0" />
                                <span className="font-sans text-xs text-soft-600 leading-relaxed">{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Summary stats ────────────────────────────────────── */}
      {educationData.length > 0 && (
        <section className="section-padding bg-white border-t border-soft-200">
          <div className="container-max">
            <div className="grid md:grid-cols-3 gap-px bg-soft-200">
              {[
                { Icon: GraduationCap, value: educationData.length,
                  label: language === 'ja' ? '学位取得' : 'Degrees Earned' },
                { Icon: BookOpen,
                  value: educationData.reduce((t: number, e: any) => t + (e.key_courses?.length || 0), 0),
                  label: language === 'ja' ? '修了科目' : 'Courses Completed' },
                { Icon: Trophy,
                  value: educationData.reduce((t: number, e: any) => t + (e.achievements?.length || 0), 0),
                  label: language === 'ja' ? '主な成果' : 'Key Achievements' },
              ].map(({ Icon, value, label }, i) => (
                <motion.div key={i} {...fade(i * 0.08)}
                  className="bg-white px-10 py-10 text-center hover:bg-soft-50 transition-colors duration-200">
                  <Icon className="w-8 h-8 text-soft-300 mx-auto mb-4" />
                  <div className="font-mono font-bold text-4xl text-soft-900 mb-2 tabular-nums">{value}</div>
                  <div className="font-mono text-xs text-soft-400 uppercase tracking-widest">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Education
