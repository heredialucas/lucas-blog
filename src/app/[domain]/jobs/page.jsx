import { Loading } from "@/components/custom/loading";
import { Suspense } from "react";
import { TimelineJobs } from "./timeLineJobs";

export default function TimelineJobsServer({ params }) {
  const { domain } = params;

  return (
    <Suspense fallback={<Loading />}>
      <TimelineJobs domain={domain} />
    </Suspense>
  );
}
