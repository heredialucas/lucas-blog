import ArticleClientBlogui from "@/components/custom/articleClientBlogui";

export default async function ArticleServerSide() {
  return <ArticleClientBlogui isAdmin={true} />;
}
