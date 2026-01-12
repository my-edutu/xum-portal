import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useUser, SignIn, SignUp, isValidCompanyEmail } from '../context/ClerkProvider';
import { ArrowLeft, Lock, Building2 } from 'lucide-react';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const intent = searchParams.get('intent');
    const { user, isLoaded } = useUser();

    // Check if user is already signed in and has valid company email
    useEffect(() => {
        if (isLoaded && user) {
            const email = user.primaryEmailAddress?.emailAddress || '';
            if (isValidCompanyEmail(email)) {
                navigate('/dashboard');
            }
        }
    }, [user, isLoaded, navigate]);

    // If not loaded yet, show loading
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    // If user is signed in but doesn't have valid company email
    if (user) {
        const email = user.primaryEmailAddress?.emailAddress || '';
        if (!isValidCompanyEmail(email)) {
            return (
                <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
                    <div className="w-full max-w-md text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Lock className="text-red-500/80" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-4">Verification Required</h1>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Access to the XUM Business platform is currently restricted to <span className="text-blue-500 font-bold">@xumai.app</span> collaborators.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Identified As</p>
                            <p className="text-sm text-white font-medium">{email}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-base btn-primary btn-md w-full"
                            >
                                Try Another Account
                            </button>
                            <Link
                                to="/"
                                className="btn-base btn-secondary btn-md w-full"
                            >
                                Back to Landing
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Minimal Background with User Image */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
                <img
                    src="/assets/animated-bg.jpg"
                    className="w-full h-full object-cover animate-[slow-zoom_30s_ease-in-out_infinite]"
                    alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
            </div>

            <div className="w-full max-w-[400px] relative z-10">
                {/* Minimal Header */}
                <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building2 className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white heading-font uppercase">XUM AI</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
                    <p className="text-slate-500 text-sm font-medium">
                        {intent === 'datasets'
                            ? 'Sign in to access premium AI datasets.'
                            : 'Sign in to your enterprise workstation.'
                        }
                    </p>
                </div>

                {/* Minimal Clerk Auth Card */}
                <div className="animate-[fadeIn_1s_ease-out_0.2s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-2 shadow-2xl overflow-hidden">
                        <SignIn
                            appearance={{
                                elements: {
                                    rootBox: 'w-full',
                                    card: 'bg-transparent shadow-none p-6 md:p-8',
                                    headerTitle: 'hidden',
                                    headerSubtitle: 'hidden',
                                    socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl transition-all',
                                    socialButtonsBlockButtonText: 'text-white font-semibold text-sm',
                                    dividerLine: 'bg-white/5',
                                    dividerText: 'text-slate-600 text-[10px] font-bold uppercase tracking-widest',
                                    formFieldLabel: 'text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5',
                                    formFieldInput: 'bg-white/[0.03] border-white/10 text-white placeholder:text-slate-700 h-12 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm',
                                    formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 h-12 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20',
                                    footerActionLink: 'text-blue-500 hover:text-blue-400 font-bold transition-colors',
                                    footerAction: 'text-slate-500 text-xs',
                                    identityPreviewText: 'text-white font-medium',
                                    identityPreviewEditButton: 'text-blue-500',
                                    formResendCodeLink: 'text-blue-500',
                                    otpCodeFieldInput: 'bg-white/[0.03] border-white/10 text-white rounded-xl'
                                },
                                layout: {
                                    socialButtonsPlacement: 'bottom',
                                    showOptionalFields: false
                                }
                            }}
                            routing="hash"
                        />
                    </div>
                </div>

                {/* Minimal Footer Links */}
                <div className="mt-12 flex items-center justify-between px-2 animate-[fadeIn_1s_ease-out_0.4s_forwards] opacity-0">
                    <Link to="/" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>
                    <div className="flex gap-4">
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Support</a>
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slow-zoom {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .heading-font {
                    font-family: 'Space Grotesk', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
