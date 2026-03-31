import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Award, Calendar, ExternalLink } from 'lucide-react'

const Achievements: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const ach  = data.achievements
  const awards: any[] = ach.professional_awards || []
  const certs: any[]  = ach.certifications || []
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
            <div className="section-label">06 · {language === 'ja' ? '実績' : 'Achievements'}</div>
            <h1 className="mb-3">{getLocalizedText(ach, 'title', language)}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja' ? 'プロフェッショナルな成果と認定の軌跡' : 'A journey of professional achievements and certifications'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Awards ───────────────────────────────────────────── */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-10">
            <div className="section-label">· {language === 'ja' ? '受賞' : 'Awards'}</div>
            <h2>{language === 'ja' ? 'プロフェッショナルな賞' : 'Professional Awards'}</h2>
          </motion.div>

          {awards.length === 0 ? (
            <div className="card p-8">
              <p className="font-sans text-sm text-soft-600">
                {language === 'ja'
                  ? '現在、掲載可能な受賞実績はありません。'
                  : 'No awards listed at this time.'}
              </p>
            </div>
          ) : (
            <div className="space-y-px">
              {awards.map((award: any, i) => (
                <motion.div key={award.id ?? i} {...fade(i * 0.08)} className="card">
                  <div className="flex items-start justify-between gap-6 p-8">
                    {/* Left: icon + info */}
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 border border-soft-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <Award className="w-5 h-5 text-soft-500" />
                      </div>
                      <div>
                        <h3 className="mb-1">{getLocalizedText(award, 'title', language)}</h3>
                        <p className="font-sans font-medium text-beni-600 text-sm mb-1">
                          {getLocalizedText(award, 'organization', language)}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-soft-400" />
                          <span className="font-mono text-xs text-soft-400">{award.date}</span>
                        </div>
                      </div>
                    </div>
                    {/* Right: category tag */}
                    <span className="tag flex-shrink-0">{getLocalizedText(award, 'category', language)}</span>
                  </div>

                  <div className="px-8 pb-8 pt-0">
                    <p className="font-sans text-sm text-soft-600 leading-relaxed mb-6">
                      {getLocalizedText(award, 'description', language)}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <span className="font-mono text-xs text-soft-400 uppercase tracking-wider block mb-2">
                          {language === 'ja' ? '関連プロジェクト' : 'Related Project'}
                        </span>
                        <p className="font-sans text-sm text-soft-600">{getLocalizedText(award, 'project_related', language)}</p>
                      </div>
                      <div>
                        <span className="font-mono text-xs text-soft-400 uppercase tracking-wider block mb-2">
                          {language === 'ja' ? '影響' : 'Impact'}
                        </span>
                        <p className="font-sans text-sm text-soft-600">{getLocalizedText(award, 'impact', language)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────── */}
      <section className="section-padding bg-white border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-10">
            <div className="section-label">· {language === 'ja' ? '認定' : 'Certifications'}</div>
            <h2>{language === 'ja' ? '認定・資格' : 'Certifications'}</h2>
          </motion.div>

          {certs.length === 0 ? (
            <div className="card p-8">
              <p className="font-sans text-sm text-soft-600">
                {language === 'ja'
                  ? '現在、掲載可能な資格・認定はありません。'
                  : 'No certifications listed at this time.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-soft-200">
              {certs.map((cert: any, i) => (
                <motion.div key={cert.id ?? i} {...fade(i * 0.08)}
                  className="bg-white p-7 hover:bg-soft-50 transition-colors duration-200 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="mb-1">{getLocalizedText(cert, 'name', language)}</h4>
                      <p className="font-mono text-xs text-beni-600">
                        {getLocalizedText(cert, 'issuer', language)}
                      </p>
                    </div>
                    <Award className="w-4 h-4 text-soft-300 flex-shrink-0 mt-1 ml-3" />
                  </div>

                  <p className="font-sans text-xs text-soft-500 leading-relaxed mb-4 flex-1">
                    {getLocalizedText(cert, 'description', language)}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-soft-400 mb-4">
                    <div>
                      <span className="text-soft-300 uppercase tracking-wide block" style={{ fontSize: '0.6rem' }}>
                        {language === 'ja' ? '取得日' : 'Earned'}
                      </span>
                      <span>{cert.date_earned}</span>
                    </div>
                    <div>
                      <span className="text-soft-300 uppercase tracking-wide block" style={{ fontSize: '0.6rem' }}>
                        {language === 'ja' ? '有効期限' : 'Expires'}
                      </span>
                      <span>{cert.expiry_date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {getLocalizedArray(cert, 'skills_covered', language).map((s: string, j: number) => (
                      <span key={j} className="tag">{s}</span>
                    ))}
                  </div>

                  <a
                    href={cert.verification_url}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-soft-400 hover:text-soft-900 transition-colors duration-150 mt-auto"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {language === 'ja' ? '検証' : 'Verify'}
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Achievements
