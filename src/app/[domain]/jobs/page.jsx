import TimelineJobs from "./timeLineJobs";
import { getClientInfoByDomain } from "@/app/api/util/actions";
import { redirect } from "next/navigation";

export default async function TimelineJobsServer({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);
  if (!client) {
    redirect("/blogui");
  }

  return <TimelineJobs client={client} />;
}