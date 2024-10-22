"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/api/util/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const route = useRouter();
  async function handleLogin(formData) {
    const { authenticated, message, domain } = await login(formData);

    if (!authenticated) {
      toast.warning(`${message}`);
    }
    if (authenticated) {
      toast.success(`${message}`);
      route.push(`/${domain}`);
    }
  }

  return (
    <form action={handleLogin} className="flex flex-col gap-4 border-2 p-10">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="text" required />
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
