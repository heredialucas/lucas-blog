"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/api/util/actions";
import { redirect } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useStorage";

export default function RegisterPage() {
  const isAdminStorage = useAuthRedirect();

  if (isAdminStorage) {
    redirect("/blog");
  }

  async function handleLogin(formData) {
    const { registered, message } = await register(formData);
    console.log("message", message);
    console.log("registered", registered);

    if (registered) {
      redirect("/admin/login");
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
        Register
      </Button>
    </form>
  );
}
