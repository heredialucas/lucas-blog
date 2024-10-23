import { getData } from "@/app/api/util/actions";
import { useCookie } from "@/hooks/useSignOut";
import { BlogCardsClient } from "@/app/[domain]/blog/blogsClient";

export default async function BlogCardsServerSide() {
  const { cookie, domain } = await useCookie();
  const { posts } = await getData("posts", domain.value);

  return <BlogCardsClient posts={posts} isAdmin={cookie} />;
}
