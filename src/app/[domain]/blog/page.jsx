import { BlogCards } from "@/app/[domain]/blog/blogs";
import { useCookie } from "@/hooks/useSignOut";
import { BlogCardsTitle } from "@/app/[domain]/blog/blogCardsTitle";

export default async function BlogCardsServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();

  return (
    <>
      <BlogCardsTitle />
      <BlogCards domain={domain} isAdmin={cookie} />
    </>
  );
}
