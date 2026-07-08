import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Car, Train, ShoppingBag, GraduationCap, Hospital, Plane, Clock, ExternalLink } from 'lucide-react'
import './LocationSection.css'

const nearby = [
  { icon: Car,           label: 'Tol Cibitung-Cilincing', dist: '3 km',  time: '5 mnt',  color: '#2d6a4f' },
  { icon: Train,         label: 'Stasiun Cikarang',       dist: '10 km', time: '15 mnt', color: '#3b82f6' },
  { icon: ShoppingBag,   label: 'Grand Cikarang City Mall',dist: '8 km',  time: '12 mnt', color: '#8b5cf6' },
  { icon: GraduationCap, label: 'Univ. Pelita Bangsa',    dist: '6 km',  time: '10 mnt', color: '#f59e0b' },
  { icon: Hospital,      label: 'RS Karya Medika',        dist: '5 km',  time: '8 mnt',  color: '#ef4444' },
  { icon: Plane,         label: 'Bandara Soekarno-Hatta', dist: '50 km', time: '60 mnt', color: '#10b981' },
]

const MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.921076925716!2d107.05518327409885!3d-6.404169262632602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69971b3f8ef85f%3A0xe4bf44c4f884ca2d!2sPermata%20Nusa%20Indah%20Jaya%20Mulya!5e0!3m2!1sid!2sid!4v1781843567840!5m2!1sid!2sid`
const MAPS_LINK  = `https://www.google.com/maps?q=-6.404169262632602,107.05518327409885`

export default function LocationSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="loc-section" ref={ref}>
      <div className="loc-container">

        {/* Header */}
        <motion.div
          className="loc-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Lokasi</div>
          <h2 className="loc-title">
            Akses Mudah ke <em>Mana Saja</em>
          </h2>
          <p className="loc-subtitle">
            Terletak di Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru, Kabupaten Bekasi —
            kawasan berkembang pesat dengan akses tol, industri, dan fasilitas lengkap.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="loc-layout">

          {/* Map */}
          <motion.div
            className="loc-map-panel"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="loc-map-wrap">
              <div className="loc-map-header">
                <span className="loc-map-label">Lokasi di Google Maps</span>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="loc-map-open-link">
                  <ExternalLink size={13} /> Buka Maps
                </a>
              </div>
              <iframe
                title="Lokasi Permata Nusa Indah"
                src={MAPS_EMBED}
                className="loc-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="loc-address">
              <div className="loc-address-icon">
                <MapPin size={16} />
              </div>
              <div className="loc-address-text">
                <strong>Marketing Gallery</strong>
                <p>Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru,<br />Kabupaten Bekasi, Jawa Barat 17330</p>
                <div className="loc-address-hours">
                  <Clock size={11} />
                  <span>Senin – Minggu, 08.00 – 17.00 WIB</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Points */}
          <motion.div
            className="loc-points-panel"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <h4 className="loc-points-title">Fasilitas & Akses Terdekat</h4>

            <div className="loc-points-grid">
              {nearby.map((pt, i) => {
                const Icon = pt.icon
                const revealAnims = [
                  { opacity: 0, x: 16 },
                  { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
                  { opacity: 0, y: 12, filter: 'blur(4px)' },
                  { opacity: 0, x: -16 },
                  { opacity: 0, scale: 0.95 },
                  { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
                ]
                return (
                  <motion.div
                    key={i}
                    className="loc-point"
                    initial={revealAnims[i % revealAnims.length]}
                    animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0%)' } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="loc-point-icon" style={{ background: `${pt.color}18`, color: pt.color }}>
                      <Icon size={16} />
                    </div>
                    <span className="loc-point-label">{pt.label}</span>
                    <span className="loc-point-dist">{pt.dist}</span>
                    <div className="loc-point-time">
                      <Clock size={10} />
                      <span>{pt.time}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="loc-route">
              <div className="loc-route-icon"><Car size={18} /></div>
              <div className="loc-route-text">
                <strong>Akses Tol Langsung</strong>
                <p>Pintu tol hanya 3 km. Jakarta sekitar 45 menit via Tol Cibitung-Cilincing.</p>
              </div>
              <span className="loc-route-badge">3 km</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
