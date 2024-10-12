"use client";

import { create } from "zustand";

export const useStore = create((set) => ({
  isAdmin: false,
  setIsAdmin: (value) => set(() => ({ isAdmin: value })),
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
