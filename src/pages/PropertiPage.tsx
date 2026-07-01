import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize, Heart, ArrowRight, Star, X, Grid, List } from 'lucide-react'
import propertyImages from '../data/propertyImages'
import './PropertiPage.css'

const allProperties = [
  { id: 1,  type: 'Rumah',   name: 'Type 36/72 – Cluster Chrysoberyl',     price: 'Rp 450 Juta',    area: 72,  building: 36,  beds: 2, baths: 1, cluster: 'Cluster Chrysoberyl',  status: 'Ready Stock', img: propertyImages[1].thumb,  rating: 4.8, badge: 'DP 5%' },
  { id: 2,  type: 'Rumah',   name: 'Type 45/90 – Cluster Chrysoberyl',     price: 'Rp 680 Juta',    area: 90,  building: 45,  beds: 3, baths: 2, cluster: 'Cluster Chrysoberyl',  status: 'Inden',       img: propertyImages[2].thumb,  rating: 4.9, badge: 'Terlaris' },
  { id: 3,  type: 'Rumah',   name: 'Type 54/108 – Cluster Chrysoberyl',    price: 'Rp 820 Juta',    area: 108, building: 54,  beds: 3, baths: 2, cluster: 'Cluster Chrysoberyl',  status: 'Ready Stock', img: propertyImages[3].thumb,  rating: 4.8, badge: 'Baru' },
  { id: 4,  type: 'Rumah',   name: 'Type 60/120 – Cluster Danburite',      price: 'Rp 980 Juta',    area: 120, building: 60,  beds: 3, baths: 3, cluster: 'Cluster Danburite',    status: 'Ready Stock', img: propertyImages[4].thumb,  rating: 4.8, badge: 'Premium' },
  { id: 5,  type: 'Rumah',   name: 'Type 70/140 – Cluster Danburite',      price: 'Rp 1,2 Miliar',  area: 140, building: 70,  beds: 4, baths: 3, cluster: 'Cluster Danburite',    status: 'Inden',       img: propertyImages[5].thumb,  rating: 4.9, badge: 'Eksklusif' },
  { id: 6,  type: 'Rumah',   name: 'Type 90/150 – Cluster Amazonite',      price: 'Rp 1,5 Miliar',  area: 150, building: 90,  beds: 4, baths: 3, cluster: 'Cluster Amazonite',    status: 'Ready Stock', img: propertyImages[6].thumb,  rating: 5.0, badge: 'Luxury' },
  { id: 7,  type: 'Ruko',    name: 'Ruko 2 Lantai – Tipe Standar',         price: 'Rp 1,3 Miliar',  area: 120, building: 80,  beds: 0, baths: 2, cluster: 'Ruko Komersial',       status: 'Ready Stock', img: propertyImages[7].thumb,  rating: 4.6, badge: 'Strategis' },
  { id: 8,  type: 'Ruko',    name: 'Ruko 3 Lantai – Premium Corner',       price: 'Rp 2,2 Miliar',  area: 200, building: 150, beds: 0, baths: 4, cluster: 'Ruko Komersial',       status: 'Terbatas',    img: propertyImages[8].thumb,  rating: 4.7, badge: 'Corner Lot' },
  { id: 9,  type: 'Kavling', name: 'Kavling Reguler 150 m²',               price: 'Rp 600 Juta',    area: 150, building: 0,   beds: 0, baths: 0, cluster: 'Zona Kavling',         status: 'Ready Stock', img: propertyImages[9].thumb,  rating: 4.5, badge: 'SHM' },
  { id: 10, type: 'Kavling', name: 'Kavling Premium 180 m²',               price: 'Rp 720 Juta',    area: 180, building: 0,   beds: 0, baths: 0, cluster: 'Zona Kavling',         status: 'Ready Stock', img: propertyImages[10].thumb, rating: 4.6, badge: 'Investasi' },
  { id: 11, type: 'Rumah',   name: 'Type 120/200 – Cluster Amazonite',     price: 'Rp 2,3 Miliar',  area: 200, building: 120, beds: 5, baths: 4, cluster: 'Cluster Amazonite',    status: 'Inden',       img: propertyImages[11].thumb, rating: 5.0, badge: 'Super Luxury' },
  { id: 12, type: 'Ruko',    name: 'Ruko 4 Lantai – Grand Corner',         price: 'Rp 3,5 Miliar',  area: 280, building: 200, beds: 0, baths: 5, cluster: 'Ruko Komersial',       status: 'Terbatas',    img: propertyImages[12].thumb, rating: 4.8, badge: 'Flagship' },
]

const statusColor: Record<string, string> = {
  'Ready Stock': '#10b981',
  'Inden': '#f59e0b',
  'Terbatas': '#ef4444',
}

