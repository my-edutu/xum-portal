import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Globe, Mic, Gamepad2, MessageCircle, Award } from 'lucide-react';

import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';

// APK artifacts published via GitHub Releases (built by our GitHub Action)
const XUM_DOWNLOAD_URL = 'https://github.com/my-edutu/xum-portal/releases/download/v0.0.1/application-2f91ea1a-7336-4da9-b7b3-4a75beffbdea.apk';
const LINGUALINK_DOWNLOAD_URL = 'https://github.com/my-edutu/xum-portal/releases/download/v1.0.0-lingualink/application-7de3731e-6f40-4947-a5ef-04092d21df0d.apk';

const XumSection: React.FC = () => {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-blue-500/20 transition-colors duration-500">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
          <Download className="w-7 h-7 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">XUM AI</h2>
          <p className="text-blue-500 font-medium mt-1">Global Intelligence Platform</p>
        </div>
      </div>

      <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
        Join the network powering next-generation LLMs and Vision Models. Complete tasks, earn rewards, and help shape the future of AI.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
          <Smartphone size={14} /> iOS — Coming Soon
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
          <Smartphone size={14} /> Android — Coming Soon
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
          <Globe size={14} /> Direct APK Available
        </span>
      </div>

      <a
        href={XUM_DOWNLOAD_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 btn-base bg-blue-600 hover:bg-blue-500 text-white btn-lg w-full sm:w-auto"
      >
        <Download className="w-5 h-5" />
        Download Now
      </a>
    </div>
  );
};

const features = [
  { icon: Mic, label: 'Record & Share', desc: 'Speak a phrase from your language and share it. Voice or video — you choose.' },
  { icon: MessageCircle, label: 'Duet with Others', desc: 'Reply to clips with your own. Like a duet — but with words from your mother tongue.' },
  { icon: Award, label: 'Earn Rewards', desc: 'Help check clips for accuracy and earn real money. The more you help, the more you make.' },
  { icon: Gamepad2, label: 'Play Language Games', desc: 'Challenge friends to word games. Learn new words without even trying.' },
];

const Downloads: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-semibold mb-4 tracking-tight">
              Download Our <span className="text-blue-500">Apps</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get the latest versions of XUM AI and LinguaLink AI.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* XUM AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <XumSection />
            </motion.div>

            {/* LinguaLink AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden bg-white border border-orange-200 rounded-[2rem] p-8 md:p-10"
            >
              <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,107,0,0.12),transparent_70%)] top-[-150px] right-[-150px] pointer-events-none"></div>
              <div className="absolute w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(255,138,0,0.08),transparent_70%)] bottom-[-100px] left-[-100px] pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-[rgba(255,107,0,0.15)] rounded-2xl flex items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-[#FF8A00]">L</span>
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#FF8A00] tracking-widest uppercase">
                      LinguaLink <span className="text-slate-900">AI</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-0.5">Speak Your Roots</p>
                  </div>
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,107,0,0.15)] border border-[rgba(255,107,0,0.3)] text-[#FF8A00] text-xs font-semibold mb-5">
                  Now available on iOS &amp; Android
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                  Speak your roots. Share your voice.
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl">
                  LinguaLink AI helps you learn, speak, and share your mother tongue with the world.
                  Record voice clips, make videos, play games, and earn real rewards.
                </p>

                {/* Feature mini-cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF8A0022] to-[#FF6B0011] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#FF8A00]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{f.label}</p>
                          <p className="text-xs text-slate-500">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full text-xs text-slate-500">
                    <Smartphone size={14} /> iOS — Coming Soon
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full text-xs text-slate-500">
                    <Smartphone size={14} /> Android — Coming Soon
                  </span>
                </div>

                <a
                  href={LINGUALINK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] text-white shadow-[0_4px_20px_rgba(255,107,0,0.4)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 transition-all"
                >
                  <Download size={18} />
                  Download Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;
