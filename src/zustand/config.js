"use client";

import { create } from "zustand";

export const useStore = create((set) => ({
  theme: "light",
  setTheme: (value) => set(() => ({ theme: value })),
  client: {},
  setClient: (value) => set(() => ({ client: value })),
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
