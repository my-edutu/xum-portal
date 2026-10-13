import { createClient } from '@supabase/supabase-js';

/**
 * Separate, Clerk-authenticated Supabase client for new monetization admin RPCs.
 * Do not use a service-role key in a browser, and do not authorize by email.
 * The restricted SQL functions independently verify the signed Clerk subject
 * against operator-provisioned grants on the database.
 */
export interface PolicySummary {
  id: string;
  policy_key: string;
  country: string;
  status: 'draft' | 'published';
  minimum_age: number;
  minimum_profile_percent: number;
  minimum_qualification_tasks: number;
  minimum_qualification_accuracy: number;
  minimum_approved_contributions: number;
  require_email_verification: boolean;
  require_phone_verification: boolean;
  require_academy: boolean;
  terms_version: string;
  dataset_license_version: string;
  effective_at: string | null;
  created_at: string;
  created_by: string | null;
}
export type PolicyProposal = Pick<PolicySummary,
 'policy_key' | 'country' | 'minimum_age' | 'minimum_profile_percent' |
 'minimum_qualification_tasks' | 'minimum_qualification_accuracy' |
 'minimum_approved_contributions' | 'require_email_verification' |
 'require_phone_verification' | 'require_academy' | 'terms_version' |
 'dataset_license_version'>;
export interface MonetizationAdminOverview {
  read_only: boolean;
  identity_bridge_enabled: boolean;
  qualification_enabled: boolean;
  earnings_enabled: boolean;
  withdrawals_enabled: boolean;
  policies: PolicySummary[];
}
export interface QualificationDecision {
  id: string;
  identity_link_id: string;
  policy_version_id: string;
  eligibility: 'eligible' | 'not_monetized';
  unmet_requirements: string[];
  assessed_at: string;
}
export interface MonetizationAdminDecisions {
  read_only: boolean;
  can_withdraw: false;
  decisions: QualificationDecision[];
}
export interface PolicyMutationResult {
  policy_id: string;
  status: 'draft' | 'published';
  effective_at?: string;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function parseOverview(value: unknown): MonetizationAdminOverview {
  if (!isRecord(value) || !Array.isArray(value.policies) ||
      typeof value.identity_bridge_enabled !== 'boolean' ||
      typeof value.qualification_enabled !== 'boolean' ||
      value.earnings_enabled !== false || value.withdrawals_enabled !== false) {
    throw new Error('Unexpected monetization administration response.');
  }
  return {
    read_only: true,
    identity_bridge_enabled: value.identity_bridge_enabled,
    qualification_enabled: value.qualification_enabled,
    earnings_enabled: false, withdrawals_enabled: false,
    policies: value.policies.filter(isRecord).map(item => item as unknown as PolicySummary),
  };
}

function parseDecisions(value: unknown): MonetizationAdminDecisions {
  if (!isRecord(value) || !Array.isArray(value.decisions) || value.can_withdraw !== false) {
    throw new Error('Unexpected eligibility review response.');
  }
  return {
    read_only: true, can_withdraw: false,
    decisions: value.decisions.filter(isRecord).map(item => item as unknown as QualificationDecision),
  };
}

/** Re-created when Clerk's token supplier changes; never caches a user's JWT. */
export function createMonetizationAdminApi(getToken: () => Promise<string | null>) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith('https://')) return null;
  const client = createClient(url, key, {
    accessToken: async () => getToken(),
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return {
    async getOverview(): Promise<MonetizationAdminOverview> {
      const { data, error } = await client.rpc('admin_monetization_policy_overview_v1');
      if (error) throw new Error(error.message || 'Unable to load policy versions.');
      return parseOverview(data);
    },
    async getRecentDecisions(limit = 20): Promise<MonetizationAdminDecisions> {
      const { data, error } = await client.rpc('admin_recent_eligibility_decisions_v1',
        { p_limit: Math.max(1, Math.min(50, Math.floor(limit))) });
      if (error) throw new Error(error.message || 'Unable to load qualification reviews.');
      return parseDecisions(data);
    },
    /** Two-person activation: this only opens training assessments, not earnings. */
    async requestQualificationActivation(requestKey: string): Promise<string> {
      const { data, error } = await client.rpc('admin_request_qualification_activation_v1', {
        p_request_key: requestKey,
      });
      if (error) throw new Error(error.message || 'Unable to request qualification activation.');
      if (!isRecord(data) || data.state !== 'pending_second_review' ||
          typeof data.request_id !== 'string') {
        throw new Error('Unexpected qualification activation response.');
      }
      return data.request_id;
    },
    /** Independent reviewer required. The backend enforces different actors. */
    async confirmQualificationActivation(requestId: string): Promise<boolean> {
      const { data, error } = await client.rpc('admin_confirm_qualification_activation_v1', {
        p_request_id: requestId,
      });
      if (error) throw new Error(error.message || 'Qualification activation denied.');
      if (!isRecord(data) || data.state !== 'qualification_active' ||
          data.earnings_enabled !== false || data.withdrawals_enabled !== false) {
        throw new Error('Activation response did not preserve financial locks.');
      }
      return true;
    },
    /** For verified operators only. API always requires independently granted role. */
    async proposeDraft(proposal: PolicyProposal, requestKey: string): Promise<PolicyMutationResult> {
      const { data, error } = await client.rpc('admin_propose_monetization_policy_v1',
        { p_proposal: proposal, p_request_key: requestKey });
      if (error) throw new Error(error.message || 'Draft proposal rejected.');
      if (!isRecord(data) || data.status !== 'draft' || typeof data.policy_id !== 'string') {
        throw new Error('Malformed policy draft confirmation.');
      }
      return { policy_id: data.policy_id, status: 'draft' };
    },
    /** Approval must come from a separate grant-holding reviewer. */
    async publishDraft(draftId: string, requestKey: string, effectiveAt: string): Promise<PolicyMutationResult> {
      const { data, error } = await client.rpc('admin_publish_monetization_policy_v1',
        { p_draft_id: draftId, p_request_key: requestKey, p_effective_at: effectiveAt });
      if (error) throw new Error(error.message || 'Publication rejected.');
      if (!isRecord(data) || data.status !== 'published' || typeof data.policy_id !== 'string') {
        throw new Error('Malformed policy approval confirmation.');
      }
      return { policy_id: data.policy_id, status: 'published',
        effective_at: typeof data.effective_at === 'string' ? data.effective_at : undefined };
    },
  };
}
