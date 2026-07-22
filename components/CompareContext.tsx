"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  COMPARE_LIMIT,
  reconcileCompareIds,
  sanitizeCompareIds,
} from "@/lib/compare";

const STORAGE_KEY = "macrosaver:compare";
export { COMPARE_LIMIT } from "@/lib/compare";

type CompareContextValue = {
  ids: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  reconcile: (requestedIds: readonly string[], validIds: readonly string[]) => void;
  isFull: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

const listeners = new Set<() => void>();
let cachedIds: string[] = [];
let cachedRaw: string | null = null;
let storageUnavailable = false;

function readIds(): string[] {
  if (storageUnavailable) return cachedIds;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    storageUnavailable = true;
    return cachedIds;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cachedIds = sanitizeCompareIds(parsed);
    } catch {
      cachedIds = [];
    }
  }
  return cachedIds;
}

function writeIds(ids: string[]) {
  cachedIds = sanitizeCompareIds(ids);
  cachedRaw = JSON.stringify(cachedIds);
  if (!storageUnavailable) {
    try {
      window.localStorage.setItem(STORAGE_KEY, cachedRaw);
    } catch {
      // Keep compare usable in memory when storage is denied or full.
      storageUnavailable = true;
    }
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

  const reconcile = useCallback(
    (requestedIds: readonly string[], validIds: readonly string[]) => {
      const current = readIds();
      const next = reconcileCompareIds(current, requestedIds, validIds);
      if (next.length !== current.length || next.some((id, index) => id !== current[index])) {
        writeIds(next);
      }
    },
    []
  );

  const value: CompareContextValue = {
    ids,
    isSelected: (id: string) => ids.includes(id),
    toggle,
    remove,
    clear,
    reconcile,
    isFull: ids.length >= COMPARE_LIMIT,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
