"use client";

import { useTranslations } from "next-intl";
import { LOCALE_DEFINITIONS, type Locale, useLocaleSwitcher } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleSwitcher();
  const t = useTranslations("language");

  return (
    <div className="relative min-w-[148px]">
      <label htmlFor="language-select" className="sr-only">
        {t("label")}
      </label>
      <select
        id="language-select"
        value={locale}
        aria-label={t("select")}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className={[
          "w-full cursor-pointer appearance-none rounded-lg border border-slate-700 bg-slate-900/80",
          "py-2 pl-3 pr-9 text-sm font-semibold uppercase tracking-wide text-slate-200",
          "outline-none transition hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40",
        ].join(" ")}
      >
        {LOCALE_DEFINITIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.nativeName}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500"
      >
        ▾
      </span>
    </div>
  );
}
