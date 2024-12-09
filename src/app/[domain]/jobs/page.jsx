import { TimelineJobs } from "./timeLineJobs";

export default function TimelineJobsServer({ params }) {
  const { domain } = params;

  return <TimelineJobs domain={domain} />;
}
