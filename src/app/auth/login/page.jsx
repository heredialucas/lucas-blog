"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/server/actions/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  async function handleLogin(formData) {
    const { authenticated, message, domain } = await login(formData);

    if (!authenticated) {
      toast.error(message);
      return;
    }

    toast.success(message);
    if (authenticated) {
      router.push(`/${domain}`);
    }
  }

  return (
    <form
      action={handleLogin}
      className="flex flex-col gap-4 border-2 px-10 py-5 rounded"
    >
      <div>
        <Label htmlFor="email" className="text-gray-600 tracking-wide">
          Email
        </Label>
        <Input className="" name="email" type="text" required />
      </div>
      <div>
        <Label htmlFor="password" className="text-gray-600 tracking-wide">
          Password
        </Label>
        <Input className="" name="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="btn rounded w-full bg-gray-200 hover:bg-blue-300 text-gray-800 hover:text-white tracking-wide"
      >
        Login
      </Button>
      <div className="flex justify-between gap-4">
        <div className="text-gray-600 tracking-wide hover:text-blue-300 cursor-pointer">
          <Link href="/blogui">Go back</Link>
        </div>
        <div className="text-gray-600 tracking-wide hover:text-blue-300 cursor-pointer">
          <Link href="/auth/register/Your-domain">Register</Link>
        </div>
      </div>
    </form>
  );
}
