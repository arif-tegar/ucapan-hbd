'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Catatan: Import ConfettiParticles dihapus karena tidak digunakan dalam komponen ini.

const confettiParticles = Array.from({ length: 30 });
const colors = ['#FF69B4', '#8A2BE2', '#00BFFF', '#FFD700', '#FF4500', '#00FF7F'];

const confettiVariants: any = {
  initial: { y: -20, opacity: 0 },
  animate: (i: number) => ({
    y: ['0vh', '105vh'],
    x: ['0vw', `${(i % 2 === 0 ? 1 : -1) * (10 + Math.random() * 10)}vw`],
    opacity: [1, 1, 0.8, 0],
    rotate: [0, Math.random() * 360],
    transition: {
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
      repeat: Infinity,
      ease: 'linear',
    },
  }),
};

const containerVariants: any = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function UcapanPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [12, -12]);
  const rotateY = useTransform(xSpring, [0, 1], [-12, 12]);

  // Mencegah hydration mismatch: tandai bahwa komponen sudah di-render di client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    let clientX: number, clientY: number;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
   <main className="h-[100dvh] w-full relative bg-[#0D0118] flex items-center justify-center p-4 sm:p-6 antialiased overflow-hidden perspective-[1000px] py-6 sm:py-10">
      
      {/* 
        Animasi Konfeti dibungkus dengan pengecekan isMounted.
        Server tidak akan me-render ini, sehingga terhindar dari Error Hydration akibat Math.random()
      */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {confettiParticles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-4 sm:w-2 sm:h-5 rounded-[2px]"
              style={{
                background: colors[i % colors.length],
                left: `${Math.random() * 100}%`,
                top: '-5vh',
                boxShadow: '0 0 5px rgba(255,255,255,0.3)',
              }}
              custom={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </div>
      )}

      {/* KARTU UTAMA */}
      <motion.div
        ref={cardRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
        onTouchCancel={handleLeave}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        className="relative z-10 w-full max-w-[420px] bg-white/[0.12] backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl shadow-pink-500/20 ring-1 ring-white/10 overflow-hidden cursor-pointer will-change-transform touch-none select-none"
      >
        {/* Glow Effects Internal */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-[#ffaeda] rounded-full blur-[60px] sm:blur-[80px] opacity-20 z-0 pointer-events-none"
        />
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-[#dbb8ff] rounded-full blur-[60px] sm:blur-[80px] opacity-20 z-0 pointer-events-none"
        />

        {/* Avatar Foto */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(50px)' }}
          className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 sm:border-8 border-white/10 shadow-lg mb-4 sm:mb-5 flex-shrink-0 bg-white/10"
        >
          <Image
            src="/infanio.jpeg"
            alt="Foto Ifanio nio"
            fill
            className="object-cover relative z-10"
            priority
          />
          <div className="absolute inset-0 bg-black/10 z-0"></div>
        </motion.div>

        {/* Badge */}
        <motion.span
          variants={itemVariants}
          style={{ transform: 'translateZ(40px)' }}
          className="relative z-10 bg-pink-100/10 text-pink-300 font-semibold text-[11px] sm:text-xs px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-sm border border-pink-500/20"
        >
          🎂 Happy Birthday!
        </motion.span>

        {/* Judul */}
        <motion.h1
          variants={itemVariants}
          style={{ transform: 'translateZ(60px)' }}
          className="relative z-10 text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 sm:mb-5 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-[#ffaeda] to-white"
        >
          Selamat Ulang Tahun, <br className="sm:hidden" />
          <span className="text-[#dbb8ff]">Ifanio nio!</span> 🎉
        </motion.h1>

        {/* Box Pesan */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(40px)' }}
          className="relative z-10 bg-black/20 backdrop-blur-md p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 text-[#d5c1c9] text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7 text-left shadow-inner w-full"
        >
          <p className="mb-1.5 font-semibold text-white">Halo Ifanio nio! 👋</p>
          <p className="mb-2">
            Selamat bertambah usia ya! Semoga di usiamu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan kemudahan dalam meraih semua impianmu.
          </p>
          <p className="font-semibold text-[#ffaeda]">
            Tetap jadi orang baik dan terus menginspirasi! ✨
          </p>
        </motion.div>

        {/* Tombol Kembali */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(65px)' }}
          className="w-full relative z-10"
        >
          <Link href="/" className="block w-full">
            <motion.div
              animate={{
                boxShadow: [
                  '0 5px 15px -3px rgba(255, 255, 255, 0.1)',
                  '0 5px 25px 5px rgba(255, 255, 255, 0.2)',
                  '0 5px 15px -3px rgba(255, 255, 255, 0.1)',
                ],
              }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
              whileTap={{ y: 2 }}
              className="w-full rounded-full font-bold py-3.5 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8a486f] to-[#6f5092] text-white shadow-md transition-all duration-300"
            >
              <span className="text-xs sm:text-sm tracking-wide hover:scale-[1.05] active:scale-[0.99]">← Kembali ke Depan</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}