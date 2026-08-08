'use client';

import React from 'react';
import Image from 'next/image';

interface LearnMoreSectionProps {
  onRegister: () => void;
}

export const LearnMoreSection: React.FC<LearnMoreSectionProps> = ({ onRegister }) => {
  return (
    <section className="relative bg-[#070709] border-t border-white/10 py-32 sm:py-40 text-white overflow-hidden">

      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center">

        <div className="flex items-center justify-center gap-3.5 mb-10">
          <Image
            src="/footer-cube-colored.webp"
            alt="FlytBase"
            width={44}
            height={44}
          />
          <span className="font-display font-bold text-xl sm:text-2xl tracking-wider text-white">
            NESTGEN 2026
          </span>
        </div>

        <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase mb-6">
          September 29, 2026 — Free. Online. Global.
        </p>

        <h2
          className="font-display font-bold text-white tracking-wider leading-[1.05] mb-6 uppercase"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        >
          JOIN US TO SEE HOW<br />PHYSICAL AI WILL CHANGE THE FUTURE!
        </h2>

        <p className="font-body text-[#a3a3a3] text-[18px] leading-[29.9px] max-w-xl mx-auto mb-12">
          One day. Nine industries. The companies already running autonomous machines at scale — sharing exactly how they did it.
        </p>

        <button
          onClick={onRegister}
          className="rounded-full px-8 py-3 bg-[#eaeaf0] hover:bg-white text-[#070709] font-mono text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Register now
        </button>

      </div>
    </section>
  );
};
