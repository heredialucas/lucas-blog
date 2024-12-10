import { TimelineJobs } from "./timeLineJobs";

export default async function TimelineJobsServer(props) {
  const params = await props.params;
  const { domain } = params;

  return <TimelineJobs domain={domain} />;
}
