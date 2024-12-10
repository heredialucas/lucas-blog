import { BlogCards } from "@/app/[domain]/blog/blogs";
import { getCookie } from "@/hooks/useSignOut";
import { BlogCardsTitle } from "@/app/[domain]/blog/blogCardsTitle";

export default async function BlogCardsServerSide(props) {
  const params = await props.params;
  const { domain } = params;
  const { cookie } = getCookie();

  return (
    <>
      <BlogCardsTitle />
      <BlogCards domain={domain} isAdmin={cookie} />
    </>
  );
}
