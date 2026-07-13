"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "macrosaver:compare";
export const COMPARE_LIMIT = 4;

type CompareContextValue = {
  ids: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isFull: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

const listeners = new Set<() => void>();
let cachedIds: string[] = [];
let cachedRaw: string | null = null;

function readIds(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedIds = raw ? JSON.parse(raw) : [];
    } catch {
      cachedIds = [];
    }
  }
  return cachedIds;
}

function writeIds(ids: string[]) {
  cachedIds = ids;
  cachedRaw = JSON.stringify(ids);
  try {
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // ignore write failures (e.g. private browsing quota)
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const EMPTY_IDS: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY_IDS;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const ids = useSyncExternalStore(subscribe, readIds, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = readIds();
    if (current.includes(id)) {
      writeIds(current.filter((existing) => existing !== id));
    } else if (current.length < COMPARE_LIMIT) {
      writeIds([...current, id]);
    }
  }, []);

  const remove = useCallback((id: string) => {
    writeIds(readIds().filter((existing) => existing !== id));
  }, []);

  const clear = useCallback(() => writeIds([]), []);

  const value: CompareContextValue = {
    ids,
    isSelected: (id: string) => ids.includes(id),
    toggle,
    remove,
    clear,
    isFull: ids.length >= COMPARE_LIMIT,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
