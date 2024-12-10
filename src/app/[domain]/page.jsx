import { useCookie } from "@/hooks/useSignOut";
import { HomeClient } from "./components/home/homeClient";

export default async function HomeServerSide(props) {
  const params = await props.params;
  const { domain } = params;
  const { cookie } = await useCookie();

  return <HomeClient domain={domain} isAdmin={cookie} />;
}
