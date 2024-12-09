import { Article } from "./article";
import { useCookie } from "@/hooks/useSignOut";

export default async function ArticleServerSide({ params }) {
  const { id } = params;
  const { cookie } = await useCookie();

  return <Article id={id} isAdmin={cookie} />;
}
