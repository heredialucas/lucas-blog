import { useCookie } from "@/hooks/useSignOut";
import { Suspense } from "react";
import { HomeClient } from "./components/home/homeClient";
import { Loading } from "@/components/custom/loading";

export default async function HomeServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();

  return (
    <Suspense fallback={<Loading />}>
      <HomeClient domain={domain} isAdmin={cookie} />
    </Suspense>
  );
}
