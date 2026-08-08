'use client';

import React from 'react';

export const NotJustThatSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050507] border-t border-white/10 px-8 py-32 text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center">
        <h2
          className="font-display font-bold text-white tracking-wider leading-[0.95] uppercase"
          style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}
        >
          NOT JUST THAT
          <br />
          <span className="text-white/40 font-body text-2xl sm:text-4xl lg:text-5xl tracking-normal normal-case block mt-6 font-normal">
            Physical AI can do a lot more
          </span>
        </h2>
      </div>
    </section>
  );
};
