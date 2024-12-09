import { FooterClientSide } from "./footerClientSide";
import { getClientInfoByDomain } from "@/app/server/actions/actions";

export async function FooterServerSide({ domain }) {
  const { client } = await getClientInfoByDomain(domain);

  return <FooterClientSide client={client} />;
}
