import { TimelineJobs } from "./timeLineJobs";
export const revalidate = 86400; // 1 day

export default async function TimelineJobsServer(props) {
  const params = await props.params;
  const { domain } = params;

  return <TimelineJobs domain={domain} />;
}
