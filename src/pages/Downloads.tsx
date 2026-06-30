import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Download, Smartphone, Globe } from 'lucide-react';

import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';

const DIRECT_DOWNLOAD_URL = 'https://expo.dev/artifacts/eas/aa7eCVVVNLRh2jB1R7SZH2.aab';

const AppSection: React.FC<{
  title: string;
  tagline: string;
  description: string;
  accent: string;
  accentBg: string;
  accentGlow: string;
  icon: React.ReactNode;
  directUrl?: string;
  onCopy?: () => void;
  copied?: boolean;
}> = ({ title, tagline, description, accent, accentBg, accentGlow, icon, directUrl, onCopy, copied }) => (
  <div className={`bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-${accent}/20 transition-colors duration-500`}>
    <div className="flex items-start gap-4 mb-6">
      <div className={`w-14 h-14 ${accentBg} rounded-2xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className={`text-${accent} font-medium mt-1`}>{tagline}</p>
      </div>
    </div>

    <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{description}</p>

    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
        <Smartphone size={14} /> iOS — Coming Soon
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
        <Smartphone size={14} /> Android — Coming Soon
      </span>
      {directUrl && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">
          <Globe size={14} /> Direct APK Available
        </span>
      )}
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      {directUrl ? (
        <>
          <a
            href={directUrl}
            target="_blank"
            rel="noreferrer"
            className={`btn-base ${accentBg.replace('/10', '')} hover:brightness-110 text-white btn-lg gap-3 w-full sm:w-auto`}
          >
            <Download className="w-5 h-5" />
            Download Now
          </a>
          {onCopy && (
            <button
              onClick={onCopy}
              className="btn-base btn-secondary btn-lg gap-3 w-full sm:w-auto"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Link copied' : 'Copy download link'}
            </button>
          )}
        </>
      ) : (
        <button
          className={`btn-base ${accentBg.replace('/10', '')} hover:brightness-110 text-white btn-lg gap-3 w-full sm:w-auto opacity-70 cursor-not-allowed`}
          disabled
        >
          <Download className="w-5 h-5" />
          Download Now
        </button>
      )}
    </div>
  </div>
);

const Downloads: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(DIRECT_DOWNLOAD_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

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

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AppSection
                title="XUM AI"
                tagline="Global Intelligence Platform"
                description="Join the network powering next-generation LLMs and Vision Models. Complete tasks, earn rewards, and help shape the future of AI."
                accent="blue-500"
                accentBg="bg-blue-500/10"
                accentGlow="shadow-blue-500/20"
                icon={<Download className="w-7 h-7 text-blue-400" />}
                directUrl={DIRECT_DOWNLOAD_URL}
                onCopy={handleCopyLink}
                copied={copied}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AppSection
                title="LinguaLink AI"
                tagline="Speak Your Roots"
                description="Preserve and celebrate your linguistic heritage. LinguaLink AI connects you with your native tongue through intelligent language grounding and cultural preservation."
                accent="orange-500"
                accentBg="bg-orange-500/10"
                accentGlow="shadow-orange-500/20"
                icon={<Globe className="w-7 h-7 text-orange-400" />}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;
