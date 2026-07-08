import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react'
import propertyImages from '../data/propertyImages'
import './FeaturedProperties.css'

const categories = ['Semua', 'Rumah', 'Ruko', 'Kavling']

const properties = [
  {
    id: 1, type: 'Rumah',
    name: 'Type 36/72 Cluster Chrysoberyl',
    price: 'Rp 450 Juta', status: 'Ready Stock',
    beds: 2, baths: 1, area: 72,
    img: propertyImages[1].thumb,
  },
  {
    id: 2, type: 'Rumah',
    name: 'Type 45/90 Cluster Chrysoberyl',
    price: 'Rp 680 Juta', status: 'Inden 3 Bln',
    beds: 3, baths: 2, area: 90,
    img: propertyImages[2].thumb,
  },
  {
    id: 4, type: 'Rumah',
    name: 'Type 60/120 Cluster Danburite',
    price: 'Rp 980 Juta', status: 'Ready Stock',
    beds: 3, baths: 3, area: 120,
    img: propertyImages[4].thumb,
  },
  {
    id: 6, type: 'Rumah',
    name: 'Type 90/150 Cluster Amazonite',
    price: 'Rp 1,5 Miliar', status: 'Eksklusif',
    beds: 4, baths: 3, area: 150,
    img: propertyImages[6].thumb,
  },
  {
    id: 10, type: 'Kavling',
    name: 'Kavling Premium 180 m²',
    price: 'Rp 720 Juta', status: 'SHM',
    beds: 0, baths: 0, area: 180,
    img: propertyImages[10].thumb,
  },
  {
    id: 8, type: 'Ruko',
    name: 'Ruko 3 Lantai Premium Corner',
    price: 'Rp 2,2 Miliar', status: 'Terbatas',
    beds: 0, baths: 3, area: 200,
    img: propertyImages[8].thumb,
  },
]

export default function FeaturedProperties() {
  const [active, setActive] = useState('Semua')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 })

  const filtered = active === 'Semua'
    ? properties
    : properties.filter(p => p.type === active)

  return (
    <section className="fp-section" ref={ref}>
      <div className="fp-inner">

        {/* Header */}
        <motion.div
          className="fp-header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="fp-header-left">
            <div className="section-label">Pilihan Properti</div>
            <h2 className="fp-title">
              Hunian <em>Terbaik</em><br />untuk Keluarga Anda
            </h2>
          </div>
          <div className="fp-header-right">
            <p className="fp-desc">
              Koleksi hunian premium dirancang untuk kenyamanan keluarga dan nilai investasi jangka panjang di Serang Baru, Bekasi.
            </p>
            <Link to="/properti" className="fp-see-all">
              Lihat Semua Properti <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="fp-filters"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`fp-filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Lookbook Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="fp-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((prop, i) => {
              const isFeature = i === 0
              const reveals = [
                { opacity: 0, y: 32 },                              // standard
                { opacity: 0, x: -24, filter: 'blur(6px)' },       // blur from left
                { opacity: 0, scale: 0.95 },                        // scale up
                { opacity: 0, clipPath: 'inset(0 0 100% 0)' },     // clip from bottom
                { opacity: 0, y: 24, filter: 'blur(4px)' },        // soft blur
                { opacity: 0, x: 24 },                              // slide from right
              ]
              const anim = reveals[i % reveals.length]

              return (
                <motion.div
                  key={prop.id}
                  className={`fp-card ${isFeature ? 'fp-card--feature' : ''}`}
                  initial={anim}
                  animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' } : {}}
                  transition={{ duration: 0.65, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                <Link to={`/properti/${prop.id}`} className="fp-card-link">
                  <div
                    className="fp-card-img"
                    style={{ backgroundImage: `url(${prop.img})` }}
                  />
                  <div className="fp-card-grad" />

                  <span className="fp-card-status">{prop.status}</span>

                  <div className="fp-card-body">
                    <div className="fp-card-tag">{prop.type}</div>
                    <h3 className="fp-card-name">{prop.name}</h3>

                    <div className="fp-card-specs">
                      {prop.beds > 0 && (
                        <span className="fp-card-spec">
                          <Bed size={12} /> {prop.beds} KT
                        </span>
                      )}
                      {prop.baths > 0 && (
                        <span className="fp-card-spec">
                          <Bath size={12} /> {prop.baths} KM
                        </span>
                      )}
                      <span className="fp-card-spec">
                        <Maximize size={12} /> {prop.area} m²
                      </span>
                    </div>

                    <div className="fp-card-footer">
                      <div>
                        <span className="fp-card-price-from">Mulai dari</span>
                        <div className="fp-card-price">{prop.price}</div>
                      </div>
                      <div className="fp-card-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar */}
        <motion.div
          className="fp-cta-bar"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="fp-cta-note">12+ properti tersedia · SHM langsung atas nama · KPR mulai 5% DP</p>
          <Link to="/properti" className="btn-primary">
            Semua Properti <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
