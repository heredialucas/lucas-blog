"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { register } from "@/app/api/util/actions";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [jobs, setJobs] = useState([
    {
      title: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      location: "",
      description: [""],
    },
  ]);

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        title: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        location: "",
        description: [""],
      },
    ]);
  };

  const removeJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  const updateJob = (index, field, value) => {
    const updatedJobs = jobs.map((job, i) => {
      if (i === index) {
        return { ...job, [field]: value };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const toggleCurrentJob = (index) => {
    const updatedJobs = jobs.map((job, i) => {
      if (i === index) {
        return {
          ...job,
          isCurrent: !job.isCurrent,
          endDate: job.isCurrent ? "" : "Current",
        };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const addDescriptionPoint = (jobIndex) => {
    const updatedJobs = [...jobs];
    updatedJobs[jobIndex].description.push("");
    setJobs(updatedJobs);
  };

  const updateDescriptionPoint = (jobIndex, pointIndex, value) => {
    const updatedJobs = [...jobs];
    updatedJobs[jobIndex].description[pointIndex] = value;
    setJobs(updatedJobs);
  };

  const removeDescriptionPoint = (jobIndex, pointIndex) => {
    const updatedJobs = [...jobs];
    updatedJobs[jobIndex].description = updatedJobs[
      jobIndex
    ].description.filter((_, i) => i !== pointIndex);
    setJobs(updatedJobs);
  };
  async function handleRegister(formData) {
    formData.append("timeline", JSON.stringify(jobs));

    const { registered } = await register(formData);

    if (registered) {
      redirect("/admin/auth/login");
    }
  }

  return (
    <form
      action={handleRegister}
      className="flex flex-col gap-4 border-2 p-10 w-full"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="text" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" required />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input name="firstName" type="text" required />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input name="lastName" type="text" required />
      </div>
      <div>
        <Label htmlFor="domain">Domain</Label>
        <Input name="domain" type="text" required />
      </div>
      <div>
        <Label htmlFor="hero">User description</Label>
        <Input name="hero" type="text" required />
      </div>
      <div>
        <Label htmlFor="resumeLink">Resume link</Label>
        <Input name="resumeLink" type="text" required />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Professional Timeline</h3>
        {jobs.map((job, jobIndex) => (
          <div key={jobIndex} className="mb-4 p-4 border rounded">
            <div className="mb-2">
              <Label htmlFor={`jobTitle-${jobIndex}`}>Job Title</Label>
              <Input
                id={`jobTitle-${jobIndex}`}
                value={job.title}
                onChange={(e) => updateJob(jobIndex, "title", e.target.value)}
                required
              />
            </div>
            <div className="mb-2 flex gap-4">
              <div className="flex-1">
                <Label htmlFor={`jobStartDate-${jobIndex}`}>Start Date</Label>
                <Input
                  id={`jobStartDate-${jobIndex}`}
                  type="date"
                  value={job.startDate}
                  onChange={(e) =>
                    updateJob(jobIndex, "startDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`jobEndDate-${jobIndex}`}>End Date</Label>
                <Input
                  id={`jobEndDate-${jobIndex}`}
                  type="date"
                  value={job.endDate}
                  onChange={(e) =>
                    updateJob(jobIndex, "endDate", e.target.value)
                  }
                  disabled={job.isCurrent}
                  required={!job.isCurrent}
                />
              </div>
            </div>
            <div className="mb-2 flex items-center">
              <Checkbox
                id={`jobIsCurrent-${jobIndex}`}
                checked={job.isCurrent}
                onCheckedChange={() => toggleCurrentJob(jobIndex)}
              />
              <Label htmlFor={`jobIsCurrent-${jobIndex}`} className="ml-2">
                This is my current job
              </Label>
            </div>
            <div className="mb-2">
              <Label htmlFor={`jobLocation-${jobIndex}`}>Location</Label>
              <Input
                id={`jobLocation-${jobIndex}`}
                value={job.location}
                onChange={(e) =>
                  updateJob(jobIndex, "location", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-2">
              <Label>Description Points</Label>
              <ol className="list-decimal list-inside">
                {job.description.map((point, pointIndex) => (
                  <li key={pointIndex} className="mb-2">
                    <Input
                      value={point}
                      onChange={(e) =>
                        updateDescriptionPoint(
                          jobIndex,
                          pointIndex,
                          e.target.value
                        )
                      }
                      className="inline-block w-[calc(100%-60px)]"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        removeDescriptionPoint(jobIndex, pointIndex)
                      }
                      className="ml-2 p-1 h-auto bg-red-500 hover:bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ol>
              <Button
                type="button"
                onClick={() => addDescriptionPoint(jobIndex)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white"
              >
                Add Description Point
              </Button>
            </div>
            <Button
              type="button"
              onClick={() => removeJob(jobIndex)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Remove Job
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addJob}
          className="mt-2 bg-green-500 hover:bg-green-600 text-white"
        >
          Add Job
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-200 hover:bg-blue-300 text-blue-800 mt-6"
      >
        Register
      </Button>
    </form>
  );
}
