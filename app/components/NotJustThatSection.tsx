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
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)' }}
        >
          SURVEILENCE IS ONLY THE BEGINNING.
          <br />
          <span className="font-body text-[#a3a3a3] text-[18px] leading-[29.9px] tracking-normal normal-case block mt-6 font-normal max-w-2xl mx-auto">
            It also finds who is lost, scans what is broken, and delivers when seconds count.
          </span>
        </h2>
      </div>
    </section>
  );
};
