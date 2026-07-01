import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Phone, Heart, Star,
  Shield, CheckCircle, ChevronLeft, ChevronRight, Calculator, Send, Share2, Home } from 'lucide-react'
import propertyImages from '../data/propertyImages'
import './PropertiDetailPage.css'

const allProperties = [
  { id: 1,  type: 'Rumah',   name: 'Type 36/72 – Cluster Chrysoberyl',   price: 450000000,  priceLabel: 'Rp 450 Juta',   area: 72,  building: 36,  beds: 2, baths: 1, cluster: 'Cluster Chrysoberyl',  status: 'Ready Stock', badge: 'DP 5%',        floors: 1, carport: 1, desc: 'Hunian starter ideal di Cluster Chrysoberyl dengan desain modern minimalis. Cocok untuk pasangan muda yang ingin memiliki rumah pertama dengan harga terjangkau di lokasi strategis Serang Baru, Bekasi.',       features: ['Dapur semi-basah', 'Taman depan', 'Carport 1 mobil', 'Atap genteng beton', 'Listrik 1300 watt', 'Air PDAM'],                                                             imgs: propertyImages[1].imgs },
  { id: 2,  type: 'Rumah',   name: 'Type 45/90 – Cluster Chrysoberyl',   price: 680000000,  priceLabel: 'Rp 680 Juta',   area: 90,  building: 45,  beds: 3, baths: 2, cluster: 'Cluster Chrysoberyl',  status: 'Inden',       badge: 'Terlaris',     floors: 1, carport: 1, desc: 'Unit terlaris di Cluster Chrysoberyl! Rumah 1 lantai dengan 3 kamar tidur, taman asri, dan desain modern fungsional.',                                                                                   features: ['Taman depan & belakang', 'Dapur set built-in', 'Carport 1 mobil', 'Listrik 2200 watt', 'Air PDAM', 'CCTV kawasan'],                                                          imgs: propertyImages[2].imgs },
  { id: 3,  type: 'Rumah',   name: 'Type 54/108 – Cluster Chrysoberyl',  price: 820000000,  priceLabel: 'Rp 820 Juta',   area: 108, building: 54,  beds: 3, baths: 2, cluster: 'Cluster Chrysoberyl',  status: 'Ready Stock', badge: 'Baru',          floors: 1, carport: 2, desc: 'Unit terbaru di Cluster Chrysoberyl dengan ukuran lebih luas dan taman yang asri.',                                                                                                                         features: ['Taman luas', 'Dapur set built-in', 'Carport 2 mobil', 'Listrik 2200 watt', 'Air PDAM', 'CCTV kawasan'],                                                                     imgs: propertyImages[3].imgs },
  { id: 4,  type: 'Rumah',   name: 'Type 60/120 – Cluster Danburite',   price: 980000000,  priceLabel: 'Rp 980 Juta',   area: 120, building: 60,  beds: 3, baths: 3, cluster: 'Cluster Danburite',    status: 'Ready Stock', badge: 'Premium',       floors: 2, carport: 2, desc: 'Rumah 2 lantai premium di Cluster Danburite. Dilengkapi kamar mandi di setiap lantai, balkon dengan view asri, dan finishing premium.',                                                                features: ['Balkon lantai 2', 'Dapur set built-in', 'Carport 2 mobil', 'Listrik 3500 watt', 'Water heater', 'CCTV kawasan', 'Kolam renang komunal'],                                      imgs: propertyImages[4].imgs },
  { id: 5,  type: 'Rumah',   name: 'Type 70/140 – Cluster Danburite',   price: 1200000000, priceLabel: 'Rp 1,2 Miliar', area: 140, building: 70,  beds: 4, baths: 3, cluster: 'Cluster Danburite',    status: 'Inden',       badge: 'Eksklusif',    floors: 2, carport: 2, desc: 'Unit eksklusif Cluster Danburite dengan 4 kamar tidur dan lahan luas.',                                                                                                                                       features: ['4 kamar tidur', 'Dapur set premium', 'Carport 2 mobil', 'Rooftop garden', 'Listrik 4400 watt', 'Water heater solar', 'Kolam renang komunal'],                                imgs: propertyImages[5].imgs },
  { id: 6,  type: 'Rumah',   name: 'Type 90/150 – Cluster Amazonite',   price: 1500000000, priceLabel: 'Rp 1,5 Miliar', area: 150, building: 90,  beds: 4, baths: 3, cluster: 'Cluster Amazonite',    status: 'Ready Stock', badge: 'Luxury',        floors: 2, carport: 2, desc: 'Hunian luxury di Cluster Amazonite — kawasan paling prestisius di Permata Nusa Indah. Material premium, desain arsitektur kelas atas.',                                                                    features: ['Kitchen set + island', 'Carport 2 mobil + garasi', 'Jacuzzi', 'Smart home', 'Listrik 6600 watt', 'Solar water heater', 'CCTV 8 kamera'],                                     imgs: propertyImages[6].imgs },
  { id: 7,  type: 'Ruko',    name: 'Ruko 2 Lantai – Tipe Standar',     price: 1300000000, priceLabel: 'Rp 1,3 Miliar', area: 120, building: 80,  beds: 0, baths: 2, cluster: 'Ruko Komersial',       status: 'Ready Stock', badge: 'Strategis',    floors: 2, carport: 2, desc: 'Ruko 2 lantai di lokasi strategis kawasan komersial Permata Nusa Indah, Serang Baru.',                                                                                                                      features: ['Akses jalan 8 meter', 'Parkir di depan', 'Toilet per lantai', 'Listrik 5500 watt', 'Fasad kaca modern'],                                                                     imgs: propertyImages[7].imgs },
  { id: 8,  type: 'Ruko',    name: 'Ruko 3 Lantai – Premium Corner',   price: 2200000000, priceLabel: 'Rp 2,2 Miliar', area: 200, building: 150, beds: 0, baths: 4, cluster: 'Ruko Komersial',       status: 'Terbatas',    badge: 'Corner Lot',   floors: 3, carport: 4, desc: 'Ruko corner premium 3 lantai — posisi pojok dengan 2 sisi menghadap jalan di pusat komersial Serang Baru.',                                                                                            features: ['Posisi corner 2 sisi jalan', 'Parkir 4 mobil', 'Toilet per lantai', 'Listrik 7700 watt', 'Fasad full kaca', 'Plafon 4m'],                                                   imgs: propertyImages[8].imgs },
  { id: 9,  type: 'Kavling', name: 'Kavling Reguler 150 m²',           price: 600000000,  priceLabel: 'Rp 600 Juta',   area: 150, building: 0,   beds: 0, baths: 0, cluster: 'Zona Kavling',         status: 'Ready Stock', badge: 'SHM',           floors: 0, carport: 0, desc: 'Kavling kosong SHM siap bangun di zona kavling eksklusif Permata Nusa Indah, Serang Baru, Bekasi.',                                                                                                     features: ['SHM', 'Akses jalan 6 meter', 'Listrik PLN', 'Air PDAM', 'Bebas banjir', 'Lahan datar'],                                                                                     imgs: propertyImages[9].imgs },
  { id: 10, type: 'Kavling', name: 'Kavling Premium 180 m²',           price: 720000000,  priceLabel: 'Rp 720 Juta',   area: 180, building: 0,   beds: 0, baths: 0, cluster: 'Zona Kavling',         status: 'Ready Stock', badge: 'Investasi',     floors: 0, carport: 0, desc: 'Kavling premium luas untuk investasi jangka panjang. Nilai tanah naik rata-rata 18% per tahun.',                                                                                                          features: ['SHM', 'Akses jalan 8 meter', 'Listrik 3 phase', 'Air PDAM premium', 'View taman', 'Posisi premium'],                                                                        imgs: propertyImages[10].imgs },
  { id: 11, type: 'Rumah',   name: 'Type 120/200 – Cluster Amazonite', price: 2300000000, priceLabel: 'Rp 2,3 Miliar', area: 200, building: 120, beds: 5, baths: 4, cluster: 'Cluster Amazonite',    status: 'Inden',       badge: 'Super Luxury', floors: 2, carport: 3, desc: 'Super Luxury dengan 5 kamar tidur, kolam renang pribadi, dan smart home terintegrasi.',                                                                                                                       features: ['5 kamar tidur', 'Kolam renang pribadi', 'Smart home', 'Carport 3 mobil', 'Kitchen set Eropa', 'Home theater', 'Solar panel'],                                                imgs: propertyImages[11].imgs },
  { id: 12, type: 'Ruko',    name: 'Ruko 4 Lantai – Grand Corner',    price: 3500000000, priceLabel: 'Rp 3,5 Miliar', area: 280, building: 200, beds: 0, baths: 5, cluster: 'Ruko Komersial',       status: 'Terbatas',    badge: 'Flagship',     floors: 4, carport: 6, desc: 'Ruko flagship 4 lantai di posisi grand corner. Unit paling prestisius untuk bisnis skala besar.',                                                                                                           features: ['Grand corner 4 lantai', 'Lift internal', 'Parkir 6 mobil', 'Listrik 3 phase', 'Fasad curtain wall', 'Plafon tinggi'],                                                       imgs: propertyImages[12].imgs },
]

