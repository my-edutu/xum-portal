import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { createMonetizationAdminApi, type MonetizationAdminOverview, type MonetizationAdminDecisions } from '../utils/monetizationAdminService';
import { BadgeCheck, Ban, BookOpen, ChevronRight, CircleAlert, ClipboardCheck, Fingerprint, LockKeyhole, ShieldCheck, Wallet } from 'lucide-react';

type Tab = 'eligibility' | 'qualification' | 'financial' | 'launch' | 'verified';
const RULES = [
  { label: 'Minimum age', value: '18+', description: 'Verified age evidence required' },
  { label: 'Email and phone', value: 'Verified', description: 'Not simply typed into a profile' },
  { label: 'Profile completeness', value: '80%', description: 'Based on an auditable field definition' },
  { label: 'XUM Academy', value: 'Complete', description: 'Training record required' },
  { label: 'Qualification tasks', value: '10', description: 'Unique graded assessments' },
  { label: 'Qualification accuracy', value: '80%', description: 'Based on gold/calibration answers' },
  { label: 'Approved contributions', value: '10', description: 'Validated work, not raw uploads' },
  { label: 'Agreements', value: 'Current versions', description: 'Terms and dataset data-rights consent' },
  { label: 'Integrity', value: 'Clear', description: 'No unresolved serious policy, duplicate or fraud flags' },
] as const;
const LEVELS = [
  { name: 'Trainee', requirement: 'New account', unlocks: 'Learning and qualification tasks' },
  { name: 'Verified Contributor', requirement: 'Complete eligibility assessment', unlocks: 'Paid tasks only after separate activation' },
  { name: 'Trusted Contributor', requirement: '100+ approved tasks, 90%+ quality and clean integrity record', unlocks: 'Higher-trust work and validation' },
  { name: 'XUM Judge', requirement: 'Separate Judge training and calibration', unlocks: 'Preference evaluation and reasoning tasks' },
  { name: 'Domain Expert', requirement: 'Verified credentials + domain assessment', unlocks: 'Expert, domain-specific assignments' },
] as const;
const GATES = [
  { name: 'Clerk identity ↔ Supabase user mapping', note: 'Verify stable subject mapping and legacy UUID ownership in staging' },
  { name: 'Admin-authenticated policy API', note: 'Audit roles and rule publishing; prevent client-side writes' },
  { name: 'Verified qualification evidence', note: 'Trusted training, quality and validation providers only' },
  { name: 'Legacy wallet and dataset-split reconciliation', note: 'One worker obligation must never be credited twice' },
  { name: 'Double-entry financial ledger', note: 'Immutable postings, balanced per currency, concurrency-safe' },
  { name: 'KYC, payout provider sandbox and settlement checks', note: 'Signed webhooks, compensation and reconciliation tests' },
] as const;

const tabs: { key: Tab; label: string }[] = [
  { key: 'eligibility', label: 'Eligibility Rules' },
  { key: 'qualification', label: 'Contributor Levels' },
  { key: 'financial', label: 'Financial Controls' },
  { key: 'launch', label: 'Launch Checklist' },
  { key: 'verified', label: 'Verified Records' },
];

