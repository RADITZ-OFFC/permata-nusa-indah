import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target browser modern — output lebih kecil, tidak perlu polyfill lama
    target: 'es2020',

    // Naikkan warning threshold supaya tidak noise; chunk splitting di bawah
    // sudah memecah bundle dengan benar
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * manualChunks: pisahkan vendor besar ke chunk terpisah.
         * Browser bisa cache chunk vendor secara independen — saat kode
         * aplikasi berubah, user tidak perlu re-download framer-motion/swiper.
         */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion'))           return 'vendor-framer'
            if (id.includes('swiper'))                  return 'vendor-swiper'
            if (id.includes('react-router-dom') || id.includes('react-router'))
                                                        return 'vendor-router'
            if (id.includes('react-dom') || id.includes('react/'))
                                                        return 'vendor-react'
            if (
              id.includes('lucide-react') ||
              id.includes('react-countup') ||
              id.includes('react-intersection-observer')
            )                                           return 'vendor-ui'
          }
        },
      },
    },
  },
})
