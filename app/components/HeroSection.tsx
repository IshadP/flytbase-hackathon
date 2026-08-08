'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegister }) => {
  const sectionRef       = useRef<HTMLElement>(null);
  const videoRef         = useRef<HTMLVideoElement>(null);
  const videoWrapperRef  = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const blackOverlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section      = sectionRef.current;
    const video        = videoRef.current;
    const videoWrapper = videoWrapperRef.current;
    const textContainer = textContainerRef.current;
    const blackOverlay  = blackOverlayRef.current;

    if (!section || !video || !videoWrapper || !textContainer) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.4,
        onUpdate(self) {
          const p = self.progress;

          // 1. Scrub video playback
          if (video.readyState >= 2 && video.duration) {
            video.currentTime = p * video.duration;
          }

          // 2. Text fade out over first 20% of scroll (0.0 -> 0.2)
          const textOpacity = Math.max(0, 1 - p * 5);
          textContainer.style.opacity = textOpacity.toString();
          textContainer.style.pointerEvents = p > 0.1 ? 'none' : 'auto';

          // 3. Zoom video from 1X to 2X AND fade to black during 95% -> 100% of scroll
          if (p >= 0.95) {
            const zoomProgress = (p - 0.95) / 0.05; // 0 -> 1
            const scale = 1 + zoomProgress * 1;     // 1 -> 2
            videoWrapper.style.transform = `scale(${scale})`;
            if (blackOverlay) {
              blackOverlay.style.opacity = zoomProgress.toString();
            }
          } else {
            videoWrapper.style.transform = 'scale(1)';
            if (blackOverlay) {
              blackOverlay.style.opacity = '0';
            }
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#070709] overflow-hidden flex flex-col justify-center items-center text-center"
    >
      {/* Background Video Wrapper — handles scale(1 -> 2) zoom */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full origin-center transition-transform duration-75 ease-out pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75 brightness-90 contrast-105"
        >
          <source src="/Drone_collides_with_camera_202608081626.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark vignette overlay for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/30 to-[#070709]/60 pointer-events-none" />
      </div>

      {/* Fade to Black Overlay — activates during 95% -> 100% scroll */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 bg-[#070709] pointer-events-none z-20 transition-opacity duration-75"
        style={{ opacity: 0 }}
      />

      {/* Hero Text Overlay — Fades out over first 20% of scroll */}
      <div
        ref={textContainerRef}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center justify-center transition-opacity duration-100 ease-out"
        style={{ willChange: 'opacity' }}
      >
        {/* Pill Badges */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 fade-up">
          <span className="rounded-full px-4 py-1.5 border border-white/20 bg-white/10 text-white/90 font-mono text-xs tracking-wider backdrop-blur-sm">
            09.29.26
          </span>
          <span className="rounded-full px-4 py-1.5 border border-white/20 bg-white/10 text-white/90 font-mono text-xs tracking-wider backdrop-blur-sm">
            Online Only
          </span>
        </div>

        {/* Centered Pixel Headline */}
        <h1
          className="fade-up-2 font-display font-bold text-white tracking-wider leading-[1.05] text-center max-w-5xl drop-shadow-lg"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.8rem)' }}
        >
          Humans can't be everywhere.<br />
          So let's see who can.
        </h1>

        {/* Subheadline Tagline */}
        <p className="fade-up-3 font-body text-white/70 text-base sm:text-lg mt-5 max-w-lg text-center drop-shadow-md">
          A summit about things that reach where humans can't.
        </p>

        {/* Centered Pill Button CTA */}
        <div className="fade-up-3 mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={onRegister}
            className="rounded-full px-8 py-3 bg-[#eaeaf0] hover:bg-white text-[#070709] font-mono text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Register now
          </button>
        </div>
      </div>
    </section>
  );
};
