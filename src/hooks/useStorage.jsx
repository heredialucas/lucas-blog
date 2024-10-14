"use client";

import { useStore } from "@/zustand/config";
import { useEffect, useState } from "react";

export const useAuthRedirect = () => {
  const { setIsAdmin } = useStore((state) => state);
  const [isAdminStorage, setIsAdminStorage] = useState("");

  useEffect(() => {
    const localStorageValue = localStorage.getItem("authenticated");

    setIsAdminStorage(localStorageValue);
    setIsAdmin(localStorageValue);
  }, [setIsAdmin]);

  return isAdminStorage;
};
