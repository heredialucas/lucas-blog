"use client";

import Link from "next/link";
import TimelineItem from "@/components/custom/timeLineItem";
import { jobs } from "./jobs";

export default function TimelineJobs() {
  return (
    <div className="w-full mx-auto p-4 bg-cream-50 transition">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Professional Timeline
        </h2>
        <div className="flex justify-center gap-1.5">
          <span className="w-12 h-0.5 bg-blue-200"></span>
          <span className="w-12 h-0.5 bg-purple-200"></span>
          <span className="w-12 h-0.5 bg-blue-200"></span>
        </div>
      </div>
      <div className="relative">
        {jobs?.map((item, idx) => (
          <TimelineItem key={idx} {...item} index={idx} />
        ))}
      </div>
      <div className="flex flex-col w-auto items-end font-semibold">
        <Link href="#body-item" className="w-fit m-4">
          Go Up!
        </Link>
      </div>
    </div>
  );
}
