export const LOCALES = ["en", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleDefinition {
  code: Locale;
  nativeName: string;
  englishName: string;
}

export const LOCALE_DEFINITIONS: LocaleDefinition[] = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "ru", nativeName: "Русский", englishName: "Russian" },
];

export const LOCALE_BY_CODE = Object.fromEntries(
  LOCALE_DEFINITIONS.map((locale) => [locale.code, locale])
) as Record<Locale, LocaleDefinition>;

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
