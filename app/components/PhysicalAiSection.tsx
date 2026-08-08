'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INDUSTRIES = [
  { label: 'Mining', stat: '90 min', detail: 'Leak detection — down from days' },
  { label: 'Public Safety', stat: '< 2 min', detail: 'On-scene before the patrol car' },
  { label: 'Solar', stat: '1 GW', detail: 'Inspected by 2 docks, no crew' },
  { label: 'Oil & Gas', stat: '100×', detail: 'More flights, no extra pilots' },
  { label: 'Maritime', stat: '5 km', detail: 'Surveillance range from 400 m' },
  { label: 'Railways', stat: '½ in', detail: 'Defect found from 100 ft up' },
];

export const PhysicalAiSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imgRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Copy fade up
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: copyRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stat rows stagger
      rowsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#070709] border-t border-white/10 text-white">

      {/* Full-width sky image with dark gradient */}
      <div ref={imgRef} className="relative w-full overflow-hidden opacity-0 border-b border-white/10" style={{ height: 'clamp(280px, 42vw, 540px)' }}>
        <Image
          src="/84a4e757-327b-4d93-95bd-cab36e73c739.png"
          alt="Open sky — physical AI"
          fill
          className="object-cover object-top opacity-60 brightness-90 contrast-110"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 w-full pb-10">
            <p className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase mb-2">
              Physical AI — the shift
            </p>
            <h2
              className="font-display font-bold text-white tracking-wider leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              A day to discuss about any machine that senses the world and acts on it.
            </h2>
          </div>
        </div>
      </div>

      {/* Body copy + stats grid */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-24">

        <div ref={copyRef} className="opacity-0 w-full mb-16">
          <p className="font-body text-neutral-700 font-semibold text-lg sm:text-lg lg:text-lg leading-relaxed">
            The drone-in-a-box is just the start. Physical AI means any autonomous machine — on the ground, in the air, on the water — that can perceive, decide, and act without a human in the loop. The companies showing up at NestGen are already running this at scale.
          </p>
        </div>

        {/* Industry stat rows - Dark Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((item, i) => (
            <div
              key={i}
              ref={el => { rowsRef.current[i] = el; }}
              className="bg-[#0e0e14] border border-white/10 p-6 opacity-0 group hover:border-white/30 hover:bg-[#141420] transition-all rounded-xl"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-[#888899] uppercase mb-3">
                {item.label}
              </p>
              <p
                className="font-display font-bold text-white leading-none mb-2 tracking-wide group-hover:text-white transition-colors"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {item.stat}
              </p>
              <p className="font-body text-[#aaaa88] text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
