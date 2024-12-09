"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/server/actions/register";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function RegisterPage({ params }) {
  const { domain } = params;

  const [domainError, setDomainError] = useState("");
  const [domainState, setDomainState] = useState(domain);

  const validateDomain = (value) => {
    // Expresión regular que solo permite letras, números y guiones
    const domainRegex = /^[a-zA-Z0-9-]+$/;

    if (!domainRegex.test(value)) {
      setDomainError("Domain must only contain letters, numbers and dashes");
      return false;
    }

    setDomainError("");
    return true;
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setDomainState(value);
    validateDomain(value);
  };

  async function handleRegister(formData) {
    const domainValue = formData.get("domain");

    if (!validateDomain(domainValue)) {
      toast.error("Invalid domain");
      return;
    }

    const { registered } = await register(formData);

    if (!registered) {
      toast.error("Something went wrong");
    }

    if (registered) {
      toast.success("Registered successfully");
      redirect("/auth/login");
    }
  }

  return (
    <form
      action={handleRegister}
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
      <div>
        <Label htmlFor="domain" className="text-gray-600 tracking-wide">
          Domain
        </Label>
        <Input
          name="domain"
          type="text"
          value={domainState}
          onChange={handleDomainChange}
          required
          className={`${
            domainError ? "border-red-500 " : ""
          } placeholder-gray-400`}
        />
        {domainError && (
          <p className="text-wrap text-red-500 text-xs mt-1 wrap">
            {domainError}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={domainError}
        className="btn rounded w-full bg-gray-200 hover:bg-blue-300 text-gray-800 hover:text-white tracking-wide"
      >
        Register
      </Button>
      <div className="flex justify-between gap-4">
        <div className="text-gray-600 tracking-wide hover:text-blue-300 cursor-pointer">
          <Link href="/blogui">Go back</Link>
        </div>
        <div className="text-gray-600 tracking-wide hover:text-blue-300 cursor-pointer">
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </form>
  );
}
