import { useEffect, useState } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'var(--gold)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
      }}
    />
  )
}
