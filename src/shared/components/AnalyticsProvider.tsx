"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState, type ReactNode } from "react";
import { trackPageView } from "@/lib/analytics/events";

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const enabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      capture_exceptions: true,
      autocapture: false,
      persistence: "localStorage+cookie",
    });

    trackPageView();
    setReady(true);
  }, []);

  if (!enabled || !ready) {
    return children;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
