"use client";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function FooterClientSide({ client }) {
  return (
    <>
      <div className="text-center p-4">
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
        <p className="text-xs mt-2">
          Styled with{" "}
          <a href="https://daisyui.com/" target="_blank">
            DaisyUI
          </a>
        </p>
      </div>
    </>
  );
}
