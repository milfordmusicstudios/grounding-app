"use client";

import { useEffect, useMemo, useState } from "react";
import { AppState, DEFAULT_STATE } from "./appState";
import { loadAppState, saveAppState } from "./localStore";

export function useAppState() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Load once on client
  useEffect(() => {
    const loaded = loadAppState<AppState>(DEFAULT_STATE);
    setState(loaded);
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    saveAppState<AppState>(state);
  }, [state, hydrated]);

  const api = useMemo(() => {
    return {
      hydrated,
      state,
      setState,
      // helper: reset everything (use carefully)
      reset: () => setState(DEFAULT_STATE),
    };
  }, [state, hydrated]);

  return api;
}
