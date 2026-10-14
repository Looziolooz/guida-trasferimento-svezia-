"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * localStorage e l'attributo data-theme sono sistemi esterni a React:
 * si leggono con useSyncExternalStore, non con setState dentro un effect.
 */

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribeStorage(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Cache per snapshot: useSyncExternalStore vuole un riferimento stabile. */
const snapshots = new Map<string, { raw: string | null; value: unknown }>();

function readStored<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    raw = null;
  }

  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  snapshots.set(key, { raw, value });
  return value;
}

/**
 * Stato persistito nel browser di chi legge. `fallback` deve essere una
 * costante a livello di modulo: è anche lo snapshot usato in SSR.
 */
export function useStoredState<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    subscribeStorage,
    () => readStored(key, fallback),
    () => fallback,
  );

  const setValue = useCallback(
    (next: T) => {
      let raw: string | null = null;
      try {
        raw = JSON.stringify(next);
        localStorage.setItem(key, raw);
      } catch {
        /* modalità privata o storage pieno: si resta in memoria */
      }
      snapshots.set(key, { raw, value: next });
      emit();
    },
    [key],
  );

  return [value, setValue] as const;
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/**
 * Quanta pagina è stata percorsa, in centesimi interi. Intero di proposito:
 * useSyncExternalStore ridisegna a ogni cambio di snapshot, e un numero con
 * i decimali cambierebbe a ogni pixel.
 */
function readProgress(): number {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return 0;
  return Math.round((el.scrollTop / max) * 100);
}

/** Lo scorrimento è un sistema esterno a React, come localStorage. */
export function useScrollProgress(): number {
  return useSyncExternalStore(subscribeScroll, readProgress, () => 0);
}

export type Theme = "light" | "dark";

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Il tema vive sull'attributo data-theme, scritto prima della prima pittura. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light" as Theme);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ip-theme", next);
    } catch {
      /* il tema resta solo per questa visita */
    }
  }, []);

  return [theme, setTheme] as const;
}
