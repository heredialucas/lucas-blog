import EditClient from "@/app/[domain]/edit/[id]/editClient";
import { useCookie } from "@/hooks/useSignOut";
import { getDataById } from "@/app/api/util/actions";

export default async function EditServerSide({ params }) {
  const { id } = params;
  const { cookie } = await useCookie();

  const { post } = await getDataById("post", id);

  return <EditClient id={id} post={post} isAdmin={cookie} />;
}
