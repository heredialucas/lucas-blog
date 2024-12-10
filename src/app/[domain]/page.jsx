import { getCookie } from "@/hooks/useSignOut";
import { HomeClient } from "./components/home/homeClient";

export default async function HomeServerSide(props) {
  const params = await props.params;
  const { domain } = params;
  const { cookie } = getCookie();

  return <HomeClient domain={domain} isAdmin={cookie} />;
}
