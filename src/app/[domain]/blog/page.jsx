import { getData } from "@/app/api/util/actions";
import { useCookie } from "@/hooks/useSignOut";
import { BlogCardsClient } from "@/app/[domain]/blog/blogsClient";

export default async function BlogCardsServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();

  const { posts } = await getData("posts", domain);

  return <BlogCardsClient posts={posts} isAdmin={cookie} />;
}
