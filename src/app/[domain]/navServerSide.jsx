import { NavClientSide } from "./navClientSide";
import { useCookie } from "@/hooks/useSignOut";
import { getClientInfoByDomain } from "@/app/server/actions/actions";

export async function NavServerSide({ domain }) {
  const { cookie } = await useCookie();
  const { client } = await getClientInfoByDomain(domain);

  return (
    <NavClientSide
      isAdmin={cookie}
      isSubscribed={client?.isSubscribed}
      domain={domain}
    />
  );
}
