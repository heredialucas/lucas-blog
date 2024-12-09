import EditClient from "@/app/[domain]/edit/[id]/editClient";
import { useCookie } from "@/hooks/useSignOut";
import { getPost } from "@/app/server/actions/getPost";

export default async function EditServerSide({ params }) {
  const { id } = params;
  const { cookie } = await useCookie();

  const { post } = await getPost(id);

  return <EditClient id={id} post={post} isAdmin={cookie} />;
}
