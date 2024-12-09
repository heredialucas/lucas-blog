import { FooterClientSide } from "./footerClientSide";
import { getClientInfoByDomain } from "@/app/server/actions/getClientInfoByDomain";

export async function FooterServerSide({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  return <FooterClientSide client={client} />;
}
