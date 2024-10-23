import ArticleClientBlogui from "./articleClientBlogui";

export default async function ArticleServerSide() {
  return <ArticleClientBlogui isAdmin={true} />;
}
