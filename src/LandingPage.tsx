import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Marquee from './landing/Marquee';
import Features from './landing/Features';
import PlatformSections from './landing/PlatformSections';
import CallToAction from './landing/CallToAction';
import FAQ from './landing/FAQ';
import Testimonials from './landing/Testimonials';
import Footer from './landing/Footer';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
};

const StatCounter = ({ value, label }: { value: string, label: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const target = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[\d]/g, '');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const duration = 2000;
                const startTime = performance.now();

                const animate = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    setDisplayValue(Math.floor(progress * target));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div ref={ref} className="text-center group">
            <div className="text-2xl md:text-3xl font-semibold mb-1 heading-font text-white group-hover:text-blue-400 transition-colors">
                {displayValue}{suffix}
            </div>
            <div className="text-xs font-medium tracking-tight text-slate-500">
                {label}
            </div>
        </div>
    );
};

interface LandingPageProps {
    onAdminClick?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAdminClick }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/downloads');
    };

    const handleAdminClick = () => {
        if (onAdminClick) {
            onAdminClick();
        } else {
            navigate('/auth?intent=admin');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617]/50 selection:bg-blue-600/30">
            <Navbar onGetStarted={handleGetStarted} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Hero onGetStarted={handleGetStarted} />
            </motion.div>

            <motion.div {...fadeUp}>
                <Marquee />
            </motion.div>

            {/* LinguaLink AI Section */}
            <motion.div
                {...fadeUp}
                className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 border-y border-orange-200"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.15),transparent_60%)]"></div>
                <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                                New App
                            </span>
                            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
                                LinguaLink <span className="text-orange-500">AI</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-2">
                                Speak Your Roots
                            </p>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Preserve and celebrate your linguistic heritage. Connect with your native tongue through intelligent language grounding and cultural preservation.
                            </p>
                            <button
                                onClick={handleGetStarted}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 text-base"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="shrink-0">
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-orange-500/30">
                                <span className="text-6xl md:text-7xl font-black text-white tracking-tight">L</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Network in Motion Stats */}
            <motion.div
                {...fadeUp}
                className="py-12 md:py-16 border-t border-white/5 relative overflow-hidden"
            >
                <div className="container max-w-6xl mx-auto px-6 relative z-10">
                    <h2 className="text-center text-sm font-semibold text-blue-500/80 mb-8 md:mb-12 tracking-tight">Live ecosystem activity.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCounter value="50K+" label="Active Creators" />
                        <StatCounter value="12M+" label="Data Points" />
                        <StatCounter value="99%" label="Accuracy Rate" />
                        <StatCounter value="2M+" label="Total Rewards" />
                    </div>
                </div>
            </motion.div>

            <motion.div id="features" {...fadeUp}>
                <Features />
            </motion.div>

            <motion.div id="ecosystem" {...fadeUp}>
                <PlatformSections />
            </motion.div>

            <motion.div {...fadeUp}>
                <Testimonials />
            </motion.div>

            <motion.div {...fadeUp}>
                <CallToAction />
            </motion.div>

            <motion.div {...fadeUp}>
                <FAQ />
            </motion.div>

            <Footer onAdminClick={handleAdminClick} />
        </div>
    );
};

export default LandingPage;
