"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";
import { useStore } from "@/zustand/config";
import { useEffect } from "react";

export function HomeClient({ client }) {
  const { client: clientStore, setClient } = useStore((state) => state);

  useEffect(() => {
    if (client?.client) {
      setClient(client.client);
      localStorage.setItem("client", client.client.domain);
    }
  }, [client, setClient]);

  const formatHeroText = (text) => {
    if (!text) return [];

    // Dividir por puntos, pero mantener el punto en cada segmento
    const sentences = text
      .split(".")
      .filter((sentence) => sentence.trim().length > 0)
      .map((sentence) => sentence.trim() + ".");

    return sentences;
  };

  return (
    <>
      <div className="flex flex-col-reverse  md:flex-row items-center md:items-start justify-between">
        <div className="flex flex-col justify-between h-full md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-primary hover:text-secondary text-4xl font-bold mb-2">
            {`Hi! I'm ${clientStore?.firstName} 👋🏼`}
          </h1>
          <div className="flex flex-col justify-start h-full m-4">
            {formatHeroText(clientStore?.hero).map((sentence, index) => (
              <p key={index} className="text-neutral mb-3 max-w-xl">
                {sentence}
              </p>
            ))}
          </div>
          <Button className="btn btn-primary w-fit hover:bg-secondary hover:cursor-pointer">
            <a href={clientStore?.resumeLink} target="_blank">
              See Resume
            </a>
          </Button>
        </div>
        <div className="mb-6 md:w-1/3 flex justify-center">
          <Image
            src={clientStore.imageUrl}
            alt="Ana's profile picture"
            width={300}
            height={300}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center gap-10 p-8 md:p-12 ">
        {clientStore?.instagram && (
          <a
            href={clientStore?.instagram}
            target="_blank"
            className="text-neutral hover:text-primary"
          >
            <Instagram size={24} />
          </a>
        )}
        {clientStore?.linkedin && (
          <a
            href={clientStore?.linkedin}
            target="_blank"
            className="text-neutral hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
        )}
        {clientStore?.facebook && (
          <a
            href={clientStore?.facebook}
            target="_blank"
            className="text-neutral hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
        )}
      </div>
    </>
  );
}
