import ConfigClient from "./configClient";
import { getClientInfoByDomain } from "@/app/api/util/actions";

export default async function ConfigServerSide({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  return <ConfigClient client={client} />;
}
