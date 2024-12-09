import { NavClientSide } from "@/app/[domain]/navClientSide";
import { useCookie } from "@/hooks/useSignOut";
import { getClientInfoByDomain } from "@/app/server/actions/actions";
import { FooterServerSide } from "@/app/[domain]/footerServerSide";
export default async function ConfigLayout({ params, children }) {
  const { domain } = params;
  const { cookie } = await useCookie();
  const { client } = await getClientInfoByDomain(domain);

  return (
    <div className="flex flex-col w-full">
      <NavClientSide
        isAdmin={cookie}
        isSubscribed={client?.isSubscribed}
        domain={domain}
      />
      {children}
      <div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <FooterServerSide domain={domain} />
      </div>
    </div>
  );
}
