import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Project } from '../types/portfolio'
import { ExternalLink, Github, Play, X, Award, Lightbulb, CheckCircle } from 'lucide-react'

const Projects: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const projectsData = data.projects
  const [selected, setSelected] = useState<Project | null>(null)
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
            <div className="section-label">{language === 'ja' ? '制作実績' : 'Projects'}</div>
            <h1 className="mb-3">{getLocalizedText(projectsData, 'title', language)}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja'
                ? '革新的なソリューションと創造的なプロジェクト'
                : 'A collection of innovative solutions and creative projects'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Project grid ─────────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-soft-200">
            {projectsData.projects.map((project, i) => (
              <motion.div
                key={project.id}
                {...fade(i * 0.07)}
                onClick={() => setSelected(project)}
                className="bg-white group cursor-pointer hover:bg-soft-50 transition-colors duration-200 flex flex-col"
              >
                {/* Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag">{getLocalizedText(project, 'category', language)}</span>
                    <span className="font-mono text-xs text-soft-400">{project.year}</span>
                  </div>

                  <h3 className="mb-2 group-hover:text-beni-700 transition-colors duration-200">
                    {getLocalizedText(project, 'name', language)}
                  </h3>
                  <p className="font-sans text-sm text-soft-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {getLocalizedText(project, 'description', language)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((t, j) => (
                      <span key={j} className="tag">{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-soft-400 group-hover:text-soft-900 transition-colors duration-200">
                    <span className="font-mono text-xs tracking-wide uppercase">
                      {language === 'ja' ? '詳細を見る' : 'View Details'}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="section-padding bg-white border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-10">
            <div className="section-label">· {language === 'ja' ? 'カテゴリ' : 'Categories'}</div>
            <h2>{language === 'ja' ? 'プロジェクトカテゴリ' : 'Project Categories'}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-soft-200">
            {projectsData.project_categories.map((cat, i) => (
              <motion.div key={cat.name} {...fade(i * 0.08)}
                className="bg-white px-8 py-7 hover:bg-soft-50 transition-colors duration-200">
                <h4 className="mb-1">{getLocalizedText(cat, 'name', language)}</h4>
                <p className="font-sans text-sm text-soft-500 mb-3">
                  {getLocalizedText(cat, 'description', language)}
                </p>
                <span className="font-mono font-bold text-2xl text-soft-900">{cat.count}</span>
                <span className="font-mono text-xs text-soft-400 ml-2 uppercase tracking-wide">
                  {language === 'ja' ? 'projects' : 'projects'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-modal"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header (no screenshots / no banner) */}
              <div className="sticky top-0 z-10 bg-white border-b border-soft-100">
                <div className="px-6 py-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                    {language === 'ja' ? 'プロジェクト詳細' : 'Project details'}
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 bg-soft-50 flex items-center justify-center hover:bg-soft-100 transition-colors duration-150"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-8">
                <p className="font-sans text-soft-600 leading-relaxed mb-6">
                  {getLocalizedText(selected, 'description', language)}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-soft-400" />
                    <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                      {language === 'ja' ? '主な機能' : 'Key Features'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getLocalizedArray(selected, 'features', language).map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1 h-1 bg-beni-500 flex-shrink-0" />
                        <span className="font-sans text-sm text-soft-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges / Solutions */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-soft-400" />
                      <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                        {language === 'ja' ? '課題' : 'Challenges'}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-soft-600 leading-relaxed">
                      {getLocalizedText(selected, 'challenges', language)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-soft-400" />
                      <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                        {language === 'ja' ? '解決策' : 'Solutions'}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-soft-600 leading-relaxed">
                      {getLocalizedText(selected, 'solutions', language)}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <span className="font-mono text-xs text-soft-400 uppercase tracking-wider block mb-3">
                    {language === 'ja' ? '使用技術' : 'Technologies'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.technologies.map((t, i) => <span key={i} className="tag">{t}</span>)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-soft-100">
                  {selected.demo_url && (
                    <a href={selected.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <Play className="w-3.5 h-3.5" />
                      {language === 'ja' ? 'デモを見る' : 'View Demo'}
                    </a>
                  )}
                  {selected.github_url && (
                    <a href={selected.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {selected.live_url && (
                    <a href={selected.live_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      <ExternalLink className="w-3.5 h-3.5" />
                      {language === 'ja' ? 'ライブサイト' : 'Live Site'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
