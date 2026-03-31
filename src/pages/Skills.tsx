import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { Code, Server, Cloud, Brain, Calendar, TrendingUp, Award } from 'lucide-react'

const Skills: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const skillsData = data.skills
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

  const iconMap = {
    'paint-brush': Code,
    'server':      Server,
    'cloud':       Cloud,
    'brain':       Brain,
  }

  const levelBadge = (level: string) => {
    switch (level) {
      case 'Expert':       return 'text-matcha-700 bg-matcha-50 border-matcha-300'
      case 'Advanced':     return 'text-ocean-700 bg-ocean-50 border-ocean-300'
      case 'Intermediate': return 'text-soft-600 bg-soft-100 border-soft-300'
      default:             return 'text-soft-500 bg-soft-50 border-soft-200'
    }
  }

  const pct = (level: string) =>
    ({ Expert: 90, Advanced: 75, Intermediate: 60, Beginner: 30 }[level] ?? 50)

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
            <div className="section-label">{language === 'ja' ? 'スキル' : 'Skills'}</div>
            <h1 className="mb-3">{getLocalizedText(skillsData, 'title', language)}</h1>
            <p className="font-sans text-soft-500">
              {language === 'ja'
                ? 'モダンなテクノロジーと継続的な学習への情熱'
                : 'Passion for modern technologies and continuous learning'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Skill categories ─────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max space-y-px">
          {skillsData.categories.map((cat, ci) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] || Code
            return (
              <motion.div key={cat.id} {...fade(ci * 0.1)} className="card">
                {/* Category header */}
                <div className="flex items-center gap-5 px-8 py-6 border-b border-soft-100">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cat.color}18`, border: `1px solid ${cat.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="mb-0.5">{getLocalizedText(cat, 'name', language)}</h3>
                    <p className="font-sans text-xs text-soft-500">{getLocalizedText(cat, 'description', language)}</p>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-soft-100">
                  {cat.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      {...fade(ci * 0.1 + si * 0.05)}
                      className="bg-white p-6 hover:bg-soft-50 transition-colors duration-150"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-semibold leading-tight">
                          {getLocalizedText(skill, 'name', language)}
                        </h4>
                        <span className={`font-mono text-xs border px-2 py-0.5 ml-2 flex-shrink-0 ${levelBadge(skill.level)}`}>
                          {getLocalizedText(skill, 'level', language)}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-soft-500 leading-relaxed mb-4">
                        {getLocalizedText(skill, 'description', language)}
                      </p>

                      {/* Stats row */}
                      <div className="space-y-2 text-xs font-mono text-soft-400">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {language === 'ja' ? '経験' : 'Exp'}
                          </span>
                          <span>{skill.years_experience}{language === 'ja' ? '年' : 'yr'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-3 h-3" />
                            {language === 'ja' ? 'PJ' : 'PJ'}
                          </span>
                          <span>{skill.projects_used}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs font-mono text-soft-400 mb-1">
                          <span>{language === 'ja' ? '習熟度' : 'Proficiency'}</span>
                          <span>{pct(skill.level)}%</span>
                        </div>
                        <div className="h-0.5 bg-soft-100">
                          <div
                            className="h-0.5 transition-all duration-1000"
                            style={{ width: `${pct(skill.level)}%`, backgroundColor: cat.color }}
                          />
                        </div>
                      </div>

                      {skill.certifications.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3 text-xs font-mono text-soft-400">
                          <Award className="w-3 h-3" />
                          <span>{skill.certifications.length} cert{skill.certifications.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Levels legend ────────────────────────────────────── */}
      <section className="section-padding bg-white border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-10">
            <div className="section-label">· {language === 'ja' ? 'レベル' : 'Levels'}</div>
            <h2>{language === 'ja' ? 'スキルレベル' : 'Skill Levels'}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-soft-200">
            {skillsData.skill_levels.map((lv, i) => (
              <motion.div key={lv.level} {...fade(i * 0.08)}
                className="bg-white px-8 py-7 hover:bg-soft-50 transition-colors duration-200">
                <div className="font-mono font-bold text-3xl mb-2 tabular-nums" style={{ color: lv.color }}>
                  {lv.percentage}%
                </div>
                <h4 className="mb-1">{getLocalizedText(lv, 'level', language)}</h4>
                <p className="font-sans text-xs text-soft-500 leading-relaxed">
                  {getLocalizedText(lv, 'description', language)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning goals ───────────────────────────────────── */}
      <section className="section-padding border-t border-soft-200">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-10">
            <div className="section-label">· {language === 'ja' ? '学習目標' : 'Goals'}</div>
            <h2>{language === 'ja' ? '学習目標' : 'Learning Goals'}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-soft-200">
            {skillsData.learning_goals.map((g, i) => (
              <motion.div key={g.skill} {...fade(i * 0.1)} className="bg-white px-8 py-7 hover:bg-soft-50 transition-colors duration-200">
                <h4 className="mb-2">{getLocalizedText(g, 'skill', language)}</h4>
                <p className="font-sans text-sm text-soft-500 leading-relaxed mb-3">
                  {getLocalizedText(g, 'reason', language)}
                </p>
                <span className="font-mono text-xs text-beni-600">{g.target_date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
