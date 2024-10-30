"use client";

import { useEffect } from "react";
import { useStore } from "@/zustand/config";

export function useClientStorage(client) {
  const { setClient } = useStore((state) => state);
  useEffect(() => {
    if (client) {
      setClient(client);
      localStorage.setItem("client", client.domain);
    }
  }, [client, setClient]);
}
