import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { ArrowUp } from 'lucide-react'

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const Footer: React.FC = () => {
  const { language }  = useLanguage()
  const data          = loadPortfolioData()
  const footerData    = data.footer

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="bg-soft-900 text-soft-300">

      {/* ── Top rule ─────────────────────────────────────────────── */}
      <div className="border-t border-soft-800" />

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

          {/* Brand - col 1-4 */}
          <div className="md:col-span-4">
            {/* Monogram row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 flex items-center justify-center border border-soft-700 font-mono font-bold text-xs text-soft-200">
                R
              </span>
              <span className="font-heading font-bold text-sm text-soft-100 tracking-wide">
                {language === 'ja' ? '藤本麗' : 'Rei Fujimoto'}
              </span>
            </div>

            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-soft-600 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                Software Engineer
              </span>
              <span className="flex-1 h-px bg-soft-800" />
            </div>

            <p className="font-sans text-xs text-soft-500 leading-relaxed mb-6 max-w-xs">
              {language === 'ja'
                ? 'LLMとマルチモーダルAI、本番向け検索・評価・ルーティング。東京墨田区在住のAIエンジニア。'
                : 'LLMs, multimodal AI, and production search, evaluation, and routing. AI engineer based in Sumida-ku, Tokyo.'}
            </p>

            {/* Social buttons */}
            <div className="flex gap-2">
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${footerData.contact_info.email}`}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-soft-700 flex items-center justify-center text-soft-500 hover:border-soft-400 hover:text-soft-200 transition-colors duration-200"
                aria-label="Email"
              >
                <EmailIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/rentsuki320"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-soft-700 flex items-center justify-center text-soft-500 hover:border-soft-400 hover:text-soft-200 transition-colors duration-200"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick links - col 5-12 */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerData.quick_links.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-mono text-soft-600 uppercase mb-4"
                    style={{ fontSize: '0.625rem', letterSpacing: '0.18em' }}>
                  {getLocalizedText(section, 'title', language)}
                </h3>
                <ul className="space-y-2.5">
                  {getLocalizedArray(section, 'links', language).map((link: any, i: number) => (
                    <li key={i}>
                      {link.external ? (
                        <a
                          href={getLocalizedText(link, 'url', language)}
                          target="_blank" rel="noopener noreferrer"
                          className="font-sans text-xs text-soft-500 hover:text-soft-200 transition-colors duration-150"
                        >
                          {getLocalizedText(link, 'text', language)}
                        </a>
                      ) : (
                        <button
                          onClick={() => go(getLocalizedText(link, 'url', language).replace('#', ''))}
                          className="font-sans text-xs text-soft-500 hover:text-soft-200 transition-colors duration-150 text-left"
                        >
                          {getLocalizedText(link, 'text', language)}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom strip ─────────────────────────────────────────── */}
      <div className="border-t border-soft-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Left: copyright + version */}
          <p className="font-mono text-soft-600" style={{ fontSize: '0.625rem', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Rei Fujimoto · v2.1.0 · TOKYO
          </p>

          {/* Centre: beni dot */}
          <span className="hidden sm:block w-1 h-1 bg-beni-700 rounded-full" />

          {/* Right: back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-soft-600 hover:text-soft-300 transition-colors duration-200 group"
            style={{ fontSize: '0.625rem', letterSpacing: '0.15em' }}
            aria-label="Back to top"
          >
            <span className="uppercase">
              {language === 'ja' ? 'トップへ' : 'Top'}
            </span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>

    </footer>
  )
}

export default Footer
