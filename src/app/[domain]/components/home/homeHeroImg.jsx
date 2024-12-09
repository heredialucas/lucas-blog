import Image from "next/image";
import { getClientInfoByDomain } from "@/app/server/actions/getClientInfoByDomain";

export async function HomeHeroImg({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  return (
    <Image
      src={client?.imageUrl || ProfileDefault}
      alt={`Profile of ${client?.firstName}`}
      width={300}
      height={300}
      className="self-center h-[300px] md:h-fit rounded-full object-cover"
    />
  );
}
