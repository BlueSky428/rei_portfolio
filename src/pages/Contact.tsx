import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { WhatsAppIcon } from '../components/icons/SocialIcons'
import { Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'

const Contact: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const cd   = data.contact
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  const contactRows = [
    {
      Icon: Mail,
      label: getLocalizedText(cd.contact_info.email, 'label', language),
      value: cd.contact_info.email.address,
      href:  `https://mail.google.com/mail/?view=cm&to=${cd.contact_info.email.address}`,
      note:  getLocalizedText(cd.contact_info.email, 'description', language),
    },
    {
      Icon: WhatsAppIcon,
      label: getLocalizedText(cd.contact_info.whatsapp, 'label', language),
      value: getLocalizedText(cd.contact_info.whatsapp, 'number', language),
      href:  getLocalizedText(cd.contact_info.whatsapp, 'url', language),
      note:  getLocalizedText(cd.contact_info.whatsapp, 'description', language),
    },
    {
      Icon: Send,
      label: getLocalizedText(cd.contact_info.telegram, 'label', language),
      value: getLocalizedText(cd.contact_info.telegram, 'username', language),
      href:  getLocalizedText(cd.contact_info.telegram, 'url', language),
      note:  getLocalizedText(cd.contact_info.telegram, 'description', language),
    },
    {
      Icon: MapPin,
      label: getLocalizedText(cd.contact_info.location, 'label', language),
      value: cd.contact_info.location.address,
      href:  null,
      note:  getLocalizedText(cd.contact_info.location, 'description', language),
    },
    {
      Icon: Clock,
      label: getLocalizedText(cd.contact_info.timezone, 'label', language),
      value: cd.contact_info.timezone.zone,
      href:  null,
      note:  getLocalizedText(cd.contact_info.timezone, 'description', language),
    },
  ]

  return (
    <div className="min-h-screen bg-soft-50" ref={ref}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div {...fade(0)}>
            <div className="section-label">{language === 'ja' ? 'お問い合わせ' : 'Contact'}</div>
            <h1 className="mb-3">{getLocalizedText(cd, 'title', language)}</h1>
            <p className="font-sans text-soft-500 max-w-xl">
              {getLocalizedText(cd, 'description', language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact info ─────────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="max-w-2xl">
            {/* Contact rows */}
            <motion.div {...fade(0.1)} className="card mb-6">
              <div className="px-8 pt-7 pb-2">
                <span className="font-mono text-xs text-soft-400 uppercase tracking-wider">
                  {language === 'ja' ? '連絡先情報' : 'Contact Information'}
                </span>
              </div>
              {contactRows.map(({ Icon, label, value, href, note }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 px-8 py-5 border-t border-soft-100 group"
                >
                  <div className="w-8 h-8 border border-soft-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-soft-400 transition-colors duration-150">
                    <Icon className="w-3.5 h-3.5 text-soft-500" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-soft-400 uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank" rel="noopener noreferrer"
                        className="font-sans font-medium text-soft-900 hover:text-beni-600 transition-colors duration-150 text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans font-medium text-soft-900 text-sm">{value}</p>
                    )}
                    <p className="font-sans text-xs text-soft-400 mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Availability card */}
            <motion.div {...fade(0.2)} className="card">
              <div className="px-8 pt-7 pb-5">
                <span className="font-mono text-xs text-soft-400 uppercase tracking-wider block mb-5">
                  {language === 'ja' ? '利用可能性' : 'Availability'}
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-4 h-4 text-matcha-600" />
                  <span className="font-heading font-semibold text-matcha-700 text-sm">
                    {getLocalizedText(cd.availability, 'status', language)}
                  </span>
                </div>
                <p className="font-sans text-sm text-soft-600 leading-relaxed mb-4">
                  {getLocalizedText(cd.availability, 'description', language)}
                </p>
                <div className="space-y-1 text-xs font-mono text-soft-400">
                  <p>{getLocalizedText(cd.availability, 'response_time', language)}</p>
                  <p>{getLocalizedText(cd.availability, 'working_hours', language)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
