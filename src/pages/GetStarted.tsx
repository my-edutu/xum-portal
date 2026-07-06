import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Smartphone, ArrowRight, Download, Languages } from 'lucide-react';
import { WEB_APP_URL, XUM_APK_URL } from '../config';

/**
 * Get Started — the single entry point for new users.
 * Every user chooses one of two paths:
 *   1. Sign in online  → the XUM AI web app
 *   2. Download the APK → native Android app
 */
const GetStarted: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute inset-0 -z-10 bg-[#020617]">
                <div className="absolute top-[-150px] left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
            </div>

            <div className="w-full max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="font-black text-xl tracking-tighter uppercase text-white heading-font">XUM AI</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 tracking-tighter">
                        How do you want to start?
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
                        Use XUM AI right in your browser, or install the Android app — same account, same rewards.
                    </p>
                </motion.div>

                {/* The two paths */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Path 1: Web app */}
                    <motion.a
                        href={WEB_APP_URL}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="group bg-white/[0.03] border border-white/10 hover:border-blue-500/50 rounded-3xl p-8 md:p-10 text-left transition-all hover:bg-white/[0.06] hover:-translate-y-1 cursor-pointer block"
                    >
                        <div className="w-14 h-14 bg-blue-600/15 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <Globe className="text-blue-500" size={26} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Sign in online</h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Open the XUM AI web app in your browser. No install needed — works on any device.
                        </p>
                        <span className="inline-flex items-center gap-2 text-blue-500 font-bold text-sm group-hover:gap-3 transition-all">
                            Launch Web App <ArrowRight size={16} />
                        </span>
                    </motion.a>

                    {/* Path 2: APK download */}
                    <motion.a
                        href={XUM_APK_URL}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="group bg-white/[0.03] border border-white/10 hover:border-orange-500/50 rounded-3xl p-8 md:p-10 text-left transition-all hover:bg-white/[0.06] hover:-translate-y-1 cursor-pointer block"
                    >
                        <div className="w-14 h-14 bg-orange-600/15 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <Smartphone className="text-orange-500" size={26} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Download the app</h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Get the native Android app (APK) for the full experience — camera tasks, voice recording, and offline support.
                        </p>
                        <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm group-hover:gap-3 transition-all">
                            Download APK <Download size={16} />
                        </span>
                    </motion.a>
                </div>

                {/* Secondary links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <Link to="/" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => navigate('/lingualink')}
                        className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                        <Languages size={14} />
                        Looking for LinguaLink AI?
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default GetStarted;
