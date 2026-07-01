import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Phone, Calendar, ArrowRight, CheckCircle } from 'lucide-react'
import './CTASection.css'

const perks = [
  'Konsultasi gratis tanpa komitmen',
  'KPR mudah 15+ bank rekanan',
  'Cicilan mulai Rp 2,5 jt/bulan',
  'Sertifikat SHM langsung atas nama',
  'Serah terima tepat waktu 100%',
]

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-inner">

        {/* Left */}
        <motion.div
          className="cta-left"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="section-label section-label--light">Hubungi Kami</div>
          <h2 className="cta-title">
            Wujudkan Rumah<br />
            <em>Impian Keluarga</em>
          </h2>
          <p className="cta-desc">
            Hubungi tim marketing kami sekarang dan dapatkan penawaran spesial.
            Cicilan mulai Rp 2,5 jt/bulan dengan DP ringan hanya 5%.
          </p>
          <div className="cta-perks">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                className="cta-perk"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                <CheckCircle size={14} />
                <span>{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: card */}
        <motion.div
          className="cta-right"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className="cta-card">
            <span className="cta-card-label">Penawaran Terbatas</span>
            <h3 className="cta-card-title">Mulai Perjalanan<br />Menuju Hunian Impian</h3>
            <p className="cta-card-sub">Tim kami siap membantu 7 hari seminggu</p>

            <div className="cta-stats">
              {[
                { val: '1.800+', lbl: 'Unit Terjual' },
                { val: '9 Th',   lbl: 'Pengalaman'  },
                { val: '97%',    lbl: 'Kepuasan'     },
              ].map((s, i) => (
                <div key={i} className="cta-stat">
                  <span className="cta-stat-val">{s.val}</span>
                  <span className="cta-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            <div className="cta-buttons">
              <a href="tel:+6288293309726" className="cta-btn-call">
                <Phone size={18} />
                <div>
                  <span className="cta-btn-call-label">Hubungi Sekarang</span>
                  <span className="cta-btn-call-sub">0882-9330-9726</span>
                </div>
              </a>
              <Link to="/kontak" className="cta-btn-visit">
                <Calendar size={15} />
                <span>Jadwalkan Kunjungan</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
