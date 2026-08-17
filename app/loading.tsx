'use client';

export default function Loading() {
  return (
    <div className="h-[100dvh] w-full bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow Effect (Diselaraskan dengan UcapanPage) */}
      <div className="absolute w-72 h-72 bg-rose-300/50 rounded-full blur-[100px] pointer-events-none -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-amber-200/60 rounded-full blur-[100px] pointer-events-none -bottom-10 -right-10" />

      {/* Box Glassmorphism & Spinner */}
      <div className="relative z-10 flex flex-col items-center gap-4 bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-pink-500 rounded-full animate-spin" />
        <p className="text-rose-700 text-xs sm:text-sm font-bold tracking-widest uppercase animate-pulse">
          Memuat Halaman...
        </p>
      </div>
    </div>
  );
}