import { Article } from "./article";
import { Loading } from "@/components/custom/loading";
import { Suspense } from "react";
import { useCookie } from "@/hooks/useSignOut";

export default async function ArticleServerSide({ params }) {
  const { id } = params;
  const { cookie } = await useCookie();

  return (
    <Suspense fallback={<Loading />}>
      <Article id={id} isAdmin={cookie} />
    </Suspense>
  );
}
