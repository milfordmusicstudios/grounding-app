// lib/localStore.ts
// Local-only storage layer (fake backend). Swap later for Supabase without rewriting UI.

type Json = Record<string, any>;

const APP_KEY = "grounding_app_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAppState<T extends Json>(fallback: T): T {
  if (typeof window === "undefined") return fallback; // SSR safe
  return safeParse<T>(localStorage.getItem(APP_KEY), fallback);
}

export function saveAppState<T extends Json>(state: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}

export function resetAppState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(APP_KEY);
}
