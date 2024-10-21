import { getClientInfoByDomain } from "@/app/api/util/actions";
import { HomeClient } from "@/components/custom/homeClient";

export default async function HomeServerSide({ params }) {
  const { domain } = params;
  const client = await getClientInfoByDomain(domain);

  return <HomeClient client={client} />;
}
