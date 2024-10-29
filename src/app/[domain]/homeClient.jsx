"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useStore } from "@/zustand/config";
import { useEffect } from "react";
import { formatHeroText } from "@/lib/utils";
import ProfileDefault from "@/public/profile.jpg";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function HomeClient({ client }) {
  const { client: clientStore, setClient } = useStore((state) => state);

  useEffect(() => {
    if (client) {
      setClient(client);
      localStorage.setItem("client", client.domain);
    }
  }, [client, setClient]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-col h-full justify-between md:w-2/3 mb-8 md:mb-0">
        <h1 className=" hover:text-secondary text-4xl font-bold mb-2">
          {`Hi! I'm ${clientStore?.firstName || "{ Your first name }"} 👋🏼`}
        </h1>
        <div className="min-h-[500px] m-6">
          {clientStore?.hero
            ? formatHeroText(clientStore?.hero).map((sentence, index) => (
                <p key={index} className="mb-3 max-w-xl">
                  {sentence}
                </p>
              ))
            : ""}
        </div>
        {clientStore?.resumeLink && (
          <Button className="btn btn-primary w-fit hover:cursor-pointer">
            <a href={clientStore?.resumeLink} target="_blank">
              See Resume
            </a>
          </Button>
        )}
      </div>
      <div className="flex flex-col h-full md:w-1/3 justify-center  items-center">
        <Image
          src={clientStore?.imageUrl || ProfileDefault}
          alt={`Profile of ${clientStore?.firstName}`}
          width={300}
          height={300}
          className="self-center h-fit rounded-full object-cover"
        />
        <div className="flex justify-center gap-10 p-8">
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
      </div>
    </div>
  );
}
