/**
 * Admin Panel Component
 * 
 * This is a simplified admin panel embedded within the company portal.
 * Admin access is restricted to @xumai.app email addresses only.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, SignIn, isValidCompanyEmail } from '../context/ClerkProvider';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    Wallet,
    Settings,
    LogOut,
    ShieldAlert,
    ArrowLeft,
    Lock
} from 'lucide-react';

// Admin-only email domains
const ADMIN_DOMAINS = ['xumai.app'];

const isAdminEmail = (email: string): boolean => {
    if (!email) return false;
    const domain = email.split('@')[1]?.toLowerCase();
    return ADMIN_DOMAINS.includes(domain);
};

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const [activeView, setActiveView] = useState('overview');

    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
    const hasAdminAccess = isAdminEmail(userEmail);

    // If not loaded, show loading
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-bold">Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    // If not signed in, show sign in form
    if (!user) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">
                            XUM <span className="text-orange-500">Admin</span>
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Restricted to @xumai.app email addresses
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-2 overflow-hidden shadow-2xl">
                        <SignIn
                            appearance={{
                                elements: {
                                    rootBox: 'w-full',
                                    card: 'bg-transparent shadow-none p-6 md:p-8',
                                    headerTitle: 'hidden',
                                    headerSubtitle: 'hidden',
                                    socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10 h-10 rounded-xl transition-all',
                                    socialButtonsBlockButtonText: 'text-white font-semibold text-xs',
                                    dividerLine: 'bg-white/5',
                                    dividerText: 'text-slate-600 text-[10px] font-bold uppercase tracking-widest',
                                    formFieldLabel: 'text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5',
                                    formFieldInput: 'bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-10 rounded-xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm',
                                    formButtonPrimary: 'bg-orange-600 hover:bg-orange-500 h-10 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-900/20',
                                    footerActionLink: 'text-orange-500 hover:text-orange-400 font-bold transition-colors',
                                    footerAction: 'text-slate-500 text-xs',
                                    identityPreviewText: 'text-white font-medium',
                                    identityPreviewEditButton: 'text-orange-500',
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // If signed in but not admin email, show access denied
    if (!hasAdminAccess) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <Lock className="text-red-500" size={36} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Admin access is restricted to <span className="text-orange-500 font-bold">@xumai.app</span> email addresses.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-left">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Signed In As</p>
                        <p className="text-sm text-white font-medium truncate">{userEmail}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-base btn-orange btn-md w-full sm:w-auto"
                        >
                            Different Account
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="btn-base btn-secondary btn-md w-full sm:w-auto"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="flex min-h-screen bg-[#020617] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f172a] border-r border-white/5 fixed inset-y-0 left-0 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-black text-lg">X</div>
                        <div>
                            <span className="block font-bold text-lg tracking-tight">XUM Admin</span>
                            <span className="block text-[9px] font-bold text-orange-500 uppercase tracking-widest">Control Panel</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <AdminNavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Overview"
                        active={activeView === 'overview'}
                        onClick={() => setActiveView('overview')}
                    />
                    <AdminNavItem
                        icon={<Users size={20} />}
                        label="Users"
                        active={activeView === 'users'}
                        onClick={() => setActiveView('users')}
                    />
                    <AdminNavItem
                        icon={<ClipboardList size={20} />}
                        label="Tasks"
                        active={activeView === 'tasks'}
                        onClick={() => setActiveView('tasks')}
                    />
                    <AdminNavItem
                        icon={<Wallet size={20} />}
                        label="Payouts"
                        active={activeView === 'payouts'}
                        onClick={() => setActiveView('payouts')}
                    />
                    <AdminNavItem
                        icon={<ShieldAlert size={20} />}
                        label="Moderation"
                        active={activeView === 'moderation'}
                        onClick={() => setActiveView('moderation')}
                    />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl">
                        <img
                            src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{user.fullName}</p>
                            <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-bold">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <AdminContent view={activeView} />
            </main>
        </div>
    );
};

const AdminNavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
            ? 'bg-orange-500/10 text-orange-500 font-bold'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);

const AdminContent: React.FC<{ view: string }> = ({ view }) => {
    switch (view) {
        case 'overview':
            return (
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard label="Total Users" value="12,450" color="blue" />
                        <StatCard label="Active Tasks" value="842" color="green" />
                        <StatCard label="Pending Payouts" value="156" color="orange" />
                        <StatCard label="Revenue (24h)" value="$4,280" color="purple" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <p className="text-slate-400">Activity feed will appear here...</p>
                    </div>
                </div>
            );
        case 'users':
            return (
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-slate-400">User management interface coming soon...</p>
                    </div>
                </div>
            );
        default:
            return (
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold capitalize">{view}</h1>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-slate-400">This section is under development...</p>
                    </div>
                </div>
            );
    }
};

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => {
    const colorClasses: Record<string, string> = {
        blue: 'border-l-blue-500 bg-blue-500/5',
        green: 'border-l-emerald-500 bg-emerald-500/5',
        orange: 'border-l-orange-500 bg-orange-500/5',
        purple: 'border-l-purple-500 bg-purple-500/5',
    };

    return (
        <div className={`bg-white/5 border border-white/10 border-l-4 ${colorClasses[color]} rounded-2xl p-6`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
            <p className="text-3xl font-black">{value}</p>
        </div>
    );
};

export default AdminPanel;
