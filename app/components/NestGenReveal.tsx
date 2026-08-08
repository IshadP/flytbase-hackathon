'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onRegister: () => void;
  modalOpen: boolean;
  onCloseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRegister, modalOpen, onCloseModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <>
      <footer className="bg-[#050507] border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">

          {/* Top row — logo + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-3">
              <Image src="/footer-cube-colored.webp" alt="FlytBase" width={32} height={32} />
              <span className="font-display font-bold text-lg tracking-wider text-white">
                NESTGEN 2026
              </span>
            </div>
            <button
              onClick={onRegister}
              className="rounded-full px-7 py-2.5 bg-[#eaeaf0] hover:bg-white text-[#070709] font-mono text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
            >
              Register now
            </button>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-16">

            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Event</p>
              <ul className="space-y-2.5 font-body text-sm text-white/60">
                <li>September 29, 2026</li>
                <li>Free · Online · Global</li>
                <li>10:30 AM CET</li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Speakers</p>
              <ul className="space-y-2.5 font-body text-sm text-white/60">
                <li>Shell Petroleum</li>
                <li>UK Police (NPCC)</li>
                <li>Airbus</li>
                <li>SQM — Chile</li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">More</p>
              <ul className="space-y-2.5 font-body text-sm text-white/60">
                <li>Port of Singapore</li>
                <li>First Quantum Minerals</li>
                <li>LA Metro</li>
                <li>Italian Railways</li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Company</p>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://flytbase.com" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    FlytBase.com
                  </a>
                </li>
                <li>
                  <a href="https://flytbase.com/contact" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">
              © 2026 FlytBase, Inc. All rights reserved.
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">
              NestGen 2026 · Physical AI Summit
            </span>
          </div>

        </div>
      </footer>

      {/* Registration Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
        >
          <div className="relative w-full max-w-md bg-[#0e0e14] border border-white/20 p-8 rounded-2xl shadow-2xl text-white">

            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 text-[#888899] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <Image src="/footer-cube-colored.webp" alt="" width={32} height={32} />
                  <div>
                    <p className="font-display font-bold text-white text-lg leading-none tracking-wider">NESTGEN 2026</p>
                    <p className="font-mono text-xs tracking-widest text-[#888899] uppercase mt-1">September 29, 2026</p>
                  </div>
                </div>

                <p className="font-body text-[#a0a0b0] text-sm mb-6 leading-relaxed">
                  Free global online summit. One day. The playbook for physical AI at scale — from the companies already doing it.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name',    label: 'Full Name',    type: 'text',  placeholder: 'Your name' },
                    { key: 'email',   label: 'Work Email',   type: 'email', placeholder: 'you@company.com' },
                    { key: 'company', label: 'Organization', type: 'text',  placeholder: 'Company or institution' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="font-mono text-xs tracking-wider text-[#888899] uppercase block mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        required={key !== 'company'}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-white/15 bg-[#141420] px-3.5 py-2.5 text-white text-sm font-body placeholder:text-[#555566] rounded-lg focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full py-3.5 bg-[#eaeaf0] hover:bg-white text-[#070709] font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Reserve My Spot
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <p className="font-display font-bold text-white text-2xl mb-2 tracking-wider">You're in.</p>
                <p className="font-body text-[#a0a0b0] text-sm leading-relaxed">
                  Welcome, <strong className="text-white">{form.name}</strong>. We'll send your stream link to <span className="text-white font-semibold">{form.email}</span> before September 29.
                </p>
                <button
                  onClick={onCloseModal}
                  className="mt-6 font-mono text-xs tracking-wider uppercase text-[#888899] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
