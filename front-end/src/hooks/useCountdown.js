"use client";
import { useSyncExternalStore } from "react";
export const launchAt = Date.parse("2026-10-20T14:00:00+05:00");
function subscribe(cb) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
export default function useCountdown() {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}
