import TimelineJobs from "./timeLineJobs";
import { getClientInfoByDomain } from "@/app/api/util/actions";

export default async function TimelineJobsServer({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  return <TimelineJobs client={client} />;
}
