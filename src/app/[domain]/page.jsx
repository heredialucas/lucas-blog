import { getClientInfoByDomain } from "@/app/api/util/actions";
import { HomeClient } from "@/app/[domain]/homeClient";
import { redirect } from "next/navigation";

export default async function HomeServerSide({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  if (!client) {
    redirect("/blogui");
  }

  return <HomeClient client={client} />;
}
