import { BlogCards } from "@/app/[domain]/blog/blogs";
import { Loading } from "@/components/custom/loading";
import { Suspense } from "react";
import { useCookie } from "@/hooks/useSignOut";
import { BlogCardsTitle } from "@/app/[domain]/blog/blogCardsTitle";

export default async function BlogCardsServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();

  return (
    <>
      <BlogCardsTitle />
      <Suspense fallback={<Loading />}>
        <BlogCards domain={domain} isAdmin={cookie} />
      </Suspense>
    </>
  );
}
