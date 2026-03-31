import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { Brain, Layers, Search, Gauge, ShieldCheck, Waypoints } from 'lucide-react'

const Specializations: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const xp   = data.experience
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  const items: any[] = xp.specializations || []

  const levelStyle = (level: string) => {
    switch ((level || '').toLowerCase()) {
      case 'expert':   return 'text-matcha-700 bg-matcha-50 border-matcha-300'
      case 'advanced': return 'text-ocean-700 bg-ocean-50 border-ocean-300'
      default:         return 'text-soft-600 bg-soft-100 border-soft-300'
    }
  }

  const pickIcon = (area: string) => {
    const a = (area || '').toLowerCase()
    if (a.includes('language model') || a.includes('llm')) return Brain
    if (a.includes('multimodal')) return Layers
    if (a.includes('search') || a.includes('retrieval') || a.includes('rag')) return Search
    if (a.includes('eval')) return Gauge
    if (a.includes('routing')) return Waypoints
    return ShieldCheck
  }

  const blurb = (area: string) => {
    const a = (area || '').toLowerCase()
    if (a.includes('language model') || a.includes('llm')) {
      return language === 'ja'
        ? 'プロンプト設計、ツール利用、評価ゲートで「安全に出荷できるLLM」を作る。'
        : 'Ship-ready LLM features: prompts, tool-use patterns, and evaluation gates.'
    }
    if (a.includes('multimodal')) {
      return language === 'ja'
        ? 'テキスト・画像・音声などの統合と、実運用での安定性を重視。'
        : 'Multimodal systems (text/vision/speech) with production reliability in mind.'
    }
    if (a.includes('search') || a.includes('retrieval') || a.includes('rag')) {
      return language === 'ja'
        ? 'セマンティック検索とRAG：チャンク設計、ランキング、品質・コストの最適化。'
        : 'Semantic search & RAG: chunking, ranking, and quality/cost optimization.'
    }
    if (a.includes('eval')) {
      return language === 'ja'
        ? 'オフライン指標＋ヒューマン評価＋回帰検知で品質を継続的に担保。'
        : 'Quality systems: offline metrics, human eval, and regression detection.'
    }
    if (a.includes('routing')) {
      return language === 'ja'
        ? '複数モデルのルーティング：品質・レイテンシ・コストをポリシーで制御。'
        : 'Multi-model routing: policy layers balancing quality, latency, and cost.'
    }
    return language === 'ja'
      ? '本番AIのための設計・運用（監視、デバッグ容易性、ガードレール）。'
      : 'Production AI engineering: observability, debuggability, and guardrails.'
  }

  return (
    <div className="min-h-screen bg-soft-50" ref={ref}>
      <section className="section-padding">
        <div className="container-max">
          <motion.div {...fade(0)} className="mb-12">
            <div className="section-label">{language === 'ja' ? '専門分野' : 'Specializations'}</div>
            <h1 className="mb-3">{language === 'ja' ? '専門分野' : 'Specializations'}</h1>
            <p className="font-sans text-soft-500 max-w-3xl">
              {language === 'ja'
                ? '本番AIシステムで価値を出すために、品質評価・検索・ルーティング・運用まで一気通貫で設計します。'
                : 'I focus on end-to-end production AI: retrieval, evaluation, routing, and operational excellence - not just model demos.'}
            </p>
          </motion.div>

          {items.length === 0 ? (
            <div className="card p-8">
              <p className="font-sans text-sm text-soft-600">
                {language === 'ja'
                  ? '現在、専門分野の情報は準備中です。'
                  : 'Specializations are being prepared.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((s: any, i: number) => {
                  const area  = getLocalizedText(s, 'area', language)
                  const level = getLocalizedText(s, 'expertise_level', language)
                  const Icon  = pickIcon(area)
                  return (
                    <motion.div key={s.area ?? i} {...fade(i * 0.08)} className="card p-7 group">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="w-10 h-10 border border-soft-200 flex items-center justify-center group-hover:border-soft-900 transition-colors duration-200">
                          <Icon className="w-5 h-5 text-soft-500 group-hover:text-soft-900 transition-colors duration-200" />
                        </div>
                        <span className={`tag ${levelStyle(level)}`}>{level}</span>
                      </div>

                      <h3 className="mb-2">{area}</h3>
                      <p className="font-sans text-sm text-soft-600 leading-relaxed mb-6">
                        {blurb(area)}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="w-10 h-px bg-beni-600/70" />
                        <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                          {language === 'ja' ? 'Production focus' : 'Production focus'}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div {...fade(0.35)} className="mt-12 grid md:grid-cols-3 gap-px bg-soft-200">
                {[
                  {
                    k: language === 'ja' ? '品質評価' : 'Evaluation',
                    v: language === 'ja' ? '品質の「測れる化」' : 'Make quality measurable',
                    d: language === 'ja'
                      ? '指標・データ・レビュー運用で回帰を早期検知。'
                      : 'Metrics + datasets + review rituals to catch regressions early.',
                  },
                  {
                    k: language === 'ja' ? '運用' : 'Operations',
                    v: language === 'ja' ? '壊れにくい設計' : 'Design for reliability',
                    d: language === 'ja'
                      ? '監視、デバッグ容易性、ロールバックを前提に設計。'
                      : 'Observability, debuggability, and rollback paths as first-class concerns.',
                  },
                  {
                    k: language === 'ja' ? 'コスト/レイテンシ' : 'Cost/Latency',
                    v: language === 'ja' ? '現実的な最適化' : 'Pragmatic optimization',
                    d: language === 'ja'
                      ? 'ルーティング・キャッシュ・SLOで現実的に最適化。'
                      : 'Routing, caching, and SLOs to optimize in real constraints.',
                  },
                ].map((x, idx) => (
                  <div key={idx} className="bg-white px-8 py-7">
                    <div className="font-mono text-xs text-soft-400 uppercase tracking-wider mb-2">{x.k}</div>
                    <div className="font-mono font-bold text-soft-900 mb-2">{x.v}</div>
                    <div className="font-sans text-sm text-soft-600 leading-relaxed">{x.d}</div>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Specializations

