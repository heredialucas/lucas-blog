"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/api/util/actions";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function handleRegister(formData) {
    const { registered } = await register(formData);

    if (registered) {
      redirect("/admin/login");
    }
  }

  return (
    <form action={handleRegister} className="flex flex-col gap-4 border-2 p-10">
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
        Register
      </Button>
    </form>
  );
}
