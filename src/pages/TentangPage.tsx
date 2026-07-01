import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Target, Heart, CheckCircle, ArrowRight } from 'lucide-react'
import './TentangPage.css'

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame: number
    let start: number | null = null
    const dur = 2000
    const run = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) frame = requestAnimationFrame(run)
      else setCount(target)
    }
    frame = requestAnimationFrame(run)
    return () => cancelAnimationFrame(frame)
  }, [active, target])
  return <span>{count.toLocaleString('id-ID')}{suffix}</span>
}

const timeline = [
  { year: '2015', title: 'Pendirian',          desc: 'Permata Nusa Indah didirikan dengan visi membangun hunian berkualitas premium di Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru, Kabupaten Bekasi.' },
  { year: '2017', title: 'Cluster Chrysoberyl', desc: 'Meluncurkan Cluster Chrysoberyl dengan 250 unit dan habis terjual dalam 4 bulan — rekor perdana di Serang Baru.' },
  { year: '2019', title: 'Ekspansi',            desc: 'Membuka Cluster Danburite dan area komersial seluas 8 hektar, memperluas kawasan hunian premium.' },
  { year: '2021', title: 'Penghargaan',         desc: 'Meraih penghargaan Best Developer Kabupaten Bekasi dari REI (Real Estate Indonesia).' },
  { year: '2023', title: 'Cluster Amazonite',   desc: 'Meluncurkan Cluster Amazonite, produk luxury pertama dengan fasilitas kolam renang dan smart home.' },
  { year: '2024', title: 'Milestone 1.800+',    desc: '1.800+ unit terjual. Developer perumahan terpercaya #1 di Serang Baru, Bekasi.' },
]

const team = [
  { name: 'Ir. Ahmad Fauzi',    role: 'Direktur Utama',     img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face', color: '#2d6a4f', initials: 'AF' },
  { name: 'Dra. Siti Rahayu',   role: 'Direktur Pemasaran', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop&crop=face', color: '#ec4899', initials: 'SR' },
  { name: 'Ir. Budi Pranoto',   role: 'Direktur Teknik',    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face', color: '#3b82f6', initials: 'BP' },
  { name: 'Rd. Hendra Wijaya',  role: 'Direktur Keuangan',  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face', color: '#f59e0b', initials: 'HW' },
]

const partners = ['BNI', 'BRI', 'Mandiri', 'BCA', 'BTN', 'CIMB Niaga', 'Permata', 'OCBC NISP']

export default function TentangPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="tp-page">
      {/* Hero */}
      <div className="tp-hero">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=75&fit=crop" alt="Tentang Kami" className="tp-hero-bg" />
        <div className="tp-hero-overlay" />
        <div className="tp-hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="breadcrumb">
              <Link to="/">Beranda</Link><span>/</span><span>Tentang Kami</span>
            </nav>
            <h1>9 Tahun Membangun<br />Kepercayaan</h1>
            <p>Developer perumahan premium terpercaya di Serang Baru, Kabupaten Bekasi</p>
          </motion.div>
        </div>
      </div>

      {/* Vision / Mission / Values */}
      <section className="tp-visi-section">
        <div className="tp-container">
          <motion.div
            className="tp-visi-grid"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: Target, color: '#3b82f6', title: 'Visi',  content: 'Menjadi developer perumahan terbaik dan terpercaya di Indonesia yang menghadirkan hunian berkualitas tinggi untuk setiap keluarga Indonesia.' },
              { icon: Heart,  color: '#ec4899', title: 'Misi',  list: ['Membangun properti standar kualitas tertinggi', 'Layanan pelanggan tulus & profesional', 'Kawasan hunian nyaman & harmonis', 'Ketepatan waktu serah terima 100%'] },
              { icon: Award,  color: '#f59e0b', title: 'Nilai', content: 'Integritas, Kualitas, Inovasi, dan Kepuasan Pelanggan adalah empat pilar yang mendasari setiap langkah kami.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                className="tp-visi-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="tp-visi-icon" style={{ background: `${v.color}18`, color: v.color }}>
                  <v.icon size={24} />
                </div>
                <h3>{v.title}</h3>
                {v.content && <p>{v.content}</p>}
                {v.list && (
                  <ul>
                    {v.list.map((item, j) => (
                      <li key={j}><CheckCircle size={13} /><span>{item}</span></li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="tp-stats-section" ref={ref}>
        <div className="tp-container">
          <div className="tp-stats-grid">
            {[
              { label: 'Unit Terjual',     val: 1800, suffix: '+' },
              { label: 'Keluarga Bahagia', val: 8500, suffix: '+' },
              { label: 'Tahun Pengalaman', val: 9,    suffix: ''  },
              { label: 'Penghargaan',      val: 8,    suffix: '+'  },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="tp-stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <span className="tp-stat-val">
                  <Counter target={s.val} suffix={s.suffix} active={inView} />
                </span>
                <span className="tp-stat-lbl">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="tp-timeline-section">
        <div className="tp-container">
          <div className="tp-section-header">
            <div className="section-label">Perjalanan Kami</div>
            <h2>Jejak Langkah 9 Tahun</h2>
          </div>
          <div className="tp-timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`tp-tl-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="tp-tl-card">
                  <span className="tp-tl-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="tp-tl-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="tp-team-section">
        <div className="tp-container">
          <div className="tp-section-header">
            <div className="section-label">Tim Kami</div>
            <h2>Pimpinan Perusahaan</h2>
            <p>Tim eksekutif berpengalaman yang berkomitmen memberikan yang terbaik untuk setiap penghuni.</p>
          </div>
          <div className="tp-team-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="tp-team-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="tp-team-img-wrap">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="tp-team-img"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <div className="tp-team-fallback" style={{ background: member.color }}>
                    {member.initials}
                  </div>
                  <div className="tp-team-overlay" />
                </div>
                <div className="tp-team-info">
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="tp-partners-section">
        <div className="tp-container">
          <div className="tp-section-header">
            <div className="section-label">Rekanan</div>
            <h2>Bank Rekanan KPR</h2>
            <p>Bekerja sama dengan bank-bank terkemuka untuk kemudahan KPR Anda.</p>
          </div>
          <div className="tp-partners-grid">
            {partners.map(p => (
              <div key={p} className="tp-partner-badge">{p}</div>
            ))}
          </div>
          <div className="tp-cta-row">
            <Link to="/kontak" className="tp-btn-cta">
              Konsultasi Sekarang <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
