"use client";

import { create } from "zustand";

export const useStore = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
