'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPTIONS = [
  // { at: 0.0,  text: 'A drone wakes up.' },
  // { at: 0.25, text: 'No pilot. No call. No delay.' },
  // { at: 0.5,  text: 'It sees what humans can\'t reach.' },
  // { at: 0.75, text: 'And it\'s already on its way back.' },
  { at: 0.0, text: 'A drone wakes up, already moving.' },
  { at: 0.25, text: 'Faster than anyone could get there.' },
  { at: 0.5, text: 'Extending what one person could ever d0 alone.' },
  { at: 0.75, text: 'A system that makes sure urgent things get seen first.' },
];

export const ScrollyVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let lastCaptionText = CAPTIONS[0].text;

    // Smooth video frame lerp ticker loop
    const onTick = () => {
      if (video && video.readyState >= 2 && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.004) {
          video.currentTime += diff * 0.2;
        }
      }
    };
    gsap.ticker.add(onTick);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.8,
        onUpdate(self) {
          const p = self.progress;

          // Set smooth target time for ticker loop
          if (video.duration) {
            targetTimeRef.current = p * video.duration;
          }

          // Progress bar
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${p})`;
          }

          // Pick caption
          let current = CAPTIONS[0].text;
          for (const c of CAPTIONS) {
            if (p >= c.at) current = c.text;
          }

          if (captionRef.current && current !== lastCaptionText) {
            lastCaptionText = current;
            captionRef.current.textContent = current;
            captionRef.current.classList.remove('fade-caption');
            void captionRef.current.offsetWidth;
            captionRef.current.classList.add('fade-caption');
          }
        },
      });
    }, section);

    return () => {
      gsap.ticker.remove(onTick);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#111111] overflow-hidden border-t border-white/10"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <source src="/Drones_moving_off_screen_202608081441.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#070709]/30 pointer-events-none" />

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

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white origin-left"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      <div className="absolute top-8 right-8 z-20 font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
        Scroll
      </div>
    </section>
  );
};
