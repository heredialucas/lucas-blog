"use client";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function FooterClientSide({ client }) {
  return (
    <>
      <div className="flex justify-center gap-10 p-8 m-12 md:p-12">
        {client?.instagram && (
          <a
            href={client?.instagram}
            target="_blank"
            className=" hover:text-primary"
          >
            <Instagram size={24} />
          </a>
        )}
        {client?.linkedin && (
          <a
            href={client?.linkedin}
            target="_blank"
            className=" hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
        )}
        {client?.facebook && (
          <a
            href={client?.facebook}
            target="_blank"
            className=" hover:text-primary"
          >
            <Facebook size={24} />
          </a>
        )}
      </div>
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
      </div>
    </>
  );
}