const statusColor: Record<string, string> = {
  'Ready Stock': '#10b981', 'Inden': '#f59e0b', 'Terbatas': '#ef4444',
}

export default function PropertiDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = allProperties.find(p => p.id === Number(id))

  const [activeImg, setActiveImg] = useState(0)
  const [liked, setLiked]         = useState(false)
  const [kprDP, setKprDP]         = useState(20)
  const [kprTenor, setKprTenor]   = useState(15)
  const [formData, setFormData]   = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!property) {
    return (
      <div className="dp-not-found">
        <div className="nf-icon">🏠</div>
        <h2>Properti tidak ditemukan</h2>
        <p>Properti yang Anda cari tidak tersedia.</p>
        <Link to="/properti" className="btn-back-list">Kembali ke Daftar Properti</Link>
      </div>
    )
  }

  const dpAmount    = (property.price * kprDP) / 100
  const loanAmount  = property.price - dpAmount
  const monthlyRate = 0.09 / 12
  const totalMonths = kprTenor * 12
  const monthly     = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0
  const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')

  const related = allProperties
    .filter(p => p.id !== property.id && (p.type === property.type || p.cluster === property.cluster))
    .slice(0, 3)

  return (
    <div className="dp-page">
      {/* Hero */}
      <div className="dp-hero">
        <img src={property.imgs[0]} alt={property.name} className="dp-hero-bg" />
        <div className="dp-hero-overlay" />
        <div className="dp-hero-content">
          <nav className="breadcrumb">
            <Link to="/">Beranda</Link><span>/</span>
            <Link to="/properti">Properti</Link><span>/</span>
            <span>{property.name}</span>
          </nav>
        </div>
      </div>

      <div className="dp-main">
        <button className="dp-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Kembali
        </button>

        <div className="dp-layout">
          {/* LEFT */}
          <div className="dp-left">
            {/* Gallery */}
            <div className="dp-gallery">
              <div className="dp-gallery-main">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={property.imgs[activeImg]}
                    alt={`Foto ${activeImg + 1}`}
                    className="dp-gallery-img"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                <div className="dp-gallery-overlay" />
                <div className="dp-gallery-badges">
                  <span style={{ background: statusColor[property.status] || '#6b7280', padding: '4px 10px', borderRadius: '2px', fontSize: '9px', fontWeight: 700, color: 'white', letterSpacing: '1px', textTransform: 'uppercase' }}>{property.status}</span>
                  <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '2px', fontSize: '9px', fontWeight: 600, color: 'white' }}>{property.badge}</span>
                </div>
                <div className="dp-gallery-actions">
                  <motion.button className={`dp-like-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
                  </motion.button>
                  <button className="dp-share-btn" aria-label="Bagikan"><Share2 size={14} /></button>
                </div>
                <button className="dp-gallery-nav dp-gallery-prev" onClick={() => setActiveImg((activeImg - 1 + property.imgs.length) % property.imgs.length)} aria-label="Foto sebelumnya"><ChevronLeft size={16} /></button>
                <button className="dp-gallery-nav dp-gallery-next" onClick={() => setActiveImg((activeImg + 1) % property.imgs.length)} aria-label="Foto berikutnya"><ChevronRight size={16} /></button>
                <div className="dp-gallery-counter">{activeImg + 1} / {property.imgs.length}</div>
              </div>
              <div className="dp-gallery-thumbs">
                {property.imgs.map((img, i) => (
                  <button key={i} className={`dp-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)} aria-label={`Foto ${i + 1}`}>
                    <img src={img} alt={`Thumb ${i + 1}`} />
                    <div className="dp-thumb-overlay" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="dp-info-card">
              <div className="dp-info-top">
                <div>
                  <div className="dp-cluster-tag"><MapPin size={12} />{property.cluster}</div>
                  <h1 className="dp-title">{property.name}</h1>
                </div>
                <div className="dp-rating-badge"><Star size={13} fill="currentColor" /><span>4.9</span></div>
              </div>
              <div className="dp-specs-row">
                {property.beds > 0     && <div className="dp-spec"><Bed size={18} /><span className="spec-v">{property.beds}</span><span className="spec-l">Kamar Tidur</span></div>}
                {property.baths > 0    && <div className="dp-spec"><Bath size={18} /><span className="spec-v">{property.baths}</span><span className="spec-l">Kamar Mandi</span></div>}
                <div className="dp-spec"><Maximize size={18} /><span className="spec-v">{property.area} m²</span><span className="spec-l">Luas Tanah</span></div>
                {property.building > 0 && <div className="dp-spec"><Home size={18} /><span className="spec-v">{property.building} m²</span><span className="spec-l">Luas Bangunan</span></div>}
                {property.floors > 0   && <div className="dp-spec"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/></svg><span className="spec-v">{property.floors}</span><span className="spec-l">Lantai</span></div>}
              </div>
              <p className="dp-desc">{property.desc}</p>
              <div className="dp-features">
                <h3>Fitur & Fasilitas</h3>
                <div className="dp-features-grid">
                  {property.features.map((f, i) => (
                    <div key={i} className="dp-feature-item"><CheckCircle size={13} /><span>{f}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* KPR mini */}
            <div className="dp-kpr-card">
              <div className="dp-kpr-header">
                <div className="dp-kpr-icon"><Calculator size={18} /></div>
                <div>
                  <h3>Simulasi KPR</h3>
                  <p>Estimasi cicilan bulanan (bunga 9% p.a.)</p>
                </div>
              </div>
              <div className="dp-kpr-controls">
                <div className="dp-kpr-field">
                  <div className="kpr-field-label"><span>Uang Muka (DP)</span><strong>{kprDP}% = {fmt(dpAmount)}</strong></div>
                  <input type="range" min={10} max={50} step={5} value={kprDP} onChange={e => setKprDP(Number(e.target.value))} className="dp-range" />
                  <div className="kpr-range-marks"><span>10%</span><span>30%</span><span>50%</span></div>
                </div>
                <div className="dp-kpr-field">
                  <div className="kpr-field-label"><span>Tenor</span><strong>{kprTenor} Tahun</strong></div>
                  <input type="range" min={5} max={25} step={5} value={kprTenor} onChange={e => setKprTenor(Number(e.target.value))} className="dp-range" />
                  <div className="kpr-range-marks"><span>5 th</span><span>15 th</span><span>25 th</span></div>
                </div>
              </div>
              <div className="dp-kpr-results">
                {[
                  { l: 'Harga Properti', v: property.priceLabel },
                  { l: `DP (${kprDP}%)`, v: fmt(dpAmount) },
                  { l: 'Pokok KPR', v: fmt(loanAmount) },
                ].map((r, i) => (
                  <div key={i} className="kpr-result-row"><span>{r.l}</span><span>{r.v}</span></div>
                ))}
                <div className="kpr-result-row highlight">
                  <span>Estimasi Cicilan/Bulan</span><strong>{fmt(monthly)}</strong>
                </div>
              </div>
              <p className="dp-kpr-note">* Simulasi bersifat estimasi. Hubungi kami untuk konsultasi KPR yang lebih akurat.</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="dp-right">
            {/* Price card */}
            <div className="dp-price-card">
              <div className="dpc-top-bar" />
              <span className="dpc-from">Mulai dari</span>
              <div className="dpc-price">{property.priceLabel}</div>
              <span className="dpc-status" style={{ background: statusColor[property.status] ? `${statusColor[property.status]}18` : 'rgba(247,244,239,0.06)', color: statusColor[property.status] || 'rgba(247,244,239,0.5)', border: `1px solid ${statusColor[property.status] ? `${statusColor[property.status]}40` : 'rgba(247,244,239,0.1)'}` }}>{property.status}</span>
              <div className="dpc-actions">
                <a href={`https://wa.me/6288293309726?text=${encodeURIComponent(`Halo, saya tertarik dengan ${property.name} di ${property.cluster}.`)}`} target="_blank" rel="noopener noreferrer" className="dpc-btn-wa">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Chat WhatsApp
                </a>
                <a href="tel:+6288293309726" className="dpc-btn-phone"><Phone size={14} /> 0882-9330-9726</a>
              </div>
              <div className="dpc-legal">
                <div className="dpc-legal-item"><Shield size={12} /><span>Sertifikat SHM</span></div>
                <div className="dpc-legal-item"><CheckCircle size={12} /><span>IMB Tersedia</span></div>
                <div className="dpc-legal-item"><Shield size={12} /><span>Legalitas Lengkap</span></div>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="dp-inquiry-card">
              <h3>Tanyakan Properti Ini</h3>
              {!submitted ? (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="dp-inquiry-form">
                  <div className="dp-inq-field">
                    <label>Nama Lengkap *</label>
                    <input type="text" placeholder="Nama Anda" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="dp-inq-field">
                    <label>Nomor WhatsApp *</label>
                    <input type="tel" placeholder="08xx-xxxx-xxxx" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <div className="dp-inq-field">
                    <label>Pesan (opsional)</label>
                    <textarea rows={3} placeholder={`Saya tertarik dengan ${property.name}...`} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="dp-inq-submit"><Send size={14} /> Kirim Permintaan</button>
                </form>
              ) : (
                <div className="dp-inq-success">
                  <CheckCircle size={36} />
                  <h4>Terima kasih, {formData.name}!</h4>
                  <p>Tim kami akan menghubungi Anda di <strong>{formData.phone}</strong> segera.</p>
                  <button onClick={() => setSubmitted(false)}>Kirim Lagi</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="dp-related">
            <h2>Properti Serupa</h2>
            <div className="dp-related-grid">
              {related.map(p => (
                <motion.div key={p.id} className="dp-related-card" whileHover={{ y: -4 }}>
                  <Link to={`/properti/${p.id}`} className="dp-related-link">
                    <div className="dp-related-img-wrap">
                      <img src={p.imgs[0]} alt={p.name} className="dp-related-img" loading="lazy" />
                      <div className="dp-related-overlay" />
                      <span className="dp-related-badge">{p.badge}</span>
                    </div>
                    <div className="dp-related-body">
                      <div className="dp-related-cluster"><MapPin size={10} />{p.cluster}</div>
                      <h4>{p.name}</h4>
                      <span className="dp-related-price">{p.priceLabel}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
