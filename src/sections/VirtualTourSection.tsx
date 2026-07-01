import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X, Phone } from 'lucide-react'
import './VirtualTourSection.css'

const tours = [
  {
    id: 1, name: 'Cluster Chrysoberyl – Eksterior', type: 'Video Walk-through',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop',
    video: '',
  },
  {
    id: 2, name: 'Ruang Tamu Modern', type: 'Tur 360°',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&fit=crop',
    video: '',
  },
  {
    id: 3, name: 'Dapur & Ruang Makan', type: 'Video Walk-through',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85&fit=crop',
    video: '',
  },
  {
    id: 4, name: 'Kamar Tidur Utama', type: 'Tur 360°',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&fit=crop',
    video: '',
  },
]

export default function VirtualTourSection() {
  const [active, setActive]   = useState(0)
  const [playing, setPlaying] = useState(false)
  const [modal, setModal]     = useState(false)
  const videoRef              = useRef<HTMLVideoElement>(null)
  const modalRef              = useRef<HTMLVideoElement>(null)
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 })

  const tour     = tours[active]
  const hasVideo = Boolean(tour.video)

  const handlePlay = () => {
    if (!hasVideo) return
    setPlaying(true)
    setTimeout(() => videoRef.current?.play(), 50)
  }

  const select = (i: number) => {
    videoRef.current?.pause()
    setActive(i)
    setPlaying(false)
  }

  const closeModal = () => {
    modalRef.current?.pause()
    setModal(false)
  }

  return (
    <section className="vt-section" ref={ref}>
      <div className="vt-inner">

        {/* Header */}
        <motion.div
          className="vt-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="section-label">Tur Virtual</div>
            <h2 className="vt-title">
              Jelajahi dari<br /><em>Mana Saja</em>
            </h2>
          </div>
          <p className="vt-subtitle">
            Rasakan pengalaman melihat properti kami secara virtual.
            Video walk-through dan tur 360° untuk setiap unit.
          </p>
        </motion.div>

        {/* Layout */}
        <motion.div
          className="vt-layout"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {/* Main display */}
          <div className="vt-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {playing && hasVideo ? (
                  <video
                    ref={videoRef}
                    src={tour.video}
                    className="vt-video"
                    controls
                    playsInline
                    onEnded={() => setPlaying(false)}
                  />
                ) : (
                  <>
                    <img src={tour.img} alt={tour.name} className="vt-display-img" loading="lazy" />
                    <div className="vt-display-overlay" />
                    <span className="vt-display-label">{tour.type}</span>
                    <div className="vt-display-name"><h4>{tour.name}</h4></div>
                    <button
                      className={`vt-play-btn ${!hasVideo ? 'vt-play-btn--disabled' : ''}`}
                      onClick={handlePlay}
                      title={hasVideo ? 'Putar video' : 'Video segera hadir'}
                      aria-label="Putar video"
                    >
                      <Play size={22} fill="currentColor" />
                    </button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="vt-side">
            {tours.map((t, i) => (
              <button
                key={t.id}
                className={`vt-thumb ${i === active ? 'active' : ''}`}
                onClick={() => select(i)}
                aria-label={t.name}
              >
                <img src={t.img} alt={t.name} loading="lazy" />
                <div className="vt-thumb-info">
                  <span className="vt-thumb-name">{t.name}</span>
                  <span className="vt-thumb-type">{t.type}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA strip */}
        <div className="vt-cta-strip">
          <div className="vt-cta-text">
            <strong>Ingin Tur Langsung?</strong>
            Kunjungi showroom kami di Serang Baru, Bekasi dan rasakan sendiri kualitasnya.
          </div>
          <a href="tel:+6288293309726" className="vt-cta-btn">
            <Phone size={14} />
            Jadwalkan Kunjungan
          </a>
        </div>

      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="vt-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="vt-modal-inner"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="vt-modal-close" onClick={closeModal} aria-label="Tutup">
                <X size={16} />
              </button>
              <video ref={modalRef} src={tour.video} controls autoPlay playsInline />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
