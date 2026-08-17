'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

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

  const rotateX = useTransform(ySpring, [0, 1], [10, -10]);
  const rotateY = useTransform(xSpring, [0, 1], [-10, 10]);

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#f472b6', '#a855f7'],
        startVelocity: 35,
        gravity: 0.8,
        scalar: 1.1,
      });
    }, 600);

    return () => clearTimeout(timer);
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
    <main className="h-[100dvh] w-full relative bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 flex items-center justify-center p-4 sm:p-6 antialiased overflow-hidden perspective-[1000px] py-6 sm:py-10">
      
      {/* Animasi Hujan Bunga & Hati */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
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
        className="relative z-10 w-full max-w-[420px] bg-white/40 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/60 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(225,29,72,0.15)] ring-1 ring-white/50 overflow-hidden cursor-pointer will-change-transform touch-none select-none"
      >
        {/* Glow Effects Internal */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-rose-300 rounded-full blur-[60px] sm:blur-[80px] opacity-40 z-0 pointer-events-none"
        />
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-amber-200 rounded-full blur-[60px] sm:blur-[80px] opacity-40 z-0 pointer-events-none"
        />

        {/* Avatar Foto */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(50px)' }}
          className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-xl mb-4 sm:mb-5 flex-shrink-0 bg-white"
        >
          <Image
            src="/Ibu8.jpeg"
            alt="Foto Ibu Tercinta"
            fill
            className="object-cover relative z-10"
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.span
          variants={itemVariants}
          style={{ transform: 'translateZ(40px)' }}
          className="relative z-10 bg-rose-100 text-rose-600 font-bold text-[11px] sm:text-xs px-4 py-1.5 rounded-full mb-3 shadow-sm border border-rose-200"
        >
          👑 Ratu Sehari!
        </motion.span>

        {/* Judul */}
        <motion.h1
          variants={itemVariants}
          style={{ transform: 'translateZ(60px)' }}
          className="relative z-10 text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 sm:mb-5 leading-tight text-rose-800"
        >
          Selamat Ulang Tahun, <br />
          <span className="text-pink-600">Ibu Tercinta!</span> 💖
        </motion.h1>

        {/* Box Pesan */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(40px)' }}
          className="relative z-10 bg-white/60 backdrop-blur-md p-5 rounded-xl sm:rounded-2xl border border-white text-rose-900 text-xs sm:text-sm leading-relaxed mb-7 text-left shadow-sm w-full"
        >
          <p className="mb-2 font-bold text-rose-700">Ibuku Tersayang, 💐</p>
          <p className="mb-3">
            Selamat bertambah usia! Terima kasih atas segala cinta, kesabaran, dan doa yang tak pernah putus untukku. Semoga Ibu selalu diberikan kesehatan, umur panjang, dan kebahagiaan yang melimpah.
          </p>
          <p className="font-semibold text-pink-600 italic">
            "Tidak ada tempat ternyaman selain pelukan Ibu."
          </p>
        </motion.div>

        {/* Tombol Galeri */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(65px)' }}
          className="w-full relative z-10"
        >
          <Link href="/galeri" className="block w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full font-bold py-3.5 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
            >
              <span className="text-xs sm:text-sm tracking-wide">Lanjut ke Halaman Galeri →</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Tombol Kembali */}
        <motion.div
          variants={itemVariants}
          style={{ transform: 'translateZ(65px)' }}
          className="w-full relative z-10 mt-3"
        >
          <Link href="/" className="block w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full font-bold py-3.5 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
            >
              <span className="text-xs sm:text-sm tracking-wide">← Kembali ke Halaman Utama</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}