export function MonetizationAdminView() {
  const [active, setActive] = useState<Tab>('eligibility');
  const { getToken, isSignedIn } = useAuth();
  const api = useMemo(() => createMonetizationAdminApi(() => getToken()), [getToken]);
  const [overview, setOverview] = useState<MonetizationAdminOverview | null>(null);
  const [decisions, setDecisions] = useState<MonetizationAdminDecisions | null>(null);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [decisionsError, setDecisionsError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let activeRequest = true;
    if (!isSignedIn || !api) {
      setChecking(false);
      setOverview(null);
      setDecisions(null);
      setOverviewError('Sign in with an authorized Clerk account and configure Supabase.');
      setDecisionsError(null);
      return () => { activeRequest = false; };
    }
    setChecking(true);
    Promise.allSettled([api.getOverview(), api.getRecentDecisions()])
      .then(([policyResponse, decisionResponse]) => {
        if (!activeRequest) return;
        if (policyResponse.status === 'fulfilled') {
          setOverview(policyResponse.value);
          setOverviewError(null);
        } else {
          setOverview(null);
          setOverviewError('Policy API unavailable or access not granted to this account.');
        }
        if (decisionResponse.status === 'fulfilled') {
          setDecisions(decisionResponse.value);
          setDecisionsError(null);
        } else {
          setDecisions(null);
          setDecisionsError('Eligibility review requires a separately granted reviewer permission.');
        }
      })
      .finally(() => { if (activeRequest) setChecking(false); });
    return () => { activeRequest = false; };
  }, [api, isSignedIn]);

  return (
    <section className="space-y-7" aria-label="Monetization administration">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-blue-500/15 p-3 text-blue-400"><ShieldCheck size={23} /></div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[.2em] text-blue-400">XUM contributor program</div>
            <h1 className="outfit text-3xl font-bold text-white mt-1">Monetization</h1>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-400 max-w-3xl">
          Review the proposed qualification rules, contributor levels and financial safety gates.
          This panel is <strong className="text-slate-200">read-only</strong> until verified
          administrator APIs and the production identity mapping are ready.
        </p>
      </header>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-start gap-3" role="status">
        <CircleAlert size={22} className="text-amber-400 shrink-0" aria-hidden />
        <div>
          <h2 className="text-base font-semibold text-amber-200">Not connected to live monetization</h2>
          <p className="text-sm text-slate-300 leading-6 mt-1">
            The V1 policy below is a proposed, versioned baseline in GitHub, not verified live configuration.
            No contributor eligibility counts, wallet liabilities, or payout totals are available through an authorized admin API yet.
            Do not infer that historical withdrawals are disabled by the new Phase 2 safeguards.
          </p>
        </div>
      </div>

      <section aria-label="Live policy connection status" className="rounded-2xl border border-white/10 bg-[#0f172a] p-5 space-y-3">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="text-base font-bold text-white">Verified policy connection</h2>
          <span className={`text-xs font-semibold rounded-full px-3 py-1 ${overview ? 'text-emerald-200 bg-emerald-500/10' : 'text-amber-200 bg-amber-500/10'}`}>
            {checking ? 'Checking server…' : overview ? 'Signed-in access verified' : 'Not connected / not authorized'}
          </span>
        </div>
        {overview ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-400">
              The secured server reported {overview.policies.length} policy version(s).
              This does not indicate permission to activate earnings.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs rounded-lg border border-white/10 px-3 py-2 text-slate-300">
                Identity bridge: {overview.identity_bridge_enabled ? 'Enabled' : 'Off'}
              </span>
              <span className="text-xs rounded-lg border border-white/10 px-3 py-2 text-slate-300">
                Qualification service: {overview.qualification_enabled ? 'Enabled' : 'Off'}
              </span>
              <span className="text-xs rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-200">
                New payout controls: OFF
              </span>
            </div>
            <div className="space-y-2">
              {overview.policies.slice(0, 5).map(p => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 py-2 text-xs text-slate-300">
                  <span className="font-semibold text-white">{p.policy_key}</span>
                  <span>{p.country === '*' ? 'Global' : p.country} · {p.status} · {p.minimum_qualification_tasks} tasks · {p.minimum_qualification_accuracy}% accuracy</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-amber-200" role="status">
            {overviewError ?? 'Loading verified policy versions…'}
            {' '}Proposed values shown below are guidance only, not live settings.
          </p>
        )}
      </section>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Monetized contributors', value: 'Unavailable', icon: BadgeCheck },
          { label: 'Awaiting qualification', value: 'Unavailable', icon: ClipboardCheck },
          { label: 'Outstanding liabilities', value: 'Unavailable', icon: Wallet },
          { label: 'Fraud reviews and holds', value: 'Unavailable', icon: Fingerprint },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{label}</span><Icon size={18} aria-hidden />
            </div>
            <p className="text-lg text-slate-200 font-semibold mt-3">{value}</p>
            <p className="text-xs text-slate-500 mt-1">Requires verified admin reporting</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Monetization sections">
        {tabs.map(tab => (
          <button key={tab.key} role="tab" type="button" aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-3 whitespace-nowrap rounded-xl text-sm font-semibold border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400
              ${active === tab.key ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#0f172a] text-slate-300 border-white/10 hover:bg-slate-800'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'eligibility' && (
        <div className="space-y-4" role="tabpanel">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl text-white outfit font-semibold">Proposed V1 qualification rules</h2>
              <p className="text-xs text-slate-400 mt-1">GitHub draft policy: xum-v1-proposed · Not a published production policy</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200">
              <LockKeyhole size={13} className="mr-1.5" aria-hidden /> Editing disabled
            </span>
          </div>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {RULES.map((rule, i) => (
              <div key={rule.label} className={`grid sm:grid-cols-[1fr_140px] gap-2 p-4 bg-[#0f172a] ${i ? 'border-t border-white/10' : ''}`}>
                <div>
                  <h3 className="text-sm font-semibold text-white">{rule.label}</h3>
                  <p className="text-xs text-slate-400 mt-1">{rule.description}</p>
                </div>
                <div className="sm:text-right text-sm font-semibold text-blue-300">{rule.value}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 leading-6">
            Requirements are evaluated from verified server evidence and reviewed policy versions.
            Any future editing must create a new, effective-dated policy with an administrator audit record.
          </p>
        </div>
      )}

      {active === 'qualification' && (
        <div className="space-y-4" role="tabpanel">
          <h2 className="text-xl text-white outfit font-semibold">Contributor progression</h2>
          <p className="text-sm text-slate-400">Levels do not override payment eligibility. Judge and domain skills require independent assessments.</p>
          <div className="grid lg:grid-cols-2 gap-4">
            {LEVELS.map((level, i) => (
              <article key={level.name} className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Level {i}</span>
                <h3 className="text-lg text-white font-semibold mt-1">{level.name}</h3>
                <p className="text-sm text-slate-300 mt-3">{level.requirement}</p>
                <p className="text-xs text-slate-400 mt-3 flex items-start gap-2">
                  <ChevronRight size={15} className="shrink-0" aria-hidden /> {level.unlocks}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      {active === 'financial' && (
        <div className="space-y-5" role="tabpanel">
          <h2 className="text-xl text-white outfit font-semibold">Financial safeguards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-300"><Ban size={19} /><h3 className="font-semibold">New payout activation locked</h3></div>
              <p className="text-sm text-slate-400 mt-3 leading-6">
                Phase 2 migration includes a database-level interlock for the <strong>new program</strong>.
                This does not confirm production deployment or control historical payout functions.
              </p>
            </div>
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-300"><Wallet size={19} /><h3 className="font-semibold">Proposed NGN withdrawal rail</h3></div>
              <p className="text-2xl font-bold text-white mt-3">₦5,000 <span className="text-xs text-slate-400 font-normal">minimum</span></p>
              <p className="text-sm text-slate-400 mt-2">Bank transfer · disabled in the new migration · not current live wallet policy</p>
            </div>
          </div>
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-white font-semibold"><BookOpen size={19} /><h3>Required before real payouts</h3></div>
            <p className="text-sm text-slate-400 mt-3 leading-6">
              Funded campaign budgets, task-level idempotency, double-entry postings,
              KYC/payment identity, risk holds, verified provider webhooks and settlement reconciliation.
              No controls on this screen can move or reserve money.
            </p>
          </div>
        </div>
      )}

      {active === 'verified' && (
        <div className="space-y-4" role="tabpanel">
          <h2 className="text-xl font-bold text-white outfit">Qualification decision reviews</h2>
          <p className="text-sm text-slate-400">
            Read-only, pseudonymous records from the permissioned backend.
            Account email, phone, payout identity, and raw fraud evidence are not returned here.
          </p>
          {!decisions ? (
            <div role="status" className="border border-amber-500/20 bg-amber-500/10 rounded-2xl p-5 text-sm text-amber-200">
              {checking ? 'Loading verified decisions…' : decisionsError ?? 'Reviewer access is not available.'}
            </div>
          ) : decisions.decisions.length === 0 ? (
            <div className="border border-white/10 bg-[#0f172a] rounded-2xl p-5 text-sm text-slate-400">
              No verified qualification decisions have been recorded through the new program.
            </div>
          ) : (
            <div className="space-y-3">
              {decisions.decisions.map(d => (
                <article key={d.id} className="rounded-xl border border-white/10 bg-[#0f172a] p-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-white">
                      Contributor {d.identity_link_id.slice(0, 8)}…
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold
                      ${d.eligibility === 'eligible' ? 'bg-blue-500/10 text-blue-300' : 'bg-slate-700 text-slate-300'}`}>
                      {d.eligibility === 'eligible' ? 'Eligibility recorded' : 'Not qualified'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Assessed {new Date(d.assessed_at).toLocaleString()}</p>
                  <p className="text-xs text-slate-300">
                    {d.unmet_requirements.length
                      ? `Pending: ${d.unmet_requirements.join(', ')}`
                      : 'All recorded qualification checks passed; payout remains disabled.'}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {active === 'launch' && (
        <div className="space-y-4" role="tabpanel">
          <h2 className="text-xl text-white outfit font-semibold">Integration and launch blockers</h2>
          <p className="text-sm text-slate-400">Items are pending validation in the deployed project; they are not marked complete just because code is merged.</p>
          <div className="rounded-2xl border border-white/10 bg-[#0f172a] divide-y divide-white/10">
            {GATES.map(gate => (
              <div key={gate.name} className="flex gap-3 p-5 items-start">
                <CircleAlert size={19} className="text-amber-400 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold text-white">{gate.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{gate.note}</p>
                </div>
                <span className="ml-auto shrink-0 text-[10px] text-amber-200 bg-amber-500/10 rounded-full px-2 py-1">Pending</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2"><ShieldCheck size={15} aria-hidden /> No user balances or sensitive payment identity are queried on this screen.</p>
        </div>
      )}
    </section>
  );
}
