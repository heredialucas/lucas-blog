import { getDataById } from "@/app/api/util/actions";
import ArticleClient from "@/components/custom/articleClient";

export default async function ArticleServerSide({ params }) {
  const { id } = params;

  const { post } = await getDataById("post", id);

  return <ArticleClient post={post} id={id} />;
}
