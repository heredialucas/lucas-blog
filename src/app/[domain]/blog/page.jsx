import { BlogCards } from "@/app/[domain]/blog/blogs";
import { getCookie } from "@/hooks/useSignOut";
import { BlogCardsTitle } from "@/app/[domain]/blog/blogCardsTitle";

export const revalidate = 86400; // 1 day

export default async function BlogCardsServerSide(props) {
  const params = await props.params;
  const { domain } = params;
  const { cookie } = await getCookie();

  return (
    <>
      <BlogCardsTitle />
      <BlogCards domain={domain} isAdmin={cookie} />
    </>
  );
}
