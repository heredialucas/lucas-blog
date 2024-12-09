import { getClientInfoByDomain } from "@/app/server/actions/getClientInfoByDomain";

export async function HomeHeroName({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  return (
    <h1 className=" hover:text-secondary text-2xl md:text-4xl font-bold mb-2">
      {`Hi! I'm ${client?.firstName || "{ Your first name }"} 👋🏼`}
    </h1>
  );
}
