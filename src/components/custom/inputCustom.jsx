"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

export default function LinkCustom() {
  const [customPath, setCustomPath] = useState("");
  return (
    <>
      <div className="flex bg-primary w-full max-w-md rounded-md shadow-sm focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
        <Label className="inline-flex items-center px-3 text-[#444]">
          <strong>blogui.me/</strong>
        </Label>
        <Input
          type="text"
          className="h-full rounded-none rounded-r-md focus:ring-primary focus:border-primary"
          placeholder="Your domain"
          onChange={(e) => setCustomPath(e.target.value)}
        />
      </div>
      <Link
        className="btn btn-primary mx-2"
        href={`https://blogui.me/auth/register/${
          customPath || `Your-domain`
        }`}
      >
        Get started
      </Link>
    </>
  );
}
