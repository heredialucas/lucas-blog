"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { register } from "@/app/api/util/actions";
import { redirect } from "next/navigation";
import { Trash2 } from "lucide-react";
import { postImage } from "@/app/api/util/actions";

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
    const file = formData.get("image");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const serializedFile = Array.from(buffer);

    const fileData = {
      name: file.name,
      type: file.type,
      data: serializedFile,
    };
    const image = await postImage(fileData);
    const { registered } = await register(formData, image.url);

    if (registered) {
      redirect("/auth/login");
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
        <Label htmlFor="image">Profile Image</Label>
        <Input required type="file" name="image" />
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
          <div key={jobIndex} className="flex flex-col mb-4 p-4 border rounded">
            <Button
              type="button"
              onClick={() => removeJob(jobIndex)}
              className="w-fit self-end bg-red-500 hover:bg-red-600 text-white"
            >
              Remove Job
            </Button>
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
            <div className="flex flex-col mb-2">
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
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ol>
              <Button
                type="button"
                onClick={() => addDescriptionPoint(jobIndex)}
                className="w-fit self-end mt-2 bg-green-500 hover:bg-green-600 text-white"
              >
                Add Description
              </Button>
            </div>
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
