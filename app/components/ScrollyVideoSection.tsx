'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Text lines that scrub in sync with video progress
const CAPTIONS = [
  { at: 0.0,  text: 'A drone wakes up.' },
  { at: 0.25, text: 'No pilot. No call. No delay.' },
  { at: 0.5,  text: 'It sees what humans can\'t reach.' },
  { at: 0.75, text: 'And it\'s already on its way back.' },
];

export const ScrollyVideoSection: React.FC = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const captionRef  = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    let lastCaptionText = CAPTIONS[0].text;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.4,
        onUpdate(self) {
          const p = self.progress;

          // Scrub video currentTime
          if (video.readyState >= 2 && video.duration) {
            video.currentTime = p * video.duration;
          }

          // Update progress bar scale
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${p})`;
          }

          // Pick caption text directly without triggering React VDOM re-render
          let current = CAPTIONS[0].text;
          for (const c of CAPTIONS) {
            if (p >= c.at) current = c.text;
          }

          if (captionRef.current && current !== lastCaptionText) {
            lastCaptionText = current;
            captionRef.current.textContent = current;
            // Trigger quick fade animation via CSS class restart
            captionRef.current.classList.remove('fade-caption');
            // Force reflow
            void captionRef.current.offsetWidth;
            captionRef.current.classList.add('fade-caption');
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#111111] overflow-hidden border-t border-white/10"
    >
      {/* Full-bleed video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ willChange: 'contents' }}
      >
        <source src="/Drones_moving_off_screen_202608081441.mp4" type="video/mp4" />
      </video>

      {/* Light vignette overlay */}
      <div className="absolute inset-0 bg-[#070709]/30 pointer-events-none" />

      {/* Caption — centered text */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-8 text-center pointer-events-none">
        <p
          ref={captionRef}
          className="font-display font-bold text-white leading-[1.0] fade-caption"
          style={{
            fontSize: 'clamp(2.2rem, 6.5vw, 5.8rem)',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}
        >
          {CAPTIONS[0].text}
        </p>
      </div>

      {/* Progress bar — thin white line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white origin-left"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Scroll hint */}
      <div className="absolute top-8 right-8 z-20 font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
        Scroll
      </div>
    </section>
  );
};
