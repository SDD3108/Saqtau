"use client";
import { create } from "zustand";
export const useSiteStore = create((set) => ({
  demoOpen: false,
  setDemoOpen: (demoOpen) => set({ demoOpen }),
}));
