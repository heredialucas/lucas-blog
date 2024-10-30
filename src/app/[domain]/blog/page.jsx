import { getData } from "@/app/api/util/actions";
import { useCookie } from "@/hooks/useSignOut";
import { BlogCardsClient } from "@/app/[domain]/blog/blogsClient";
import { getClientInfoByDomain } from "@/app/api/util/actions";

export default async function BlogCardsServerSide({ params }) {
  const { domain } = params;
  const { cookie } = await useCookie();
  const { client } = await getClientInfoByDomain(domain);

  const { posts } = await getData("posts", domain);

  return <BlogCardsClient posts={posts} isAdmin={cookie} client={client} />;
}
