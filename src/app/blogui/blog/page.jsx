import { posts } from "./posts";
import { BlogCardsClientBlogui } from "./blogClientBlogui";
export default async function BlogCardsServerSide() {
  return <BlogCardsClientBlogui posts={posts} />;
}
