import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Globe } from 'lucide-react';

import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { XUM_APK_URL as XUM_DOWNLOAD_URL } from '../config';

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
              Download <span className="text-blue-500">XUM AI</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get the latest version of XUM AI.
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

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;
