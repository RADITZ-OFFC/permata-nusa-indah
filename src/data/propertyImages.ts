/**
 * ============================================================
 *  PROPERTYIMAGES.TS – Pusat Pengelolaan Foto Properti
 *  Permata Nusa Indah Jayamulya
 * ============================================================
 *
 *  CARA MENGGANTI FOTO:
 *  1. Taruh foto baru di: src/assets/properties/
 *     (format JPG/PNG, lebar min. 800px)
 *
 *  2. Import foto di bagian atas file ini, contoh:
 *     import foto1_1 from '../assets/properties/1_1.jpg'
 *
 *  3. Ganti nilai pada array imgs[] di properti yang sesuai,
 *     dari URL lama ke variabel import yang baru.
 *
 *  4. Simpan file – foto langsung terupdate di seluruh halaman.
 *
 *  KONVENSI NAMA FILE:
 *  <id>_<nomorFoto>.jpg  →  contoh: 1_1.jpg, 1_2.jpg, 2_1.jpg
 *  imgs[0] = foto utama (ditampilkan di card & hero)
 *
 *  UKURAN URL UNSPLASH:
 *  - thumb (card listing) : w=640  — cukup untuk card kecil
 *  - imgs  (galeri detail) : w=900  — cukup untuk lightbox/modal
 * ============================================================
 */

// ---------------------------------------------------------------------------
// Import foto lokal (dari src/assets/properties/)
// Tambahkan import baru di sini saat ada foto baru yang ditaruh di folder.
// ---------------------------------------------------------------------------
import photoType4590   from '../assets/properties/Type 45-90 Cluster Chrysoberyl.jpeg'
import photoRuko3      from '../assets/properties/Ruko 3 Lantai - Komersial.jpeg'
import photoKavling180 from '../assets/properties/Kavling Premium 180m2.jpeg'

export interface PropertyImages {
  /** Foto utama – tampil di card listing & hero detail */
  thumb: string
  /** Semua foto – tampil di galeri halaman detail (index 0 = utama) */
  imgs: string[]
}

/**
 * Map foto berdasarkan ID properti.
 * Key = ID properti (number), Value = { thumb, imgs }
 */
const propertyImages: Record<number, PropertyImages> = {
  // ------------------------------------------------------------------
  // ID 1 · Type 36/72 – Cluster Chrysoberyl
  // ------------------------------------------------------------------
  1: {
    thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 2 · Type 45/90 – Cluster Chrysoberyl
  // ------------------------------------------------------------------
  2: {
    thumb: photoType4590,
    imgs: [
      photoType4590,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 3 · Type 54/108 – Cluster Chrysoberyl
  // ------------------------------------------------------------------
  3: {
    thumb: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 4 · Type 60/120 – Cluster Danburite
  // ------------------------------------------------------------------
  4: {
    thumb: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 5 · Type 70/140 – Cluster Danburite
  // ------------------------------------------------------------------
  5: {
    thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 6 · Type 90/150 – Cluster Amazonite
  // ------------------------------------------------------------------
  6: {
    thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 7 · Ruko 2 Lantai – Tipe Standar
  // ------------------------------------------------------------------
  7: {
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 8 · Ruko 3 Lantai – Premium Corner
  // ------------------------------------------------------------------
  8: {
    thumb: photoRuko3,
    imgs: [
      photoRuko3,
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 9 · Kavling Reguler 150m²
  // ------------------------------------------------------------------
  9: {
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 10 · Kavling Premium 180m²
  // ------------------------------------------------------------------
  10: {
    thumb: photoKavling180,
    imgs: [
      photoKavling180,
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 11 · Type 120/200 – Cluster Amazonite
  // ------------------------------------------------------------------
  11: {
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    ],
  },

  // ------------------------------------------------------------------
  // ID 12 · Ruko 4 Lantai – Grand Corner
  // ------------------------------------------------------------------
  12: {
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&q=80&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003dc0b01?w=900&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80',
    ],
  },
}

export default propertyImages
