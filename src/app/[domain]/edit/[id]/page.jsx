import EditClient from "@/app/[domain]/edit/[id]/editClient";
import { getCookie } from "@/hooks/useSignOut";
import { getPost } from "@/app/server/actions/getPost";

export const revalidate = 86400; // 1 day

export default async function EditServerSide(props) {
  const params = await props.params;
  const { id } = params;
  const { cookie } = await getCookie();

  const { post } = await getPost(id);

  return <EditClient id={id} post={post} isAdmin={cookie} />;
}
