'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Partikel emoji cantik untuk Ibu
const emojis = ['🌸', '💖', '✨', '🌷', '🎀', '❤️'];
const confettiParticles = Array.from({ length: 35 });

const confettiVariants: any = {
  initial: { y: -50, opacity: 0 },
  animate: (i: number) => ({
    y: ['0vh', '105vh'],
    x: ['0vw', `${(i % 2 === 0 ? 1 : -1) * (15 + Math.random() * 15)}vw`],
    opacity: [0, 1, 1, 0],
    rotate: [0, Math.random() * 360],
    transition: {
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 3,
      repeat: Infinity,
      ease: 'linear',
    },
  }),
};

const galleryData = [
  {
    id: 1,
    src: '/Ibu4.jpeg',
    caption: 'Momen kebersamaan yang akan selalu tersimpan rapi di dalam hati. 📸',
    date: 'Kenangan Terindah',
  },
  {
    id: 2,
    src: '/Ibu2.jpeg',
    caption: 'Liburan paling berkesan🚗🌸',
    date: 'Kenangan Liburan',
  },
  {
    id: 3,
    src: '/Ibu3.jpeg',
    caption: 'Tawa ceria Ibu selalu bisa mencairkan dan menghangatkan suasana. 🌷',
    date: 'Tawa & Bahagia',
  },
  {
    id: 4,
    src: '/Ibu1.jpeg',
    caption: 'Senyum Ibu yang paling cerah bikin tenang ✨',
    date: 'Hari Spesial',
  },
  {
    id: 5,
    src: '/Ibu10.jpeg',
    caption: 'Selamat ulang tahun untuk wanita paling berharga! 🎉',
    date: 'Wanita Terhebat',
  },
  {
    id: 6,
    src: '/Ibu6.jpeg',
    caption: 'Setiap senyuman Ibu selalu jadi kebahagiaan terbesar. ✨',
    date: 'Momen Manis',
  },
  {
    id: 7,
    src: '/Ibu7.jpeg',
    caption: 'Setiap ketulusan dan pengorbanan Ibu terukir indah. 🌺',
    date: 'asih Abadi',
  },
  {
    id: 8,
    src: '/Ibu9.jpeg',
    caption: 'Tempat paling aman dan nyaman di dunia adalah pelukan Ibu. 💖',
    date: 'Pelukan Hangat',
  },
  {
    id: 9,
    src: '/Ibu5.jpeg',
    caption: 'Terima kasih selalu mendoakanku setiap hari, Bu 💖',
    date: 'PDoa Ibu',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: [-1.5, 1.5, -1.5],
    transition: {
      opacity: { duration: 0.5 },
      y: { duration: 0.5 },
      rotate: {
        repeat: Infinity,
        duration: 3.5,
        ease: 'easeInOut',
        delay: i * 0.15,
      },
    },
  }),
  hover: {
    scale: 1.02,
    rotate: 0,
    zIndex: 20,
    transition: { duration: 0.2 },
  },
};

export default function GaleriPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 px-4 py-6 sm:p-8 antialiased relative overflow-x-hidden">
      
      {/* Animasi Hujan Bunga & Hati */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {confettiParticles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl drop-shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10vh',
              }}
              custom={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
            >
              {emojis[i % emojis.length]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Background Glow */}
      <div className="fixed top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-rose-300/30 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-200/40 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      {/* Judul Halaman */}
      <div className="max-w-2xl mx-auto text-center mt-2 mb-8 sm:mb-12 relative z-10 px-2">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-block bg-rose-100/90 backdrop-blur-sm text-rose-600 font-bold text-xs px-3.5 py-1.5 rounded-full mb-2.5 shadow-sm border border-rose-200"
        >
          📸 Album Kenangan
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-rose-900 tracking-tight mb-2"
        >
          Momen Indah Bersama <span className="text-pink-600">Ibu</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-rose-700/80 text-xs sm:text-sm md:text-base max-w-md mx-auto font-medium"
        >
          Kumpulan jejak kasih sayang Ibu yang selalu menghangatkan hati.
        </motion.p>
      </div>

      {/* Grid Foto Polaroid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xs sm:max-w-2xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10 pb-28"
      >
        {galleryData.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            whileHover="hover"
            whileTap="hover"
            className="bg-white/80 backdrop-blur-md p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-2xl shadow-lg shadow-rose-900/5 border border-white/80 flex flex-col items-center cursor-pointer relative"
          >
            {/* Bingkai Foto - Utuh tanpa Crop */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-rose-100/40 mb-3 border border-rose-100/80 flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-1.5 transition-transform duration-300"
              />
            </div>

            {/* Tanggal / Label */}
            <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
              {item.date}
            </span>

            {/* Caption Foto */}
            <p className="text-rose-900 font-semibold text-xs sm:text-sm text-center leading-snug px-1">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tombol Navigasi Bawah */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 sm:gap-3 w-full px-4 max-w-xs sm:max-w-none">
        <Link href="/ucapan" className="flex-1 sm:flex-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white/90 backdrop-blur-md text-rose-700 font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-md border border-rose-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-white transition-all"
          >
            💌 Kartu Ucapan
          </motion.button>
        </Link>
        <Link href="/" className="flex-1 sm:flex-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-md text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            🏠 Halaman Awal
          </motion.button>
        </Link>
      </div>
    </main>
  );
}