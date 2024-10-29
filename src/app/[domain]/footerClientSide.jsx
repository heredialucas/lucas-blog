"use client";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function FooterClientSide({ client }) {
  return (
    <div className="text-center m-6 p-4">
      <p className="text-sm -600">
        © {new Date().getFullYear()} All rights reserved by{" "}
        <strong>Heredia Lucas</strong>
      </p>
      <a
        href="https://lucasdev-three.vercel.app/hlucas/blog"
        target="_blank"
        className="text-primary hover:underline"
      >
        Visit my blog
      </a>
    </div>
  );
}
