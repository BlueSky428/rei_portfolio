import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { ArrowUp, Mail, MessageCircle, Send } from 'lucide-react'

const Footer: React.FC = () => {
  const { language }  = useLanguage()
  const data          = loadPortfolioData()
  const footerData    = data.footer
  const contactInfo   = data.contact.contact_info
  const telegramUrl   = getLocalizedText(contactInfo.telegram, 'url', language)
  const whatsappUrl   = getLocalizedText(contactInfo.whatsapp, 'url', language)

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
                <Mail className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href={whatsappUrl}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-soft-700 flex items-center justify-center text-soft-500 hover:border-soft-400 hover:text-soft-200 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href={telegramUrl}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-soft-700 flex items-center justify-center text-soft-500 hover:border-soft-400 hover:text-soft-200 transition-colors duration-200"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
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
