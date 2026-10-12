# Standalone admin.xumai.app — Dokploy deployment

The admin UI is in `AdminPanel/` of the public
`my-edutu/xum-portal` repository. This is **not** the contributor
`xumai/xum_ai_app` application. The main portal also imports this UI
at `/admin`, but this configuration deploys it independently at `/`.

## 1. Fix the *source-provider* problem first

`Github Provider not found` is emitted by Dokploy **before cloning or
building this repository**. It cannot be resolved by a code change.

In Dokploy, use **Git** (not **GitHub**) for this public repo:

- HTTPS URL: `https://github.com/my-edutu/xum-portal.git`
- Branch: `main` (or the PR branch while testing)
- Build Path: `/AdminPanel`
- Save the source settings.

If the existing Dokploy application still reports the missing GitHub
provider after changing sources, make a **new Dokploy Application** using
the Git provider. The existing app may reference a deleted provider ID.
Keep the old app until the new deployment has been tested.

## 2. Build configuration

- Build Type: **Dockerfile**
- Dockerfile path: `Dockerfile`
- Docker context: `.` (relative to the `/AdminPanel` build path)
- Docker build stage: leave empty (use the final nginx stage).
- Container/domain port: **80**
- No runtime start command; nginx serves the built SPA.

In **Environment → Build Time Arguments**, supply the following **public
frontend** values from the production Supabase and Clerk dashboards:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_REAL_PUBLISHABLE_KEY
```

Vite embeds these variables into the browser bundle at **build time**;
adding them only as runtime container environment variables is not enough.
Never put Clerk secret keys, Supabase service-role keys, or Resend API
keys in any `VITE_*` variable.

## 3. Verify before routing the real domain

1. Deploy using a temporary hostname in Dokploy.
2. Confirm `/healthz` returns `ok` and `/` shows the admin sign-in UI.
3. Sign in with an authorized Clerk account and verify that a non-admin
   cannot access administrative data or operations.
4. Confirm Supabase RLS/server-side checks protect all sensitive tables
   and actions. Frontend admin checks do **not** replace server authorization.
5. Configure `admin.xumai.app` in the Dokploy Domains tab with container
   port **80**, then point DNS to the Dokploy server and enable HTTPS.
   Remove conflicting domain routes on the old application.

For troubleshooting separate:
- `Github Provider not found`: Dokploy source-provider configuration.
- Clone failures: Git URL/network/access.
- Build failures: npm/TypeScript or missing build-time arguments.
- Page opens, sign-in fails: Clerk domain/key/config.
- Sign-in succeeds, admin is denied: admin role/RLS authorization.
