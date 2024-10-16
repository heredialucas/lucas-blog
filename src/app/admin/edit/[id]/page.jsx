import EditClient from "@/components/custom/editClient";
import { getDataById } from "@/app/api/util/actions";

export default async function EditServerSide({ params }) {
  const { id } = params;

  const { post } = await getDataById("post", id);

  return <EditClient id={id} post={post} />;
}
