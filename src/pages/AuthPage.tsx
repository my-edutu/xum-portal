import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useUser, SignIn, SignUp, isValidCompanyEmail } from '../context/ClerkProvider';
import { ArrowLeft, Lock, Building2 } from 'lucide-react';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const intent = searchParams.get('intent');
    const { user, isLoaded } = useUser();

    // Determine the correct redirect path based on intent
    const getRedirectPath = () => {
        if (intent === 'admin') return '/admin/dashboard';
        return '/company/dashboard';
    };

    // Check if user is already signed in and redirect appropriately
    useEffect(() => {
        if (isLoaded && user) {
            // Always redirect authenticated users to their dashboard
            // Role-based access is handled by the protected route components
            navigate(getRedirectPath(), { replace: true });
        }
    }, [user, isLoaded, navigate, intent]);

    // If not loaded yet, show loading
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    // If user is already signed in, redirect them (handled in useEffect above)
    // This prevents showing the auth form to already authenticated users
    if (user) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    const isAdmin = intent === 'admin';

    // Determined visual theme
    const themeColor = isAdmin ? 'orange' : 'blue';
    const themeBg = isAdmin ? 'bg-orange-600' : 'bg-blue-600';
    const themeBorder = isAdmin ? 'border-orange-500/50' : 'border-blue-500/50';
    const themeRing = isAdmin ? 'ring-orange-500/10' : 'ring-blue-500/10';
    const themeShadow = isAdmin ? 'shadow-orange-900/20' : 'shadow-blue-900/20';

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Minimal Background */}
            <div className="absolute inset-0 -z-10 bg-[#020617]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] md:bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12)_0%,_transparent_60%)]"></div>
            </div>

            <div className="w-full max-w-[400px] relative z-10">
                {/* Minimal Header */}
                <div className="text-center mb-10 md:mb-12 animate-[fadeIn_0.8s_ease-out]">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 outfit tracking-tight">
                        {isAdmin ? 'Admin Terminal' : 'Business Hub'}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium opacity-80">
                        {isAdmin
                            ? 'Authorized personnel only.'
                            : 'Sign in to your enterprise workstation.'
                        }
                    </p>
                </div>

                {/* Minimal Clerk Auth Card */}
                <div className="animate-[slideInUp_1s_ease-out_0.2s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-4 md:p-6 shadow-2xl backdrop-blur-xl">
                        <SignIn
                            forceRedirectUrl={getRedirectPath()}
                            signUpForceRedirectUrl={getRedirectPath()}
                            appearance={{
                                elements: {
                                    rootBox: 'w-full',
                                    card: 'bg-transparent shadow-none p-4 md:p-6 w-full mx-auto',
                                    header: 'hidden',
                                    headerTitle: 'hidden',
                                    headerSubtitle: 'hidden',
                                    socialButtonsBlockButton: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 h-14 rounded-2xl transition-all',
                                    socialButtonsBlockButtonText: 'text-white font-semibold text-base',
                                    dividerLine: 'bg-white/5',
                                    dividerText: 'text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]',
                                    formFieldLabel: 'text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1',
                                    formFieldInput: `bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:${themeBorder} focus:border-white/20 transition-all text-base px-6`,
                                    formButtonPrimary: `${themeBg} hover:opacity-90 h-14 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl ${themeShadow} active:scale-95`,
                                    footerActionLink: `text-${themeColor}-500 hover:text-${themeColor}-400 font-bold transition-colors`,
                                    footerAction: 'text-slate-500 text-xs py-4',
                                    identityPreviewText: 'text-white font-medium',
                                    identityPreviewEditButton: `text-${themeColor}-500`,
                                    formResendCodeLink: `text-${themeColor}-500`,
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
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .heading-font {
                    font-family: 'Space Grotesk', sans-serif;
                }
                /* Clerk Overrides to remove dev mode banners */
                .cl-internal-ph72j9, .cl-internal-1dauvpw {
                    display: none !important;
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
