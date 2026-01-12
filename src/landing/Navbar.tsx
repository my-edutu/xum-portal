
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onGetStarted?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link className="flex items-center" to="/">
            <span className="font-black text-2xl tracking-tighter uppercase text-white heading-font">XUM AI</span>
          </Link>
        </div>
        <div className="hidden lg:flex flex-grow justify-center items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <a className="hover:text-blue-500 transition-colors" href="#features">Features</a>
          <a className="hover:text-blue-500 transition-colors" href="#solutions">Solutions</a>
          <a className="hover:text-blue-500 transition-colors" href="#enterprise">Enterprise</a>
          <a className="hover:text-blue-500 transition-colors" href="#faq">FAQ</a>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            to="/auth"
            className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={handleGetStarted}
            className="btn-base btn-primary btn-md"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
