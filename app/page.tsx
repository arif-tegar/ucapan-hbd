'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';


export default function BirthdayApp() {
  const [page] = useState('home');

  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease-out',
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const calculateTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = 12;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    calculateTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      calculateTilt(touch.clientX, touch.clientY);
    }
  };

  const handleReset = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  return (
    <main className="min-h-[100dvh] w-full bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden relative antialiased">
      {/* Background Glow Soft */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-rose-300/40 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-amber-200/50 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>

      {page === 'home' && (
        <div
          ref={cardRef}
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleReset}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleReset}
          className="relative z-10 w-full max-w-[420px] bg-white/40 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(225,29,72,0.15)] text-center border border-white/60 ring-1 ring-white/50 touch-none select-none cursor-pointer"
        >
          <div className="text-6xl sm:text-7xl mb-5 sm:mb-6 animate-bounce drop-shadow-md">
            🎁
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-900 mb-3 sm:mb-4 leading-tight">
            Ada Kejutan Buat <span className="text-pink-600"></span>
            <br />
            <span className="text-pink-600">Ibu Tutik!</span>
          </h1>
          <p className="text-rose-700/80 mb-6 sm:mb-8 font-medium leading-relaxed text-xs sm:text-sm">
            Arif mengirimkan kartu ucapan spesial hari ini. Klik tombol di bawah untuk membukanya!
          </p>

          <Link href="/ucapan" className="block w-full">
            <button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
              <span className="text-xs sm:text-sm">🎉 Buka Kejutan Ulang Tahun ✨</span>
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}