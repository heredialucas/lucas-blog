import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getClientInfoByDomain } from "@/app/server/actions/actions";

export async function HomeHeroLinks({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  return (
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
  );
}
