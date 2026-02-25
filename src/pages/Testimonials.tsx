import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Star, Quote, ExternalLink, Calendar } from 'lucide-react'

const Testimonials: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const td   = data.testimonials
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
            <div className="section-label">07 · {language === 'ja' ? '推薦の言葉' : 'Testimonials'}</div>
            <h1 className="mb-3">{getLocalizedText(td, 'title', language)}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja'
                ? 'クライアント、同僚、メンターからの推薦の言葉'
                : 'Words of recommendation from clients, colleagues, and mentors'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonial grid ─────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-soft-200">
            {td.testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                {...fade(i * 0.07)}
                className="bg-white p-7 flex flex-col hover:bg-soft-50 transition-colors duration-200"
              >
                {/* Quote mark */}
                <Quote className="w-6 h-6 text-soft-200 mb-4" />

                {/* Testimonial text */}
                <p className="font-sans text-sm text-soft-700 leading-relaxed italic line-clamp-4 mb-4 flex-1">
                  "{getLocalizedText(t, 'testimonial', language)}"
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3 h-3 ${j < t.rating ? 'text-soft-600 fill-current' : 'text-soft-200'}`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="border-t border-soft-100 pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={t.photo_url}
                      alt={getLocalizedText(t, 'name', language)}
                      className="w-9 h-9 object-cover flex-shrink-0 border border-soft-200"
                    />
                    <div>
                      <h4 className="text-sm font-semibold leading-tight">
                        {getLocalizedText(t, 'name', language)}
                      </h4>
                      <p className="font-mono text-xs text-beni-600 leading-tight mt-0.5">
                        {getLocalizedText(t, 'position', language)}
                      </p>
                      <p className="font-mono text-xs text-soft-400">
                        {getLocalizedText(t, 'company', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    <Calendar className="w-3 h-3 text-soft-300" />
                    <span className="font-mono text-xs text-soft-400">{t.date}</span>
                  </div>

                  {/* Qualities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {getLocalizedArray(t, 'key_qualities', language).slice(0, 3).map((q: string, j: number) => (
                      <span key={j} className="tag">{q}</span>
                    ))}
                  </div>

                  <a
                    href={t.linkedin_url}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-soft-400 hover:text-soft-900 transition-colors duration-150"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {language === 'ja' ? 'LinkedInで確認' : 'View on LinkedIn'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
