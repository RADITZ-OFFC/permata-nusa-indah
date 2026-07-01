import './StatsSection.css'

const items = [
  '1.800+ Unit Terjual',
  '8.500+ Keluarga Bahagia',
  'Best Developer Jawa Barat 2023 & 2024',
  'ROI 18% Per Tahun',
  'SHM Langsung atas Nama',
  'DP 5% · 15+ Bank Rekanan',
  '9 Tahun Pengalaman',
  'After-Sales 7×24',
]

export default function StatsSection() {
  // Duplicate for seamless marquee loop
  const doubled = [...items, ...items]

  return (
    <div className="stats-section" aria-hidden="true">
      <div className="stats-ticker">
        <div className="stats-ticker-inner">
          {doubled.map((item, i) => (
            <span key={i}>
              <span className="stats-ticker-item">{item}</span>
              <span className="stats-ticker-sep">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
