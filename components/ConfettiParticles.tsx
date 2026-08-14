'use client';

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  color: string;
  sizeWidth: number;
  sizeHeight: number;
  duration: number;
  delay: number;
}

const COLORS = [
  '#f43f5e', // rose
  '#3b82f6', // blue
  '#eab308', // yellow
  '#10b981', // emerald
  '#a855f7', // purple
  '#ec4899', // pink
];

export default function ConfettiParticles({ count = 35 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Menandai bahwa komponen sudah berjalan di browser (client)
    setIsMounted(true);

    // Membuat posisi acak HANYA setelah masuk ke client side
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      sizeWidth: Math.random() * 6 + 4,
      sizeHeight: Math.random() * 12 + 6,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));

    setParticles(generated);
  }, [count]);

  // Cegah render di server agar tidak ada hydration error
  if (!isMounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-[2px] animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.sizeWidth}px`,
            height: `${p.sizeHeight}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}