
import React from 'react';

const Features: React.FC = () => {
  const featureImageUrl = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80';

  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_45%)] pointer-events-none" />
      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-28">
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-tight mb-6 capitalize">
              The XUM difference
            </div>
            <h2 className="text-section-mobile md:text-section-desktop font-bold mb-6 leading-tight text-white">AI built on human truth.</h2>
            <p className="text-slate-300 text-body-base mb-8 leading-relaxed max-w-xl">
              Most AI models struggle because their data is messy. We fix that by having real humans verify every piece of information before your AI ever sees it. No guesses, just facts.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/10">
                  <span className="material-symbols-outlined text-blue-500 text-xl">fact_check</span>
                </div>
                <div>
                  <h4 className="font-bold text-subheading-mobile md:text-subheading-desktop mb-1 text-white">Human-Verified Quality</h4>
                  <p className="text-slate-400 text-small-base">Real people cross-check data to remove bias and mistakes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/10">
                  <span className="material-symbols-outlined text-blue-500 text-xl">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold text-subheading-mobile md:text-subheading-desktop mb-1 text-white">Ultra-Fast Delivery</h4>
                  <p className="text-slate-400 text-small-base">Get thousands of high-quality inputs in hours, not weeks.</p>
                </div>
              </div>
            </div>
            <button className="btn-base btn-secondary !px-6 !py-3 text-small-base">
              See the Quality Process
            </button>
          </div>
          <div className="relative aspect-square max-w-lg mx-auto w-full rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)] bg-slate-900">
            <img
              src={featureImageUrl}
              alt="Team collaborating on verified data"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-transparent to-blue-400/10 pointer-events-none" />
            <div className="absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 border-t border-white/5">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 heading-font tracking-tight text-white">simple steps to better data.</h2>
            <p className="text-slate-400 text-base md:text-lg">A straightforward process to turn human insight into machine performance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl">
            {[
              {
                icon: "person_add",
                title: "Join the Network",
                desc: "Experts sign up and take a skill test to ensure they are high-quality contributors.",
                cardClass: "bg-gradient-to-br from-blue-500/10 via-slate-900 to-blue-500/5 border-blue-500/20 hover:border-blue-400/40",
                badgeClass: "bg-blue-500/10 border-blue-500/20",
                iconClass: "text-blue-400",
              },
              {
                icon: "assignment",
                title: "Task Matching",
                desc: "Our system sends data tasks to the people best suited to solve them based on expertise.",
                cardClass: "bg-gradient-to-br from-emerald-500/10 via-slate-900 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40",
                badgeClass: "bg-emerald-500/10 border-emerald-500/20",
                iconClass: "text-emerald-400",
              },
              {
                icon: "group",
                title: "Human Consensus",
                desc: "Every task is checked by multiple people. Only when they all agree is the data approved.",
                cardClass: "bg-gradient-to-br from-violet-500/10 via-slate-900 to-violet-500/5 border-violet-500/20 hover:border-violet-400/40",
                badgeClass: "bg-violet-500/10 border-violet-500/20",
                iconClass: "text-violet-400",
              },
              {
                icon: "api",
                title: "Instant Access",
                desc: "The verified, cleaned data is delivered directly to your AI via our high-speed API.",
                cardClass: "bg-gradient-to-br from-amber-500/10 via-slate-900 to-amber-500/5 border-amber-500/20 hover:border-amber-400/40",
                badgeClass: "bg-amber-500/10 border-amber-500/20",
                iconClass: "text-amber-400",
              }
            ].map((s, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border transition-all group shadow-sm ${s.cardClass}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border ${s.badgeClass}`}>
                  <span className={`material-symbols-outlined ${s.iconClass}`}>{s.icon}</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2 heading-font">{s.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
