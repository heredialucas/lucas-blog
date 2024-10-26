"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";
import { useStore } from "@/zustand/config";
import { useEffect } from "react";
import { formatHeroText } from "@/lib/utils";
import ProfileDefault from "@/public/profile.jpg";

export function HomeClient({ client }) {
  const { client: clientStore, setClient } = useStore((state) => state);

  useEffect(() => {
    if (client) {
      setClient(client);
      localStorage.setItem("client", client.domain);
    }
  }, [client, setClient]);

  return (
    <div className="flex flex-col-reverse md:h-[600px] md:flex-row items-center md:items-start justify-between">
      <div className="flex flex-col justify-between h-full md:w-2/3 mb-8 md:mb-0">
        <h1 className="text-primary hover:text-secondary text-4xl font-bold mb-2">
          {`Hi! I'm ${clientStore?.firstName || "{ Your first name }"} 👋🏼`}
        </h1>
        <div className="flex flex-col justify-start h-full m-4">
          {clientStore?.hero
            ? formatHeroText(clientStore?.hero).map((sentence, index) => (
                <p key={index} className="text-neutral mb-3 max-w-xl">
                  {sentence}
                </p>
              ))
            : ""}
        </div>
        {clientStore?.resumeLink && (
          <Button className="btn btn-primary text-primary-content w-fit hover:bg-secondary hover:cursor-pointer">
            <a href={clientStore?.resumeLink} target="_blank">
              See Resume
            </a>
          </Button>
        )}
      </div>
      <div className="flex mb-6 h-full md:w-1/3 justify-center">
        <Image
          src={clientStore?.imageUrl || ProfileDefault}
          alt={`Profile of ${clientStore?.firstName}`}
          width={300}
          height={300}
          className="self-center h-fit rounded-full object-cover"
        />
      </div>
    </div>
  );
}
