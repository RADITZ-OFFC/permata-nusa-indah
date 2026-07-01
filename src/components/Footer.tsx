import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

const navLinks  = [
  { label: 'Beranda',       to: '/' },
  { label: 'Semua Properti', to: '/properti' },
  { label: 'Tentang Kami',  to: '/tentang' },
  { label: 'Kontak',        to: '/kontak' },
]
const clusters  = [
  'Cluster Chrysoberyl', 'Cluster Danburite',
  'Cluster Amazonite', 'Ruko Komersial', 'Kavling Premium',
]
const banks     = ['BNI', 'BRI', 'Mandiri', 'BCA', 'BTN', 'CIMB Niaga', 'Permata', 'OCBC NISP']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />

      <div className="footer-body">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-wordmark">
            <span className="footer-wordmark-main">Permata Nusa Indah</span>
            <span className="footer-wordmark-sub">Serang Baru · Bekasi</span>
          </Link>

          <p className="footer-tagline">
            Membangun hunian impian dengan kualitas premium untuk keluarga Indonesia.
            Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru, Kabupaten Bekasi.
          </p>

          <div className="footer-socials">
            {/* Instagram — satu-satunya social yang aktif */}
            <a href="https://www.instagram.com/raditz_offc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram Permata Nusa Indah" className="footer-social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            {/* WhatsApp shortcut */}
            <a href="https://wa.me/6288293309726" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Permata Nusa Indah" className="footer-social">
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>

          <div className="footer-award">
            <div className="footer-award-icon">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                <path d="M12 15C8.686 15 6 12.314 6 9V3h12v6c0 3.314-2.686 6-6 6z" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6 5H3.5a1.5 1.5 0 0 0 0 3H6M18 5h2.5a1.5 1.5 0 0 1 0 3H18" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 15v4M8 19h8" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <strong>Best Developer 2024</strong>
              <span>Jawa Barat – REI Award</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigasi</h4>
          <ul className="footer-links">
            {navLinks.map(l => (
              <li key={l.to}><Link to={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Clusters */}
        <div className="footer-col">
          <h4 className="footer-col-title">Tipe Hunian</h4>
          <ul className="footer-links">
            {clusters.map(c => (
              <li key={c}><Link to="/properti" className="footer-link">{c}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Hubungi Kami</h4>
          <div className="footer-contacts">
            <a href="tel:+6288293309726" className="footer-contact">
              <Phone size={13} /><span>0882-9330-9726</span>
            </a>
            <a href="mailto:support@raditzoffc.my.id" className="footer-contact">
              <Mail size={13} /><span>support@raditzoffc.my.id</span>
            </a>
            <div className="footer-contact">
              <MapPin size={13} />
              <span>Jl. Kp.Cigelam, Jayamulya, Kec. Serang Baru, Kabupaten Bekasi 17330</span>
            </div>
          </div>
          <div className="footer-hours">
            <strong>Jam Operasional</strong>
            Senin – Sabtu: 08.00 – 17.00 WIB<br />
            Minggu: 09.00 – 15.00 WIB
          </div>
        </div>
      </div>

      {/* Banks */}
      <div style={{ borderTop: '1px solid rgba(247,244,239,0.06)' }}>
        <div className="footer-banks">
          <span className="footer-banks-label">Bank Rekanan</span>
          <div className="footer-banks-grid">
            {banks.map(b => <span key={b} className="footer-bank-badge">{b}</span>)}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(247,244,239,0.06)' }}>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Permata Nusa Indah. Semua hak dilindungi.</p>
          <div className="footer-legal">
            <a href="#" onClick={e => e.preventDefault()}>Kebijakan Privasi</a>
            <span>·</span>
            <a href="#" onClick={e => e.preventDefault()}>Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
