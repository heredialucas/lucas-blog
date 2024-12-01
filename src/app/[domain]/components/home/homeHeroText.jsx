import { formatHeroText } from "@/lib/utils";
import { getClientInfoByDomain } from "@/app/api/util/actions";

export async function HomeHeroText({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  if (!client?.hero) {
    return <></>;
  }

  return (
    <div className="min-h-[500px] m-6 text-base">
      {formatHeroText(client?.hero).map((sentence, index) => (
        <p key={index} className="mb-3 max-w-xl">
          {sentence}
        </p>
      ))}
    </div>
  );
}
