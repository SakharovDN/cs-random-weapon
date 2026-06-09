"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";

export function AppHeader() {
  const t = useTranslations("app");

  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:mb-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-400/80 sm:text-sm">
          {t("game")}
        </p>
        <h1 className="mt-1 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          {t("title")}
        </h1>
      </div>

      <LanguageSwitcher />
    </header>
  );
}
