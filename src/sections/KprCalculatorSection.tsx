import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Percent, CalendarDays, TrendingDown, Info, ChevronDown, Lock, TrendingUp } from 'lucide-react'
import './KprCalculatorSection.css'

const BANK_PRESETS = [
  { name: 'BTN',    fixedRate: 5.5,  floatingRate: 10.5 },
  { name: 'BRI',    fixedRate: 6.5,  floatingRate: 11.0 },
  { name: 'Mandiri',fixedRate: 6.75, floatingRate: 11.5 },
  { name: 'BCA',    fixedRate: 7.0,  floatingRate: 12.0 },
]

const TENOR_OPTIONS = [5, 10, 15, 20, 25, 30]
const FIXED_PERIOD_OPTIONS = [1, 2, 3, 5]

function formatRupiah(value: number) {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(2)} M`
  if (value >= 1_000_000)     return `Rp ${(value / 1_000_000).toFixed(1)} Jt`
  return `Rp ${value.toLocaleString('id-ID')}`
}

function formatRupiahFull(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`
}

/** Hitung cicilan anuitas standar */
function hitungAnuitas(pokok: number, bungaTahunan: number, tenorBulan: number): number {
  const r = bungaTahunan / 100 / 12
  if (r === 0) return pokok / tenorBulan
  return (pokok * r * Math.pow(1 + r, tenorBulan)) / (Math.pow(1 + r, tenorBulan) - 1)
}

/**
 * Hitung sisa pokok setelah n bulan dengan cicilan anuitas tetap.
 * Dipakai untuk switching dari fixed ke floating.
 */
function sisaPokokSetelahNBulan(pokok: number, bungaTahunan: number, tenorBulan: number, nBulan: number): number {
  const r = bungaTahunan / 100 / 12
  if (r === 0) return pokok - (pokok / tenorBulan) * nBulan
  const cicilan = hitungAnuitas(pokok, bungaTahunan, tenorBulan)
  return pokok * Math.pow(1 + r, nBulan) - cicilan * ((Math.pow(1 + r, nBulan) - 1) / r)
}

