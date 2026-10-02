export const SITE_URL = "https://macrosaver.com";
export const SITE_NAME = "MacroSaver";

/**
 * The prior Amazon Associates account (Store ID macrosaver-20) was closed after a rejected
 * reapplication. Claiming active Associate status while inactive is itself a compliance
 * problem, so the exact required disclosure only renders once this flips true for a new or
 * reinstated account. Flip this — and only this — when that happens.
 */
export const AMAZON_ASSOCIATE_ACTIVE = true;

/** GA4 measurement ID. Not secret (visible in page source); override per environment if needed. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-KN7KC11RRV";
