"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfilePicture from "@/public/lucas.jpeg";
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

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between mb-12">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-primary hover:text-secondary text-4xl font-bold mb-2">
            {`Hi! I'm ${clientStore?.firstName} 👋🏼`}
          </h1>
          <p className="text-neutral mb-6 max-w-xl">{clientStore?.hero}</p>
          <Button className="btn btn-primary hover:bg-secondary hover:cursor-pointer">
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
        <a
          href="https://www.instagram.com/hlucasook/"
          target="_blank"
          className="text-neutral hover:text-primary"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/heredialucasfran/"
          target="_blank"
          className="text-neutral hover:text-primary"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </>
  );
}
