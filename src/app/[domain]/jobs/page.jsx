import { Loading } from "@/components/custom/loading";
import { Suspense } from "react";
import { TimelineJobs } from "./timelineJobs";

export default async function TimelineJobsServer({ params }) {
  const { domain } = params;

  if (!domain) {
    return <></>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <TimelineJobs domain={domain} />
    </Suspense>
  );
}
