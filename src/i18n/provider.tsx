"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { MESSAGES } from "./messages";
import { loadStoredLocale, saveLocale } from "./storage";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(loadStoredLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    saveLocale(nextLocale);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const messages = MESSAGES[locale];
    document.documentElement.lang = locale;
    document.title = messages.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", messages.meta.description);
    }
  }, [locale, ready]);

  const localeContext = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={localeContext}>
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useLocaleSwitcher(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleSwitcher must be used within I18nProvider");
  }
  return context;
}
