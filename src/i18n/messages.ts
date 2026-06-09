import en from "../../messages/en.json";
import ru from "../../messages/ru.json";
import type { Locale } from "./config";

export const MESSAGES: Record<Locale, typeof en> = {
  en,
  ru,
};
