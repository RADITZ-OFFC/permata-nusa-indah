import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import './KontakPage.css'

const interests = ['Cluster Chrysoberyl', 'Cluster Danburite', 'Cluster Amazonite', 'Ruko Komersial', 'Kavling', 'Informasi Umum']
const budgets   = ['Rp 300 – 500 Juta', 'Rp 500 Juta – 1 Miliar', 'Rp 1 – 2 Miliar', 'Di atas Rp 2 Miliar']

const infoCards = [
  { icon: Phone,  title: 'Telepon',           lines: ['0882-9330-9726'],                               color: '#2d6a4f', href: 'tel:+6288293309726' },
  { icon: Mail,   title: 'Email',             lines: ['support@raditzoffc.my.id'],                     color: '#3b82f6', href: 'mailto:support@raditzoffc.my.id' },
  { icon: MapPin, title: 'Marketing Gallery', lines: ['Jl. Kp.Cigelam, Jayamulya', 'Kec. Serang Baru, Kab. Bekasi 17330'], color: '#f59e0b', href: '#' },
  { icon: Clock,  title: 'Jam Operasional',   lines: ['Senin – Sabtu: 08.00 – 17.00', 'Minggu: 09.00 – 15.00'], color: '#8b5cf6', href: '#' },
]

const WA_NUMBER = '6288293309726'

export default function KontakPage() {
  const [form, setForm]           = useState({ name: '', phone: '', email: '', interest: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const lines = [
      'Halo, saya ingin bertanya tentang properti Permata Nusa Indah.',
      '',
      `*Nama:* ${form.name}`,
      `*No. WhatsApp:* ${form.phone}`,
      form.email    ? `*Email:* ${form.email}`      : '',
      form.interest ? `*Minat:* ${form.interest}`   : '',
      form.budget   ? `*Budget:* ${form.budget}`    : '',
      form.message  ? `*Pesan:* ${form.message}`    : '',
    ].filter(Boolean).join('\n')
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="kp-page">
      {/* Hero */}
      <div className="kp-hero">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=75&fit=crop" alt="Kontak" className="kp-hero-bg" />
        <div className="kp-hero-overlay" />
        <div className="kp-hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="breadcrumb">
              <Link to="/">Beranda</Link><span>/</span><span>Kontak</span>
            </nav>
            <h1>Hubungi Kami</h1>
            <p>Tim marketing kami siap membantu Anda menemukan properti impian</p>
          </motion.div>
        </div>
      </div>

      <div className="kp-main">
        {/* Info cards */}
        <div className="kp-info-grid">
          {infoCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.a
                key={i}
                href={card.href}
                className="kp-info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="kp-info-icon" style={{ background: `${card.color}18`, color: card.color }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4>{card.title}</h4>
                  {card.lines.map((l, j) => <p key={j}>{l}</p>)}
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Layout */}
        <div className="kp-layout">
          {/* Form */}
          <motion.div
            className="kp-form-card"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="kp-form-header">
                    <div className="kp-form-header-icon"><MessageCircle size={20} /></div>
                    <div>
                      <h3>Kirim Pesan</h3>
                      <p>Isi formulir dan kami segera menghubungi Anda</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="kp-form">
                    <div className="kp-form-row">
                      <div className="kp-field">
                        <label htmlFor="kp-name">Nama Lengkap *</label>
                        <input id="kp-name" type="text" placeholder="Nama Anda" value={form.name} onChange={e => set('name', e.target.value)} required />
                      </div>
                      <div className="kp-field">
                        <label htmlFor="kp-phone">Nomor WhatsApp *</label>
                        <input id="kp-phone" type="tel" placeholder="0812-3456-7890" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                      </div>
                    </div>
                    <div className="kp-field">
                      <label htmlFor="kp-email">Email</label>
                      <input id="kp-email" type="email" placeholder="email@contoh.com" value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                    <div className="kp-field">
                      <label>Minat Properti</label>
                      <div className="kp-interest-chips">
                        {interests.map(item => (
                          <button key={item} type="button" className={`kp-chip ${form.interest === item ? 'active' : ''}`} onClick={() => set('interest', item)}>{item}</button>
                        ))}
                      </div>
                    </div>
                    <div className="kp-field">
                      <label>Budget</label>
                      <div className="kp-interest-chips">
                        {budgets.map(b => (
                          <button key={b} type="button" className={`kp-chip ${form.budget === b ? 'active' : ''}`} onClick={() => set('budget', b)}>{b}</button>
                        ))}
                      </div>
                    </div>
                    <div className="kp-field">
                      <label htmlFor="kp-msg">Pesan</label>
                      <textarea id="kp-msg" rows={4} placeholder="Tulis pertanyaan atau kebutuhan Anda..." value={form.message} onChange={e => set('message', e.target.value)} />
                    </div>
                    <button type="submit" className="kp-submit-btn" disabled={loading}>
                      {loading
                        ? <div className="kp-loading"><div className="kp-spinner" /><span>Mengirim...</span></div>
                        : <><Send size={16} /><span>Kirim via WhatsApp</span></>
                      }
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" className="kp-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="kp-success-icon"><CheckCircle size={52} /></div>
                  <h3>Pesan Terkirim!</h3>
                  <p>Terima kasih, <strong>{form.name}</strong>! Tim kami akan menghubungi Anda di <strong>{form.phone}</strong> dalam 1×24 jam.</p>
                  <button className="kp-reset-btn" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', interest: '', budget: '', message: '' }) }}>
                    Kirim Pesan Lain
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="kp-sidebar"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Map card */}
            <div className="kp-map-card">
              <div className="kp-map-img-wrap">
                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75&fit=crop" alt="Lokasi" className="kp-map-img" />
                <div className="kp-map-overlay" />
                <div className="kp-map-pin"><MapPin size={28} fill="currentColor" /></div>
                <div className="kp-map-label">
                  <strong>Permata Nusa Indah</strong>
                  <span>Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru, Bekasi 17330</span>
                </div>
              </div>
              <a href="https://maps.google.com/maps?q=-6.404169262632602,107.05518327409885" target="_blank" rel="noopener noreferrer" className="kp-maps-btn">
                <MapPin size={14} /> Buka di Google Maps
              </a>
            </div>

            {/* Quick contacts */}
            <div className="kp-quick-contacts">
              <h4>Hubungi Langsung</h4>
              <a href="tel:+6288293309726" className="kp-qc-btn kp-qc-phone">
                <div className="kp-qc-icon"><Phone size={17} /></div>
                <div>
                  <span>Telepon Sekarang</span>
                  <small>0882-9330-9726</small>
                </div>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang properti Permata Nusa Indah.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="kp-qc-btn kp-qc-wa"
              >
                <div className="kp-qc-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <span>Chat WhatsApp</span>
                  <small>Balasan cepat</small>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
