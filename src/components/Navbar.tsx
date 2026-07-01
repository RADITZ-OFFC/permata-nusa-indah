import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Beranda',     path: '/' },
  { label: 'Properti',    path: '/properti' },
  { label: 'Tentang',     path: '/tentang' },
  { label: 'Kontak',      path: '/kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [atTop, setAtTop]           = useState(true)
  const location                    = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      setAtTop(y < 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggle = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${atTop ? 'nav--top' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="nav__inner">
          {/* Wordmark */}
          <Link to="/" className="nav__brand">
            <span className="nav__brand-main">Permata Nusa Indah</span>
            <span className="nav__brand-sub">Serang Baru · Bekasi</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav__links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav__link ${isActive(link.path) ? 'nav__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav__actions">
            <Link to="/kontak" className="nav__cta">
              Konsultasi
            </Link>
            <motion.button
              className="nav__hamburger"
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                  : <motion.span key="m" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggle}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 36 }}
          >
            <div className="drawer__top">
              <span className="drawer__brand">Permata Nusa Indah</span>
              <button className="drawer__close" onClick={toggle} aria-label="Tutup menu">
                <X size={18} />
              </button>
            </div>

            <nav className="drawer__nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`drawer__link ${isActive(link.path) ? 'drawer__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="drawer__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
            >
              <a href="tel:+6288293309726" className="drawer__phone">
                0882-9330-9726
              </a>
              <Link to="/kontak" className="drawer__cta">
                Konsultasi Gratis
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
