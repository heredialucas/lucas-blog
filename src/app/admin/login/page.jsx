"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/api/util/actions";
import { useStore } from "@/zustand/config";
import { redirect } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useStorage";

export default function AdminPage() {
  const { setIsAdmin } = useStore((state) => state);

  const isAdminStorage = useAuthRedirect();

  if (isAdminStorage) {
    redirect("/blog");
  }

  async function handleLogin(formData) {
    const { authenticated } = await login(formData);
    localStorage.setItem("authenticated", authenticated);
    setIsAdmin(authenticated);
    if (authenticated) {
      redirect("/blog");
    }
  }

  return (
    <form action={handleLogin} className="flex flex-col gap-4 border-2 p-10">
      <div>
        <Label htmlFor="user">Username</Label>
        <Input name="user" type="text" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-200 hover:bg-blue-300 text-blue-800"
      >
        Login
      </Button>
    </form>
  );
}
