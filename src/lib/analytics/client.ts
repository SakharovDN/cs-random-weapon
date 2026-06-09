import posthog from "posthog-js";

let initialized = false;

export function initAnalytics(): boolean {
  if (initialized || typeof window === "undefined") {
    return initialized;
  }

  initialized = true;
  return true;
}

export function captureEvent(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  posthog.capture(event, properties);
}

export function markAnalyticsInitialized(): void {
  initialized = true;
}
