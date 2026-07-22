export const COMPARE_LIMIT = 4;

const PRODUCT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,100}$/;

export function sanitizeCompareIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value.filter(
        (id): id is string => typeof id === "string" && PRODUCT_ID_PATTERN.test(id)
      )
    )
  ).slice(0, COMPARE_LIMIT);
}

/**
 * Remove IDs confirmed missing by one catalog lookup without discarding IDs
 * selected after that lookup began.
 */
export function reconcileCompareIds(
  currentIds: readonly string[],
  requestedIds: readonly string[],
  validIds: readonly string[]
): string[] {
  const requested = new Set(requestedIds);
  const valid = new Set(validIds);

  return sanitizeCompareIds(
    currentIds.filter((id) => !requested.has(id) || valid.has(id))
  );
}

export type ComparisonDirection = "min" | "max";

export function getMetricHighlights(
  values: ReadonlyArray<{ id: string; value: number | null }>,
  direction: ComparisonDirection
): { ids: Set<string>; isTie: boolean } {
  const comparableValues = values.filter(
    (entry): entry is { id: string; value: number } =>
      entry.value !== null && Number.isFinite(entry.value)
  );

  if (comparableValues.length < 2) return { ids: new Set(), isTie: false };

  const target =
    direction === "min"
      ? Math.min(...comparableValues.map(({ value }) => value))
      : Math.max(...comparableValues.map(({ value }) => value));
  const ids = new Set(
    comparableValues.filter(({ value }) => value === target).map(({ id }) => id)
  );

  return { ids, isTie: ids.size > 1 };
}
