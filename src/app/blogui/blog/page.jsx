import { BlogCardsClientBlogui } from "@/components/custom/blogClientBlogui";
import { posts } from "./posts";
export default async function BlogCardsServerSide() {
  return <BlogCardsClientBlogui posts={posts} />;
}
