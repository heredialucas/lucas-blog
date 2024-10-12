import { getData } from "@/app/api/util/actions";
import { BlogCardsClient } from "@/components/custom/blogsClient";

export const metadata = {
  title: "Heredia Lucas posts",
  description: "Posts by Heredia Lucas",
};

export default async function BlogCardsServerSide() {
  const { posts } = await getData("posts");

  return <BlogCardsClient posts={posts} />;
}
