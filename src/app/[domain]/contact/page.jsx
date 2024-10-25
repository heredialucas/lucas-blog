import ContactsClient from "./contactClient";
import { getClientInfoByDomain } from "@/app/api/util/actions";

export default async function Contacts({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  return <ContactsClient client={client} />;
}
