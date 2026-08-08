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
  const sectionRef        = useRef<HTMLElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const videoWrapperRef   = useRef<HTMLDivElement>(null);
  const textContainerRef  = useRef<HTMLDivElement>(null);
  const blackOverlayRef   = useRef<HTMLDivElement>(null);
  const thinkAboutThisRef = useRef<HTMLDivElement>(null);
  const targetTimeRef     = useRef<number>(0);

  useEffect(() => {
    const section       = sectionRef.current;
    const video         = videoRef.current;
    const videoWrapper  = videoWrapperRef.current;
    const textContainer  = textContainerRef.current;
    const blackOverlay   = blackOverlayRef.current;
    const thinkText      = thinkAboutThisRef.current;

    if (!section || !video || !videoWrapper || !textContainer) return;

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

          // 1. Smooth target time for ticker loop
          if (video.duration) {
            targetTimeRef.current = p * video.duration;
          }

          // 2. Text fade out over first 20% of scroll (0.0 -> 0.2)
          const textOpacity = Math.max(0, 1 - p * 5);
          textContainer.style.opacity = textOpacity.toString();
          textContainer.style.pointerEvents = p > 0.1 ? 'none' : 'auto';

          // 3. "Think about this" appears bottom-center after 88% scroll progress
          if (thinkText) {
            if (p >= 0.88) {
              const thinkProgress = Math.min(1, (p - 0.88) / 0.08); // 0 -> 1
              const translateY = (1 - thinkProgress) * 40;           // 40px -> 0px
              thinkText.style.opacity = thinkProgress.toString();
              thinkText.style.transform = `translate(-50%, ${translateY}px)`;
            } else {
              thinkText.style.opacity = '0';
              thinkText.style.transform = 'translate(-50%, 40px)';
            }
          }

          // 4. Zoom video from 1X to 2X AND fade to black during 95% -> 100% of scroll
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

    return () => {
      gsap.ticker.remove(onTick);
      ctx.revert();
    };
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

      {/* "Think about this" — appears bottom-center after 88% video progression */}
      <div
        ref={thinkAboutThisRef}
        className="absolute bottom-12 left-1/2 z-30 pointer-events-none transition-all duration-75"
        style={{ opacity: 0, transform: 'translate(-50%, 40px)' }}
      >
        <p className="font-display font-bold text-white text-2xl sm:text-4xl tracking-wider uppercase drop-shadow-xl text-center whitespace-nowrap">
          Think about this
        </p>
      </div>

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
          className="fade-up-2 font-display font-bold text-white tracking-wider uppercase leading-[1.05] text-center max-w-9xl drop-shadow-lg"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.8rem)' }}
        >
          A summit about things that
          reach where humans can't.
        </h1>

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
