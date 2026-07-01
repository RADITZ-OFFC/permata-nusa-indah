import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './WhyUsSection.css'

const highlights = [
  {
    title: 'Legalitas Terjamin',
    sub: 'Sertifikat SHM & IMB sah, terdaftar resmi. Zero masalah hukum sejak 2015.',
  },
  {
    title: 'KPR & Subsidi Mudah',
    sub: '15+ bank nasional rekanan. DP mulai 5%, cicilan mulai Rp 2,5 juta per bulan.',
  },
  {
    title: 'Ketepatan Serah Terima',
    sub: 'Komitmen serahkan kunci tepat waktu sesuai SPK. Track record 100% on-time.',
  },
  {
    title: 'After-Sales 7×24',
    sub: 'Tim customer service siap membantu setiap hari. Rating kepuasan penghuni 97%.',
  },
]

export default function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="whyus-section" ref={ref}>
      <div className="whyus-inner">

        {/* Left: prose */}
        <motion.div
          className="whyus-left"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Mengapa Kami</div>

          <h2 className="whyus-title">
            Kenapa Memilih<br />
            <em>Permata Nusa Indah?</em>
          </h2>

          <p className="whyus-lead">
            Selama 9 tahun, kami membangun kepercayaan lebih dari 1.800 keluarga di Bekasi
            dengan mengutamakan kualitas premium, legalitas SHM langsung, dan layanan
            purna jual terbaik di kelasnya.
          </p>

          <div className="whyus-highlights">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className="whyus-hl-row"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{
                  x: 6,
                  boxShadow: '4px 4px 24px rgba(17,17,16,0.10)',
                  transition: { type: 'spring', stiffness: 400, damping: 28 },
                }}
              >
                <motion.span
                  className="whyus-hl-num"
                  whileHover={{ scale: 1.25 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  0{i + 1}
                </motion.span>
                <div className="whyus-hl-text">
                  <motion.strong
                    whileHover={{ color: 'var(--gold-deep)' }}
                    transition={{ duration: 0.15 }}
                  >
                    {h.title}
                  </motion.strong>
                  <span>{h.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/tentang" className="whyus-cta">
            Kenali Lebih Jauh <ArrowRight size={13} />
          </Link>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          className="whyus-right"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="whyus-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85&fit=crop"
              alt="Permata Nusa Indah"
              className="whyus-photo"
              loading="lazy"
            />
            <div className="whyus-stat-badge">
              <span className="whyus-stat-num">9+</span>
              <span className="whyus-stat-lbl">Tahun Pengalaman</span>
            </div>
          </div>

          <div className="whyus-awards">
            <div className="whyus-award-item">
              <strong>Best Developer 2024</strong>
              <span>REI Award Jawa Barat</span>
            </div>
            <div className="whyus-award-item">
              <strong>1.800+ Unit</strong>
              <span>Terjual sejak 2015</span>
            </div>
            <div className="whyus-award-item">
              <strong>97%</strong>
              <span>Kepuasan pelanggan</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
