/**
 * XUM Portal — central app/link configuration.
 *
 * Every destination the marketing site hands users off to lives here,
 * so URLs are defined once and overridable per-environment via Vite env.
 */

// The user-facing web app (the "XUM AI" web build; dev server runs on port 3000).
// Set VITE_APP_URL to the deployed web-app domain in production.
export const WEB_APP_URL: string =
    (import.meta as any).env?.VITE_APP_URL || 'http://localhost:3000';

// APK artifacts published via GitHub Releases (built by our GitHub Action)
export const XUM_APK_URL =
    'https://github.com/my-edutu/xum-portal/releases/download/v0.0.1/application-2f91ea1a-7336-4da9-b7b3-4a75beffbdea.apk';

export const LINGUALINK_APK_URL =
    'https://github.com/my-edutu/xum-portal/releases/download/v1.0.0-lingualink/application-7de3731e-6f40-4947-a5ef-04092d21df0d.apk';
