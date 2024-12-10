import { NavClientSide } from "@/app/[domain]/navClientSide";
import { getCookie } from "@/hooks/useSignOut";
import { getClientInfoByDomain } from "@/app/server/actions/getClientInfoByDomain";
import { FooterServerSide } from "@/app/[domain]/footerServerSide";
export default async function ConfigLayout(props) {
  const params = await props.params;

  const { children } = props;

  const { domain } = params;
  const { cookie } = getCookie();
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
