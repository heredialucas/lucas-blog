import { Article } from "./article";
import { getCookie } from "@/hooks/useSignOut";

export default async function ArticleServerSide(props) {
  const params = await props.params;
  const { id } = params;
  const { cookie } = getCookie();

  return <Article id={id} isAdmin={cookie} />;
}
