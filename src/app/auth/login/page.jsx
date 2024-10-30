"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/api/util/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useStore } from "@/zustand/config";

export default function LoginPage() {
  const route = useRouter();
  const { setIsLoading } = useStore((state) => state);
  async function handleLogin(formData) {
    setIsLoading(true);
    const { authenticated, message, domain } = await login(formData);

    setIsLoading(false);
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
        <Input className='' name="email" type="text" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input className='' name="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="btn btn-primary rounded w-full bg-blue-200 hover:bg-blue-300 text-blue-800"
      >
        Login
      </Button>
      <Link
        href="/blogui"
        className="btn btn-primary rounded bg-blue-200 hover:bg-blue-300 text-blue-800"
      >
        Go back
      </Link>
    </form>
  );
}
