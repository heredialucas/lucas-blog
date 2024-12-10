import { NavClientSide } from "./navClientSide";
import { getCookie } from "@/hooks/useSignOut";
import { getClientInfoByDomain } from "@/app/server/actions/getClientInfoByDomain";

export async function NavServerSide({ domain }) {
  const { cookie } = getCookie();
  const { client } = await getClientInfoByDomain(domain);

  return (
    <NavClientSide
      isAdmin={cookie}
      isSubscribed={client?.isSubscribed}
      domain={domain}
    />
  );
}
