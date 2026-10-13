import { useState } from 'react';
import { CheckCircle2, CircleAlert, ShieldCheck } from 'lucide-react';
import type { createMonetizationAdminApi, MonetizationAdminOverview } from '../utils/monetizationAdminService';

type Api = NonNullable<ReturnType<typeof createMonetizationAdminApi>>;
interface Props { api: Api | null; overview: MonetizationAdminOverview | null; onActivated: () => void; }

export function QualificationActivationPanel({ api, overview, onActivated }: Props) {
  const [requestId, setRequestId] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const alreadyActive = overview?.qualification_enabled === true;

  const requestActivation = async () => {
    if (!api || busy || alreadyActive) return;
    setBusy(true); setNotice(null);
    try {
      const id = await api.requestQualificationActivation(`qualification-start-${crypto.randomUUID()}`);
      setRequestId(id);
      setNotice('Activation request recorded. A different authorized reviewer must approve this request.');
    } catch {
      setNotice('Activation request denied. Confirm the account has the policy_publish grant and the new backend has been deployed.');
    } finally { setBusy(false); }
  };

  const confirmActivation = async () => {
    if (!api || busy || alreadyActive) return;
    if (!/^[a-f0-9-]{36}$/i.test(requestId.trim())) {
      setNotice('Enter a valid request ID issued to the initiating reviewer.');
      return;
    }
    setBusy(true); setNotice(null);
    try {
      await api.confirmQualificationActivation(requestId.trim());
      setNotice('The server confirmed that qualification is active. Earnings and withdrawals remain locked.');
      onActivated();
    } catch {
      setNotice('Approval denied. It requires an independent reviewer with the eligibility_review grant, an active published policy, and at least ten approved test questions.');
    } finally { setBusy(false); }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f172a] p-5 space-y-4"
      aria-label="Qualification activation review">
      <div className="flex items-start gap-3">
        <ShieldCheck size={22} className="text-blue-300 shrink-0" aria-hidden />
        <div>
          <h3 className="text-base font-bold text-white">Qualification assessment activation</h3>
          <p className="text-sm text-slate-400 mt-1 leading-6">
            Separate approval is required to open secure, graded qualification tasks.
            Neither approval step can enable earnings, bank transfers or withdrawals.
            The question bank must contain at least ten privately reviewed, active questions.
          </p>
        </div>
      </div>
      {alreadyActive ? (
        <p className="flex items-center gap-2 text-sm text-emerald-300">
          <CheckCircle2 size={18}/> The backend reports qualification assessments are active.
          Withdrawals remain locked.
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-900/80 border border-white/10 p-4 space-y-3">
            <h4 className="font-semibold text-sm text-white">1. Request activation</h4>
            <p className="text-xs text-slate-400">An operator with policy_publish requests activation and shares the request ID with a separate reviewer.</p>
            <button type="button" disabled={!api || !overview || busy} onClick={() => void requestActivation()}
              className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50">
              {busy ? 'Working…' : 'Request qualification activation'}
            </button>
          </div>
          <div className="rounded-xl bg-slate-900/80 border border-white/10 p-4 space-y-3">
            <h4 className="font-semibold text-sm text-white">2. Independent approval</h4>
            <label htmlFor="qualification-request-id" className="text-xs text-slate-400">
              Activation request ID
            </label>
            <input id="qualification-request-id" value={requestId} onChange={e => setRequestId(e.target.value)}
              placeholder="UUID from first reviewer" autoComplete="off"
              className="w-full rounded-lg border border-white/20 bg-[#111827] text-white px-3 py-2 text-sm" />
            <button type="button" disabled={!api || !overview || busy} onClick={() => void confirmActivation()}
              className="rounded-lg border border-blue-500 text-blue-200 px-4 py-2 text-sm font-semibold disabled:opacity-50">
              Approve qualification only
            </button>
          </div>
        </div>
      )}
      {notice && (
        <p role="status" className="flex items-start gap-2 text-xs text-amber-200 leading-5">
          <CircleAlert size={16} className="shrink-0" aria-hidden /> {notice}
        </p>
      )}
      <p className="text-xs text-slate-500">
        Offline, unverified project, unprovisioned operator, missing question bank or unavailable backend:
        activation will fail closed. No financial features are changed.
      </p>
    </section>
  );
}
