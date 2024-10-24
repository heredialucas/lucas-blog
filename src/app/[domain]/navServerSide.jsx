import { NavClientSide } from "./navClientSide";
import { useCookie } from "@/hooks/useSignOut";
import { getClientInfoByDomain } from "@/app/api/util/actions";
import { redirect } from "next/navigation";

export async function NavServerSide() {
  const { cookie, domain } = await useCookie();
  const { client } = await getClientInfoByDomain(domain?.value);
  if (!client) {
    redirect("/blogui");
  }
  return (
    <NavClientSide
      isAdmin={cookie}
      isSubscribed={client.isSubscribed}
      domain={domain.value}
    />
  );
}
