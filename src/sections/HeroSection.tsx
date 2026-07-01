import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import './HeroSection.css'

const slides = [
  {
    id: 1,
    label: 'Cluster Chrysoberyl',
    title: ['Hunian Impian', 'di Serang Baru'],
    titleItalic: 1, // index kata yang italic
    desc: 'Permata Nusa Indah menghadirkan hunian premium di Jayamulya, Bekasi — kawasan berkembang pesat dekat tol dan kawasan industri strategis.',
    bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&fit=crop',
  },
  {
    id: 2,
    label: 'Investasi Properti',
    title: ['Nilai yang Tumbuh', 'Setiap Tahun'],
    titleItalic: 0,
    desc: 'ROI rata-rata 18% per tahun. Lokasi strategis di Serang Baru, dekat tol Jabodetabek. Nilai properti terus meningkat pesat.',
    bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&fit=crop',
  },
  {
    id: 3,
    label: 'SHM Langsung',
    title: ['Kavling Premium', 'Siap Bangun'],
    titleItalic: 1,
    desc: 'Kavling dan hunian eksklusif dengan sertifikat SHM langsung atas nama. Wujudkan rumah impian keluarga Anda.',
    bg: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&q=85&fit=crop',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto]       = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [current, auto])

  const goTo = (i: number) => {
    setCurrent(i)
    setAuto(false)
    setTimeout(() => setAuto(true), 12000)
  }

  const slide = slides[current]
  const total = String(slides.length).padStart(2, '0')
  const curr  = String(current + 1).padStart(2, '0')

  return (
    <section className="hero" aria-label="Hero">

      {/* Background */}
      <div className="hero-bg-wrap">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${current}`}
            className="hero-bg"
            style={{ backgroundImage: `url(${slide.bg})` }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Slide counter */}
      <div className="hero-slide-counter" aria-hidden="true">
        <strong>{curr}</strong> / {total}
      </div>

      {/* Left nav dots */}
      <div className="hero-nav" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-nav-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          >
            <div className="hero-nav-dot-fill" />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-cue-text">Scroll</span>
        <ChevronDown size={14} className="hero-scroll-cue-icon" />
      </div>

      {/* Main content */}
      <div className="hero-content">

        {/* Micro label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${current}`}
            className="hero-label"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4 }}
          >
            <div className="hero-label-line" />
            <span className="hero-label-text">{slide.label}</span>
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${current}`}
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {slide.title.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {i === slide.titleItalic ? <em>{line}</em> : line}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        {/* Bottom row */}
        <div className="hero-bottom">

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              className="hero-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {slide.desc}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Link to="/properti" className="hero-cta-primary">
              <span>Lihat Properti</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/kontak" className="hero-cta-secondary">
              <span>Konsultasi Gratis</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
