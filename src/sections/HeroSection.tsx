import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [scrollY, setScrollY] = useState(0)
  const heroRef               = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [current, auto])

  // Parallax on scroll
  const onScroll = useCallback(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      if (rect.bottom > 0) {
        setScrollY(window.scrollY)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const goTo = (i: number) => {
    setCurrent(i)
    setAuto(false)
    setTimeout(() => setAuto(true), 12000)
  }

  const slide = slides[current]
  const total = String(slides.length).padStart(2, '0')
  const curr  = String(current + 1).padStart(2, '0')

  return (
    <section className="hero" aria-label="Hero" ref={heroRef}>

      {/* Background with parallax */}
      <div className="hero-bg-wrap">
        <div
          className="hero-bg-parallax"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`bg-${current}`}
              className="hero-bg"
              style={{ backgroundImage: `url(${slide.bg})` }}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </AnimatePresence>
        </div>
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

        {/* Headline — staggered word reveal */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${current}`}
            className="hero-title"
          >
            {slide.title.map((line, i) => {
              const words = line.split(' ')
              return (
                <span key={i} style={{ display: 'block' }}>
                  {words.map((word, wi) => (
                    <motion.span
                      key={wi}
                      style={{ display: 'inline-block', overflow: 'hidden' }}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + (i * words.length + wi) * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {i === slide.titleItalic ? <em>{word}</em> : word}
                      {wi < words.length - 1 && '\u00A0'}
                    </motion.span>
                  ))}
                </span>
              )
            })}
          </motion.h1>
        </AnimatePresence>

        {/* Bottom row */}
        <div className="hero-bottom">

          {/* Description — blur reveal */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              className="hero-desc"
              initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              {slide.desc}
            </motion.p>
          </AnimatePresence>

          {/* CTAs — slide in from right */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
