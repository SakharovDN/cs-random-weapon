import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE } from "./config";
import { MESSAGES } from "./messages";

export default getRequestConfig(async () => ({
  locale: DEFAULT_LOCALE,
  messages: MESSAGES[DEFAULT_LOCALE],
  timeZone: "UTC",
}));
