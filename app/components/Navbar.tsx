'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  onRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const tickerText = "SEPTEMBER 29 — 2:30 PM AEST / 10:30 AM CET / 8:30 AM CT ✦ ";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Ticker Marquee Bar */}
      <div className="bg-[#050507] border-b border-white/10 py-1.5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap font-mono text-[10px] sm:text-[11px] text-[#888899] tracking-widest uppercase">
          <span>{tickerText.repeat(8)}</span>
          <span>{tickerText.repeat(8)}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`transition-all duration-300 ${
          scrolled ? 'bg-[#070709]/90 backdrop-blur-md border-b border-white/10 py-2.5' : 'bg-[#070709]/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/footer-cube-colored.webp"
              alt="NestGen 2026 Logo"
              width={26}
              height={26}
              className="group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white">
              NESTGEN 2026
            </span>
          </a>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#888899] tracking-widest uppercase">
            <a href="#speakers" className="hover:text-white transition-colors">
              SPEAKERS
            </a>
            <a href="#recap" className="hover:text-white transition-colors">
              RECAP
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right CTA Pill Button */}
          <button
            onClick={onRegister}
            className="rounded-full px-8 py-3 bg-[#eaeaf0] hover:bg-white text-[#070709] font-mono text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Register now
          </button>

        </div>
      </header>
    </div>
  );
};
