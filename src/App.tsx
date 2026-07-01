import { lazy, Suspense, Component, type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import './App.css'

// ---------------------------------------------------------------------------
// Lazy-loaded pages — setiap halaman di-download hanya saat dibutuhkan.
// Vite otomatis memecah masing-masing ke chunk JS tersendiri.
// ---------------------------------------------------------------------------
const HomePage           = lazy(() => import('./pages/HomePage'))
const PropertiPage       = lazy(() => import('./pages/PropertiPage'))
const PropertiDetailPage = lazy(() => import('./pages/PropertiDetailPage'))
const TentangPage        = lazy(() => import('./pages/TentangPage'))
const KontakPage         = lazy(() => import('./pages/KontakPage'))
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'))

// ---------------------------------------------------------------------------
// Fallback saat chunk sedang di-download (biasanya < 200 ms di koneksi bagus)
// Tampilan minimal — hanya background gelap agar tidak ada flash putih.
// ---------------------------------------------------------------------------
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Memuat halaman..."
    />
  )
}

// ---------------------------------------------------------------------------
// Error boundary — tangkap crash runtime agar tidak blank screen total
// ---------------------------------------------------------------------------
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#1a1a2e', color: '#d4a843', minHeight: '100vh' }}>
          <h2>⚠️ Runtime Error</h2>
          <pre style={{ color: '#ff6b6b', marginTop: 16, whiteSpace: 'pre-wrap' }}>
            {(this.state.error as Error).message}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            style={{ marginTop: 24, padding: '10px 24px', background: '#d4a843', color: '#1a1a2e', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// ---------------------------------------------------------------------------
// Animasi transisi antar halaman — sama persis seperti sebelumnya
// ---------------------------------------------------------------------------
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeOut' as const } },
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      {/* Suspense membungkus Routes agar lazy page bisa di-resolve */}
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/"             element={<HomePage />} />
              <Route path="/properti"     element={<PropertiPage />} />
              <Route path="/properti/:id" element={<PropertiDetailPage />} />
              <Route path="/tentang"      element={<TentangPage />} />
              <Route path="/kontak"       element={<KontakPage />} />
              <Route path="*"             element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  )
}

export default App
