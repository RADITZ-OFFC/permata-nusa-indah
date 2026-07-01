import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Phone } from 'lucide-react'
import './NotFoundPage.css'

const suggestions = [
  { label: 'Beranda',           to: '/' },
  { label: 'Semua Properti',    to: '/properti' },
  { label: 'Tentang Kami',      to: '/tentang' },
  { label: 'Hubungi Kami',      to: '/kontak' },
]

export default function NotFoundPage() {
  const navigate                  = useNavigate()
  const [countdown, setCountdown] = useState(10)

  /* Auto-redirect ke beranda setelah 10 detik */
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); navigate('/'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [navigate])

  return (
    <div className="nfp-page">
      {/* Background subtle */}
      <div className="nfp-bg" aria-hidden="true" />

      <div className="nfp-inner">
        {/* Large 404 */}
        <motion.div
          className="nfp-code"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden="true"
        >
          404
        </motion.div>

        {/* Content */}
        <motion.div
          className="nfp-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="section-label">Halaman Tidak Ditemukan</div>

          <h1 className="nfp-title">
            Halaman yang Anda cari<br />
            <em>tidak tersedia</em>
          </h1>

          <p className="nfp-desc">
            Mungkin URL salah ketik, halaman telah dipindah, atau sudah dihapus.
            Anda akan diarahkan ke Beranda dalam{' '}
            <span className="nfp-countdown">{countdown}</span> detik.
          </p>

          {/* Actions */}
          <div className="nfp-actions">
            <button className="nfp-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={14} />
              <span>Kembali</span>
            </button>
            <Link to="/" className="nfp-home-btn">
              <Home size={14} />
              <span>Ke Beranda</span>
            </Link>
            <a href="tel:+6288293309726" className="nfp-phone-btn">
              <Phone size={14} />
              <span>Hubungi Kami</span>
            </a>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className="nfp-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <span className="nfp-links-label">Atau pilih halaman:</span>
          <div className="nfp-links-grid">
            {suggestions.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                <Link to={s.to} className="nfp-link-item">
                  {s.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
