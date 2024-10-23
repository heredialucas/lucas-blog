import { NavClientSide } from "./navClientSide";
import { useCookie } from "@/hooks/useSignOut";
export async function NavServerSide() {
  const { cookie } = await useCookie();
  return <NavClientSide isAdmin={cookie} />;
}