export default function PropertiPage() {
  const [typeFilter, setTypeFilter]     = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch]             = useState('')
  const [liked, setLiked]               = useState<number[]>([])
  const [showFilters, setShowFilters]   = useState(false)
  const [viewMode, setViewMode]         = useState<'grid' | 'list'>('grid')

  const filtered = allProperties.filter(p => {
    const matchType   = typeFilter === 'Semua' || p.type === typeFilter
    const matchStatus = !statusFilter || p.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.cluster.toLowerCase().includes(q)
    return matchType && matchStatus && matchSearch
  })

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="pp-page">
      {/* Hero */}
      <div className="pp-hero">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=75&fit=crop"
          alt="Properti Permata Nusa Indah"
          className="pp-hero-bg"
        />
        <div className="pp-hero-overlay" />
        <div className="pp-hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="breadcrumb">
              <Link to="/">Beranda</Link><span>/</span><span>Properti</span>
            </nav>
            <h1>Semua Properti</h1>
            <p>{allProperties.length}+ pilihan properti premium di Serang Baru, Bekasi</p>
          </motion.div>
        </div>
      </div>

      <div className="pp-main">
        {/* Filter bar */}
        <div className="pp-filter-bar">
          <div className="pp-search-wrap">
            <Search size={16} />
            <input
              type="text"
              placeholder="Cari nama properti atau cluster..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="pp-clear-btn" onClick={() => setSearch('')} aria-label="Hapus pencarian">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="pp-type-chips">
            {['Semua', 'Rumah', 'Ruko', 'Kavling'].map(t => (
              <button
                key={t}
                className={`pp-chip ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="pp-bar-right">
            <button
              className={`pp-filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} /><span>Filter</span>
            </button>
            <div className="pp-view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} aria-label="Grid view"><Grid size={15} /></button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} aria-label="List view"><List size={15} /></button>
            </div>
          </div>
        </div>

        {/* Advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="pp-adv-filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="adv-filter-group">
                <label>Status</label>
                <div className="adv-chips">
                  {['', 'Ready Stock', 'Inden', 'Terbatas'].map(s => (
                    <button
                      key={s}
                      className={`pp-chip small ${statusFilter === s ? 'active' : ''}`}
                      onClick={() => setStatusFilter(s)}
                    >
                      {s || 'Semua Status'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results bar */}
        <div className="pp-results-bar">
          <span>Menampilkan <strong>{filtered.length}</strong> dari {allProperties.length} properti</span>
          {(search || typeFilter !== 'Semua' || statusFilter) && (
            <button className="pp-reset-btn" onClick={() => { setSearch(''); setTypeFilter('Semua'); setStatusFilter('') }}>
              <X size={12} /> Reset Filter
            </button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${typeFilter}-${statusFilter}-${viewMode}`}
            className={`pp-grid ${viewMode === 'list' ? 'pp-list' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((prop, i) => (
              <motion.div
                key={prop.id}
                className="pp-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              >
                <Link to={`/properti/${prop.id}`} className="pp-card-link">
                  <div className="pp-card-img-wrap">
                    <motion.div
                      className="pp-card-img"
                      style={{ backgroundImage: `url(${prop.img})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="pp-card-img-overlay" />
                    <div className="pp-card-badges">
                      <span className="pp-status" style={{ background: statusColor[prop.status] || '#6b7280' }}>
                        {prop.status}
                      </span>
                      <span className="pp-badge-tag">{prop.badge}</span>
                    </div>
                    <motion.button
                      className={`pp-like ${liked.includes(prop.id) ? 'liked' : ''}`}
                      onClick={e => toggleLike(prop.id, e)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Simpan properti"
                    >
                      <Heart size={13} fill={liked.includes(prop.id) ? 'currentColor' : 'none'} />
                    </motion.button>
                    <div className="pp-rating">
                      <Star size={11} fill="currentColor" /><span>{prop.rating}</span>
                    </div>
                  </div>

                  <div className="pp-card-body">
                    <div className="pp-card-cluster"><MapPin size={11} /><span>{prop.cluster}</span></div>
                    <h3 className="pp-card-name">{prop.name}</h3>
                    <div className="pp-card-specs">
                      {prop.beds > 0   && <span className="pp-spec"><Bed size={11} />{prop.beds} KT</span>}
                      {prop.baths > 0  && <span className="pp-spec"><Bath size={11} />{prop.baths} KM</span>}
                      <span className="pp-spec"><Maximize size={11} />{prop.area} m²</span>
                      {prop.building > 0 && <span className="pp-spec">LB {prop.building} m²</span>}
                    </div>
                    <div className="pp-card-footer">
                      <div>
                        <span className="pp-price-from">Mulai dari</span>
                        <span className="pp-price">{prop.price}</span>
                      </div>
                      <div className="pp-card-cta">
                        <span>Detail</span><ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div className="pp-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="pp-empty-icon">🏠</div>
            <h3>Tidak ditemukan</h3>
            <p>Coba ubah atau reset filter pencarian Anda</p>
            <button onClick={() => { setTypeFilter('Semua'); setSearch(''); setStatusFilter('') }} className="pp-reset-big">
              Reset Filter
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
