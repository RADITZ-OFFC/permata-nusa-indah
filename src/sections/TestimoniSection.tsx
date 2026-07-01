import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import './TestimoniSection.css'

const testimonials = [
  {
    id: 1,
    quote: 'Sudah 2 tahun tinggal di sini dan sangat puas. Lingkungannya bersih, aman, dan tim CS Permata Nusa Indah sangat responsif saat ada keluhan. Tidak menyesal memilih developer ini.',
    name: 'Budi Santoso',
    role: 'Software Engineer',
    unit: 'Cluster Chrysoberyl, Type 45',
    year: '2022',
  },
  {
    id: 2,
    quote: 'Prosesnya sangat mudah dan transparan. Dari tanda tangan kontrak sampai terima kunci tepat jadwal. Kualitas bangunan premium, lokasi Serang Baru sangat strategis dekat tol. Sangat recommended untuk investasi.',
    name: 'dr. Sari Dewi',
    role: 'Dokter Spesialis',
    unit: 'Cluster Amazonite, Type 90',
    year: '2023',
  },
  {
    id: 3,
    quote: 'Beli ruko di Permata Nusa Indah sebagai investasi dan ternyata tepat. Nilai propertinya naik 18% dalam 2 tahun. Akses ke tol sangat mudah untuk distribusi bisnis saya.',
    name: 'Andi Wijaya',
    role: 'Pengusaha',
    unit: 'Ruko Komersial 3 Lantai',
    year: '2021',
  },
  {
    id: 4,
    quote: 'Awalnya ragu karena budget terbatas, tapi ada skema KPR yang sangat terjangkau. Sekarang bisa punya rumah sendiri dengan cicilan ringan. Marketing-nya sabar menjelaskan dari awal.',
    name: 'Nina Rahma',
    role: 'Guru SD',
    unit: 'Cluster Danburite, Type 60',
    year: '2023',
  },
  {
    id: 5,
    quote: 'Fasilitas perumahan sangat lengkap — taman bermain anak, security 24 jam, dan lokasi strategis. Anak-anak saya senang bermain di lingkungan yang bersih dan aman.',
    name: 'Hendra Kusuma',
    role: 'Manajer HRD',
    unit: 'Cluster Chrysoberyl, Type 45',
    year: '2022',
  },
]

export default function TestimoniSection() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 })

  const prev = () => { setDir(-1); setCurrent(c => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setDir(1);  setCurrent(c => (c + 1) % testimonials.length) }
  const go   = (i: number) => { setDir(i > current ? 1 : -1); setCurrent(i) }

  const t = testimonials[current]

  return (
    <section className="testi-section" ref={ref}>
      <div className="testi-inner">

        {/* Header */}
        <motion.div
          className="testi-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="testi-header-left">
            <div className="section-label section-label--light">Testimoni</div>
            <h2 className="testi-title">
              Kata <em>Penghuni Kami</em>
            </h2>
          </div>

          <div className="testi-nav-btns">
            <button className="testi-nav-btn" onClick={prev} aria-label="Sebelumnya">
              <ChevronLeft size={18} />
            </button>
            <button className="testi-nav-btn" onClick={next} aria-label="Selanjutnya">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Pull quote */}
        <div className="testi-quote-wrap">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              className="testi-quote"
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <span className="testi-quote-mark">"</span>
              <p className="testi-quote-text">{t.quote}</p>
              <div className="testi-quote-author">
                <div className="testi-author-line" />
                <span className="testi-author-name">{t.name}</span>
                <span className="testi-author-meta">— {t.role} · {t.unit} · {t.year}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <motion.div
          className="testi-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === current ? 'active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="testi-score">
            <span className="testi-score-num">4.9</span>
            <div className="testi-score-meta">
              <div className="testi-score-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
              </div>
              <span className="testi-score-label">dari 1.200+ ulasan penghuni</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
