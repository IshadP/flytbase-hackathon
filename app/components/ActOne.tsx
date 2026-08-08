'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    type: 'beat' as const,
    index: '01',
    problem: 'A mine in Chile has a leak. Someone finds it — days later.',
    detail: 'A team drives for hours across desert terrain to inspect a site. By the time they arrive, the iodine yield has already dropped.',
    bg: '#070709',
    image: '/mine.png',
  },
  {
    id: 2,
    type: 'beat' as const,
    index: '02',
    problem: 'An emergency call comes in. A patrol car is 12 minutes away.',
    detail: 'The suspect is gone in 4. Every second the dispatcher is blind, the situation gets harder to control.',
    bg: '#0d0d14',
    image: '/police.png',
  },
  {
    id: 3,
    type: 'beat' as const,
    index: '03',
    problem: 'A power line fault is developing. Nobody knows yet.',
    detail: "Scheduled inspections happen twice a year. Wildfires don't wait for the calendar.",
    bg: '#141420',
    image: '/power.png',
  },
  {
    id: 4,
    type: 'pivot' as const,
    index: '04',
    problem: 'Then something',
    highlight: 'changed.',
    detail: '',
    bg: '#050507',
    image: null,
  },
];

const STACK_SCALE_STEP = 0.05;
const STACK_Y_STEP = 14;
const STACK_MAX_DEPTH = 3;

export const ActOne: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: () => `+=${card.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            for (let j = 0; j < i; j++) {
              const depth = i - j;
              if (depth > STACK_MAX_DEPTH) continue;

              const earlierCard = cards[j];
              const targetScale = 1 - depth * STACK_SCALE_STEP * self.progress;
              const targetY = -depth * STACK_Y_STEP * self.progress;
              const targetDim = 1 - depth * 0.12 * self.progress;

              gsap.set(earlierCard, {
                scale: Math.max(targetScale, 1 - STACK_SCALE_STEP * STACK_MAX_DEPTH),
                y: targetY,
                filter: `brightness(${Math.max(targetDim, 0.55)})`,
                transformOrigin: 'center top',
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="relative h-screen w-full flex flex-col justify-center overflow-hidden border-t border-white/10 shadow-2xl will-change-transform"
          style={{
            zIndex: 10 + i,
            backgroundColor: card.bg,
          }}
        >
          {/* Background Image with Lightened Dark Gradient Overlay */}
          {card.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={card.image}
                alt={card.problem}
                fill
                className="object-cover opacity-65 brightness-90 contrast-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/85 via-[#070709]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-transparent to-[#070709]/40" />
            </div>
          )}

          {/* Card Content */}
          <div className="relative z-10 px-8 sm:px-14 lg:px-20 max-w-[1100px] mx-auto w-full">
            {card.type === 'beat' ? (
              <>
                <p className="font-mono text-xs tracking-[0.3em] uppercase mb-8 text-white/50">
                  {card.index} / 03
                </p>

                <h2
                  className="font-display font-bold leading-[1.05] tracking-wide mb-8 text-white drop-shadow-md"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)' }}
                >
                  {card.problem}
                </h2>

                <p className="font-body text-base sm:text-lg leading-relaxed max-w-xl text-white/80 drop-shadow">
                  {card.detail}
                </p>
              </>
            ) : (
              <div className="text-center">
                <h2
                  className="font-display font-bold text-white leading-[0.96] tracking-wider"
                  style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}
                >
                  {card.problem}
                  <br />
                  <span className="text-white/40">{card.highlight}</span>
                </h2>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-10" />
        </div>
      ))}
    </section>
  );
};