export default function KprCalculatorSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0, initialInView: true })

  // --- Shared inputs ---
  const [hargaRumah,  setHargaRumah]  = useState(800_000_000)
  const [dpPersen,    setDpPersen]    = useState(20)
  const [tenor,       setTenor]       = useState(20)
  const [activeTab,   setActiveTab]   = useState<'fixed' | 'floating'>('fixed')
  const [showInfo,    setShowInfo]    = useState(false)
  const [selectedBank, setSelectedBank] = useState(1) // BRI

  // --- Fixed tab ---
  const [bungaFixed, setBungaFixed] = useState(BANK_PRESETS[1].fixedRate)

  // --- Floating tab ---
  const [fixedPeriod,   setFixedPeriod]   = useState(3)           // tahun fixed
  const [bungaFixedPeriod, setBungaFixedPeriod] = useState(BANK_PRESETS[1].fixedRate)
  const [bungaFloating, setBungaFloating] = useState(BANK_PRESETS[1].floatingRate)

  // --- Derived ---
  const dp             = useMemo(() => (hargaRumah * dpPersen) / 100, [hargaRumah, dpPersen])
  const pokokPinjaman  = useMemo(() => hargaRumah - dp,               [hargaRumah, dp])
  const tenorBulan     = tenor * 12

  // Fixed calc
  const cicilanFixed   = useMemo(() => hitungAnuitas(pokokPinjaman, bungaFixed, tenorBulan), [pokokPinjaman, bungaFixed, tenorBulan])
  const totalBayarFixed = useMemo(() => cicilanFixed * tenorBulan,   [cicilanFixed, tenorBulan])
  const totalBungaFixed = useMemo(() => totalBayarFixed - pokokPinjaman, [totalBayarFixed, pokokPinjaman])

  // Floating calc
  const fixedPeriodBulan  = fixedPeriod * 12
  const floatingPeriodBulan = tenorBulan - fixedPeriodBulan

  const cicilanFixedPeriod = useMemo(
    () => hitungAnuitas(pokokPinjaman, bungaFixedPeriod, tenorBulan),
    [pokokPinjaman, bungaFixedPeriod, tenorBulan]
  )

  const sisaPokokSaatFloating = useMemo(
    () => sisaPokokSetelahNBulan(pokokPinjaman, bungaFixedPeriod, tenorBulan, fixedPeriodBulan),
    [pokokPinjaman, bungaFixedPeriod, tenorBulan, fixedPeriodBulan]
  )

  const cicilanFloatingPeriod = useMemo(
    () => floatingPeriodBulan > 0
      ? hitungAnuitas(sisaPokokSaatFloating, bungaFloating, floatingPeriodBulan)
      : 0,
    [sisaPokokSaatFloating, bungaFloating, floatingPeriodBulan]
  )

  const totalBayarFloating = useMemo(
    () => cicilanFixedPeriod * fixedPeriodBulan + cicilanFloatingPeriod * floatingPeriodBulan,
    [cicilanFixedPeriod, fixedPeriodBulan, cicilanFloatingPeriod, floatingPeriodBulan]
  )
  const totalBungaFloating = useMemo(() => totalBayarFloating - pokokPinjaman, [totalBayarFloating, pokokPinjaman])

  const kenaikanCicilan = useMemo(
    () => cicilanFloatingPeriod - cicilanFixedPeriod,
    [cicilanFloatingPeriod, cicilanFixedPeriod]
  )

  // Bar persen
  const pokokPersen = activeTab === 'fixed'
    ? (pokokPinjaman / totalBayarFixed)   * 100
    : (pokokPinjaman / totalBayarFloating) * 100
  const bungaPersen  = 100 - pokokPersen

  const selectBank = (i: number) => {
    setSelectedBank(i)
    setBungaFixed(BANK_PRESETS[i].fixedRate)
    setBungaFixedPeriod(BANK_PRESETS[i].fixedRate)
    setBungaFloating(BANK_PRESETS[i].floatingRate)
  }

  return (
    <section className="kpr-section" ref={ref}>
      <div className="kpr-container">
        {/* Header */}
        <motion.div
          className="kpr-header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Simulasi KPR</div>
          <h2 className="kpr-title">
            Hitung Cicilan <em>Impian Anda</em>
          </h2>
          <p className="kpr-subtitle">
            Pilih mode simulasi sesuai skema KPR yang Anda inginkan.
          </p>

          {/* Mode tabs */}
          <div className="kpr-mode-tabs">
            <button
              className={`kpr-mode-tab ${activeTab === 'fixed' ? 'active' : ''}`}
              onClick={() => setActiveTab('fixed')}
            >
              <Lock size={14} />
              Bunga Fixed
            </button>
            <button
              className={`kpr-mode-tab ${activeTab === 'floating' ? 'active' : ''}`}
              onClick={() => setActiveTab('floating')}
            >
              <TrendingUp size={14} />
              Fixed + Floating
            </button>
          </div>
        </motion.div>

        <div className="kpr-body">
          {/* ── LEFT: Inputs ── */}
          <motion.div
            className="kpr-inputs"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Harga Rumah */}
            <div className="kpr-field">
              <div className="kpr-field-label">
                <Home size={15} />
                <span>Harga Properti</span>
                <span className="kpr-field-value">{formatRupiah(hargaRumah)}</span>
              </div>
              <input
                type="range" className="kpr-slider"
                min={200_000_000} max={5_000_000_000} step={50_000_000}
                value={hargaRumah}
                onChange={(e) => setHargaRumah(Number(e.target.value))}
                style={{ '--fill': `${((hargaRumah - 200_000_000) / (5_000_000_000 - 200_000_000)) * 100}%` } as React.CSSProperties}
              />
              <div className="kpr-range-labels"><span>Rp 200 Jt</span><span>Rp 5 M</span></div>
            </div>

            {/* DP */}
            <div className="kpr-field">
              <div className="kpr-field-label">
                <TrendingDown size={15} />
                <span>Uang Muka (DP)</span>
                <span className="kpr-field-value">{dpPersen}% · {formatRupiah(dp)}</span>
              </div>
              <input
                type="range" className="kpr-slider"
                min={10} max={80} step={5}
                value={dpPersen}
                onChange={(e) => setDpPersen(Number(e.target.value))}
                style={{ '--fill': `${((dpPersen - 10) / (80 - 10)) * 100}%` } as React.CSSProperties}
              />
              <div className="kpr-range-labels"><span>10%</span><span>80%</span></div>
              <div className="dp-chips">
                {[10, 20, 30, 40].map(p => (
                  <button key={p} className={`dp-chip ${dpPersen === p ? 'active' : ''}`} onClick={() => setDpPersen(p)}>{p}%</button>
                ))}
              </div>
            </div>

            {/* Tenor */}
            <div className="kpr-field">
              <div className="kpr-field-label">
                <CalendarDays size={15} />
                <span>Tenor</span>
                <span className="kpr-field-value">{tenor} Tahun</span>
              </div>
              <div className="tenor-chips">
                {TENOR_OPTIONS.map(t => (
                  <button key={t} className={`tenor-chip ${tenor === t ? 'active' : ''}`} onClick={() => setTenor(t)}>{t}Th</button>
                ))}
              </div>
            </div>

            {/* Bank preset */}
            <div className="kpr-field">
              <div className="kpr-field-label">
                <Percent size={15} />
                <span>Bank / Suku Bunga</span>
              </div>
              <div className="bank-chips">
                {BANK_PRESETS.map((bank, i) => (
                  <button
                    key={bank.name}
                    className={`bank-chip ${selectedBank === i ? 'active' : ''}`}
                    onClick={() => selectBank(i)}
                  >
                    <span className="bank-name">{bank.name}</span>
                    <span className="bank-rate">{bank.fixedRate}% / {bank.floatingRate}%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode-specific bunga inputs */}
            <AnimatePresence mode="wait">
              {activeTab === 'fixed' ? (
                <motion.div
                  key="fixed-inputs"
                  className="kpr-field"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="kpr-field-label">
                    <Lock size={15} />
                    <span>Bunga Fixed</span>
                    <span className="kpr-field-value">{bungaFixed.toFixed(2)}% / tahun</span>
                  </div>
                  <div className="custom-rate-wrap">
                    <span className="custom-rate-label">Atur manual:</span>
                    <div className="custom-rate-input-wrap">
                      <input
                        type="number" className="custom-rate-input"
                        min={1} max={20} step={0.25}
                        value={bungaFixed}
                        onChange={(e) => { setSelectedBank(-1); setBungaFixed(Number(e.target.value)) }}
                      />
                      <span className="custom-rate-unit">%</span>
                      <ChevronDown size={14} className="custom-rate-chevron" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="floating-inputs"
                  className="kpr-field"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="kpr-field-label">
                    <TrendingUp size={15} />
                    <span>Periode & Suku Bunga</span>
                  </div>

                  {/* Periode fixed */}
                  <div className="floating-group">
                    <div className="floating-group-label">
                      <Lock size={12} />
                      <span>Periode Fixed</span>
                    </div>
                    <div className="tenor-chips">
                      {FIXED_PERIOD_OPTIONS.map(p => (
                        <button key={p} className={`tenor-chip ${fixedPeriod === p ? 'active' : ''}`} onClick={() => setFixedPeriod(p)}>{p}Th</button>
                      ))}
                    </div>
                    <div className="custom-rate-wrap" style={{ marginTop: 10 }}>
                      <span className="custom-rate-label">Bunga fixed:</span>
                      <div className="custom-rate-input-wrap">
                        <input
                          type="number" className="custom-rate-input"
                          min={1} max={20} step={0.25}
                          value={bungaFixedPeriod}
                          onChange={(e) => { setSelectedBank(-1); setBungaFixedPeriod(Number(e.target.value)) }}
                        />
                        <span className="custom-rate-unit">%</span>
                        <ChevronDown size={14} className="custom-rate-chevron" />
                      </div>
                    </div>
                  </div>

                  {/* Bunga floating */}
                  <div className="floating-group" style={{ marginTop: 14 }}>
                    <div className="floating-group-label">
                      <TrendingUp size={12} />
                      <span>Bunga Floating (setelah periode fixed)</span>
                    </div>
                    <div className="custom-rate-wrap" style={{ marginTop: 8 }}>
                      <span className="custom-rate-label">Estimasi bunga:</span>
                      <div className="custom-rate-input-wrap">
                        <input
                          type="number" className="custom-rate-input"
                          min={1} max={25} step={0.25}
                          value={bungaFloating}
                          onChange={(e) => { setSelectedBank(-1); setBungaFloating(Number(e.target.value)) }}
                        />
                        <span className="custom-rate-unit">%</span>
                        <ChevronDown size={14} className="custom-rate-chevron" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Result ── */}
          <motion.div
            className="kpr-result"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <div className="kpr-result-card">
              <div className="kpr-result-top-bar" />

              <AnimatePresence mode="wait">
                {activeTab === 'fixed' ? (
                  <motion.div key="result-fixed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {/* Fixed result header */}
                    <div className="kpr-result-header">
                      <span className="kpr-result-label">Cicilan Tetap / Bulan</span>
                      <motion.div className="kpr-cicilan" key={cicilanFixed} initial={{ scale: 0.92, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                        {formatRupiahFull(Math.round(cicilanFixed))}
                      </motion.div>
                      <span className="kpr-result-sub">selama {tenor} tahun ({tenorBulan} bulan) · bunga {bungaFixed}%</span>
                    </div>

                    <div className="kpr-breakdown">
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: 'var(--primary)' }} />
                        <span className="breakdown-label">Harga Properti</span>
                        <span className="breakdown-val">{formatRupiahFull(hargaRumah)}</span>
                      </div>
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: '#10b981' }} />
                        <span className="breakdown-label">Uang Muka ({dpPersen}%)</span>
                        <span className="breakdown-val green">{formatRupiahFull(Math.round(dp))}</span>
                      </div>
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: 'var(--accent)' }} />
                        <span className="breakdown-label">Pokok Pinjaman</span>
                        <span className="breakdown-val">{formatRupiahFull(Math.round(pokokPinjaman))}</span>
                      </div>
                      <div className="kpr-breakdown-divider" />
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: '#ef4444' }} />
                        <span className="breakdown-label">Total Bunga ({tenor}th)</span>
                        <span className="breakdown-val red">{formatRupiahFull(Math.round(totalBungaFixed))}</span>
                      </div>
                      <div className="kpr-breakdown-item kpr-breakdown-total">
                        <span className="breakdown-dot" style={{ background: 'var(--primary)' }} />
                        <span className="breakdown-label">Total Pembayaran</span>
                        <span className="breakdown-val bold">{formatRupiahFull(Math.round(totalBayarFixed))}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="result-floating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {/* Floating: dua periode cicilan */}
                    <div className="kpr-result-header">
                      <span className="kpr-result-label">Simulasi Fixed + Floating</span>
                    </div>

                    <div className="cicilan-compare">
                      <div className="cicilan-compare-item cicilan-compare-fixed">
                        <div className="cicilan-compare-badge"><Lock size={11} />Fixed {fixedPeriod}th</div>
                        <div className="cicilan-compare-amount">{formatRupiahFull(Math.round(cicilanFixedPeriod))}</div>
                        <div className="cicilan-compare-sub">/ bulan · {bungaFixedPeriod}%</div>
                      </div>
                      <div className="cicilan-compare-arrow">→</div>
                      <div className="cicilan-compare-item cicilan-compare-floating">
                        <div className="cicilan-compare-badge cicilan-compare-badge-float"><TrendingUp size={11} />Floating</div>
                        <div className="cicilan-compare-amount">{formatRupiahFull(Math.round(cicilanFloatingPeriod))}</div>
                        <div className="cicilan-compare-sub">/ bulan · {bungaFloating}%</div>
                      </div>
                    </div>

                    {/* Kenaikan cicilan */}
                    {kenaikanCicilan > 0 && (
                      <div className="kpr-naik-alert">
                        <TrendingUp size={14} />
                        <span>Cicilan naik <strong>{formatRupiahFull(Math.round(kenaikanCicilan))}</strong> / bulan saat masuk periode floating</span>
                      </div>
                    )}

                    <div className="kpr-breakdown" style={{ marginTop: 16 }}>
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: 'var(--accent)' }} />
                        <span className="breakdown-label">Pokok Pinjaman</span>
                        <span className="breakdown-val">{formatRupiahFull(Math.round(pokokPinjaman))}</span>
                      </div>
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: 'var(--primary)' }} />
                        <span className="breakdown-label">Sisa pokok saat floating</span>
                        <span className="breakdown-val">{formatRupiahFull(Math.round(sisaPokokSaatFloating))}</span>
                      </div>
                      <div className="kpr-breakdown-divider" />
                      <div className="kpr-breakdown-item">
                        <span className="breakdown-dot" style={{ background: '#ef4444' }} />
                        <span className="breakdown-label">Est. Total Bunga</span>
                        <span className="breakdown-val red">{formatRupiahFull(Math.round(totalBungaFloating))}</span>
                      </div>
                      <div className="kpr-breakdown-item kpr-breakdown-total">
                        <span className="breakdown-dot" style={{ background: 'var(--primary)' }} />
                        <span className="breakdown-label">Est. Total Pembayaran</span>
                        <span className="breakdown-val bold">{formatRupiahFull(Math.round(totalBayarFloating))}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bar chart — selalu tampil */}
              <div className="kpr-bar-wrap" style={{ marginTop: 16 }}>
                <div className="kpr-bar">
                  <div className="kpr-bar-pokok" style={{ width: `${pokokPersen}%` }} />
                  <div className="kpr-bar-bunga"  style={{ width: `${bungaPersen}%` }} />
                </div>
                <div className="kpr-bar-legend">
                  <span><i style={{ background: 'var(--accent)' }} />Pokok {pokokPersen.toFixed(0)}%</span>
                  <span><i style={{ background: '#ef4444' }} />Bunga {bungaPersen.toFixed(0)}%</span>
                </div>
              </div>

              {/* Info toggle */}
              <button className="kpr-info-toggle" onClick={() => setShowInfo(!showInfo)}>
                <Info size={13} />
                {showInfo ? 'Sembunyikan' : 'Lihat'} catatan perhitungan
              </button>

              {showInfo && (
                <motion.div className="kpr-info-box" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <p>
                    Simulasi menggunakan metode <strong>anuitas</strong> (cicilan pokok+bunga tiap bulan).
                    Mode <em>Fixed+Floating</em>: cicilan dihitung ulang dari sisa pokok saat periode floating dimulai.
                    Bunga floating bersifat estimasi — nilai aktual mengikuti BI Rate + spread bank.
                    Biaya provisi, notaris, dan asuransi belum termasuk.
                  </p>
                </motion.div>
              )}

              {/* CTA */}
              <a
                href="https://wa.me/6288293309726?text=Halo%2C%20saya%20ingin%20konsultasi%20KPR%20untuk%20properti%20di%20Permata%20Nusa%20Indah"
                target="_blank" rel="noopener noreferrer"
                className="kpr-cta-btn"
              >
                <span>Konsultasi KPR Gratis</span>
              </a>
              <p className="kpr-cta-note">Tim kami siap bantu proses pengajuan KPR Anda</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
