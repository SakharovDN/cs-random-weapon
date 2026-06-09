import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

export const LOCALE_STORAGE_KEY = "cs-random-weapon:locale";

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const language = navigator.language.toLowerCase();
  if (language.startsWith("ru")) return "ru";
  return DEFAULT_LOCALE;
}

export function loadStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // Ignore private mode / blocked storage.
  }

  return detectBrowserLocale();
}

export function saveLocale(locale: Locale): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage errors.
  }
}
