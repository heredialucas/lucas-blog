import { getClientInfoByDomain } from "@/app/api/util/actions";
import { HomeClient } from "@/app/[domain]/homeClient";
import { useCookie } from "@/hooks/useSignOut";

export default async function HomeServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();
  const { client } = await getClientInfoByDomain(domain);

  return <HomeClient client={client} isAdmin={cookie} />;
}
