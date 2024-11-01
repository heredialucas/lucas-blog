"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { configUser } from "@/app/api/util/actions";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { postImage } from "@/app/api/util/actions";
import { toast } from "react-toastify";
import { useStore } from "@/zustand/config";
import { useClientStorage } from "@/hooks/useClientStore";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB
export default function ConfigClientPage({ client }) {
  useClientStorage(client);
  const router = useRouter();
  const { setIsLoading } = useStore((state) => state);
  const [jobs, setJobs] = useState(() => {
    // Intenta parsear el timeline del usuario y convertirlo a un array de objetos
    const parsedTimeline = JSON.parse(client?.timeline);
    // Si parsedTimeline es un array, lo retornamos; si no, devolvemos un array con un objeto vacío
    return Array.isArray(parsedTimeline)
      ? parsedTimeline
      : [
          {
            title: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            company: "",
            description: [""],
          },
        ];
  });

  const [formData, setFormData] = useState({
    firstName: client?.firstName,
    lastName: client?.lastName,
    image: client?.imageUrl,
    hero: client?.hero,
    resumeLink: client?.resumeLink,
    instagram: client?.instagram,
    facebook: client?.facebook,
    linkedin: client?.linkedin,
    twitter: client?.twitter,
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateJob = (index, field, value) => {
    const updatedJobs = jobs.map((job, i) => {
      if (i === index) {
        const updatedJob = { ...job, [field]: value };

        return { ...updatedJob };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const toggleCurrentJob = (index) => {
    const updatedJobs = jobs.map((job, i) => {
      if (i === index) {
        const isCurrent = !job.isCurrent;
        return {
          ...job,
          isCurrent,
          endDate: isCurrent ? "Present" : "",
        };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        title: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        company: "",
        description: [""],
      },
    ]);
  };

  const removeJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
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

  async function handleConfig(formData) {
    setIsLoading(true);
    formData.append("timeline", JSON.stringify(jobs));
    const file = formData.get("image");

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size should be less than 500kb");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const serializedFile = Array.from(buffer);

    const fileData = {
      name: file.name,
      type: file.type,
      data: serializedFile,
    };
    const image = await postImage(fileData);
    const { configurated } = await configUser(
      formData,
      image.url,
      client?.domain
    );

    setIsLoading(false);
    if (!configurated) {
      toast.error("Something went wrong");
    }

    if (configurated) {
      toast.success("Configured successfully");
      router.push(`/${client?.domain}`);
    }
  }
  return (
    <form
      action={handleConfig}
      className="flex flex-col gap-4 border-2 p-2 md:p-10 w-full"
    >
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input
          className="text-[#fff]"
          type="file"
          name="image"
          accept="image/*"
        />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          className=""
          name="firstName"
          type="text"
          value={formData?.firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
        />
        <sup className="text-xs">🔔 This text is displayed on the profile.</sup>
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          className=""
          name="lastName"
          type="text"
          value={formData?.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
        />
      </div>
      <div>
        <Label htmlFor="hero">User description</Label>

        <Input
          className=""
          name="hero"
          type="textarea"
          value={formData?.hero}
          onChange={(e) => handleInputChange(e, "hero")}
        />
        <sup className="text-xs ">
          🔔 Keep in mind that each . causes a line break.
        </sup>
      </div>
      <div>
        <Label htmlFor="linkedin">Linkedin</Label>
        <Input
          className=""
          name="linkedin"
          type="text"
          value={formData?.linkedin}
          onChange={(e) => handleInputChange(e, "linkedin")}
        />
      </div>
      <div>
        <Label htmlFor="twitter">X</Label>
        <Input
          className=""
          name="twitter"
          type="text"
          value={formData?.twitter}
          onChange={(e) => handleInputChange(e, "twitter")}
        />
      </div>
      <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input
          className=""
          name="facebook"
          type="text"
          value={formData?.facebook}
          onChange={(e) => handleInputChange(e, "facebook")}
        />
      </div>
      <div>
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          className=""
          name="instagram"
          type="text"
          value={formData?.instagram}
          onChange={(e) => handleInputChange(e, "instagram")}
        />
      </div>
      <div>
        <Label htmlFor="resumeLink">Resume link</Label>
        <Input
          className=""
          name="resumeLink"
          type="text"
          value={formData?.resumeLink}
          onChange={(e) => handleInputChange(e, "resumeLink")}
        />
        <sup className="text-xs">
          🔔 Please provide a valid link (e.g., from Google Drive or Dropbox).
        </sup>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Professional Timeline</h3>
        {jobs.map((job, jobIndex) => (
          <div key={jobIndex} className="flex flex-col mb-4 p-4 border rounded">
            <Button
              type="button"
              onClick={() => removeJob(jobIndex)}
              className="w-fit self-end bg-red-500  text-white"
            >
              Remove Job
            </Button>

            <div className="mb-2">
              <Label htmlFor={`jobTitle-${jobIndex}`}>Job Title</Label>
              <Input
                className=""
                id={`jobTitle-${jobIndex}`}
                value={job.title}
                onChange={(e) => updateJob(jobIndex, "title", e.target.value)}
              />
            </div>

            <div className="mb-2 flex gap-4">
              <div className="flex-1">
                <Label htmlFor={`jobStartDate-${jobIndex}`}>Start Date</Label>
                <Input
                  className=""
                  id={`jobStartDate-${jobIndex}`}
                  type="date"
                  value={job.startDate}
                  max={job.endDate || undefined}
                  onChange={(e) =>
                    updateJob(jobIndex, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`jobEndDate-${jobIndex}`}>End Date</Label>
                <Input
                  className=""
                  id={`jobEndDate-${jobIndex}`}
                  type="date"
                  value={job.endDate}
                  min={job.startDate || undefined}
                  onChange={(e) =>
                    updateJob(jobIndex, "endDate", e.target.value)
                  }
                  disabled={job.isCurrent}
                />
              </div>
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <Checkbox
                id={`jobIsCurrent-${jobIndex}`}
                checked={job.isCurrent}
                onCheckedChange={() => toggleCurrentJob(jobIndex)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label
                htmlFor={`jobIsCurrent-${jobIndex}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                This is my current job
              </Label>
            </div>

            <div className="mb-2">
              <Label htmlFor={`jobTitle-${jobIndex}`}>Company</Label>
              <Input
                className=""
                id={`jobTitle-${jobIndex}`}
                value={job.company}
                onChange={(e) => updateJob(jobIndex, "company", e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-2">
              <Label className="mb-2">Description Points</Label>
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
                      className=" inline-block w-[calc(100%-60px)]"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        removeDescriptionPoint(jobIndex, pointIndex)
                      }
                      className="ml-2 p-1 h-auto bg-red-500  text-white"
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
        Send
      </Button>
    </form>
  );
}
