'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActOne } from './components/ActOne';
import { ScrollyVideoSection } from './components/ScrollyVideoSection';
import { PhysicalAiSection } from './components/PhysicalAiSection';
import { PatrolVideoSection } from './components/PatrolVideoSection';
import { NotJustThatSection } from './components/NotJustThatSection';
import { CapabilitiesVideoSection } from './components/CapabilitiesVideoSection';
import { LearnMoreSection } from './components/LearnMoreSection';
import { Footer } from './components/NestGenReveal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const open  = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <main className="min-h-screen bg-[#070709] text-white overflow-x-hidden w-full max-w-full">
      <Navbar onRegister={open} />
      <HeroSection onRegister={open} />
      <ActOne />
      <ScrollyVideoSection />
      <PhysicalAiSection />
      <PatrolVideoSection />
      <NotJustThatSection />
      <CapabilitiesVideoSection />
      <LearnMoreSection onRegister={open} />
      <Footer onRegister={open} modalOpen={modalOpen} onCloseModal={close} />
    </main>
  );
}
