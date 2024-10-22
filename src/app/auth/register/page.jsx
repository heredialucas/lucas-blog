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
import { Country } from "country-state-city";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  validateDomain,
  validateEmail,
  validateHero,
  validateResumeLink,
  validateFirstName,
  validateLastName,
} from "@/lib/utils";

export default function RegisterPage() {
  const [jobs, setJobs] = useState([
    {
      title: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      location: "",
      description: [""],
      errors: {},
    },
  ]);

  const [formErrors, setFormErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    domain: "",
    hero: "",
    linkedin: "",
    resumeLink: "",
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    let error = "";

    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "domain":
        error = validateDomain(value);
        break;
      case "hero":
        error = validateHero(value);
        break;
      case "resumeLink":
        error = validateResumeLink(value);
        break;
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const updateJob = (index, field, value) => {
    const updatedJobs = jobs.map((job, i) => {
      if (i === index) {
        const updatedJob = { ...job, [field]: value };

        // Validate job fields
        const errors = { ...job.errors };

        if (field === "title") {
          errors.title = validateJobTitle(value);
        }

        if (field === "startDate" || field === "endDate") {
          errors.dates = validateJobDates(
            field === "startDate" ? value : job.startDate,
            field === "endDate" ? value : job.endDate
          );
        }

        return { ...updatedJob, errors };
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
        location: "",
        description: [""],
        errors: {},
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

    if (!registered) {
      toast.error("Something went wrong");
    }

    if (registered) {
      toast.success("Registered successfully");
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
        <Input
          name="email"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "email")}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          required
          onChange={(e) => handleInputChange(e, "password")}
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input required type="file" name="image" />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          name="firstName"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "firstName")}
        />
        {formErrors.firstName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
        )}
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          name="lastName"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "lastName")}
        />
        {formErrors.lastName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
        )}
      </div>
      <div>
        <Label htmlFor="domain">Domain</Label>
        <Input
          name="domain"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "domain")}
        />
        {formErrors.domain && (
          <p className="text-red-500 text-sm mt-1">{formErrors.domain}</p>
        )}
      </div>
      <div>
        <Label htmlFor="hero">User description</Label>
        <Input
          name="hero"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "hero")}
        />
        {formErrors.hero && (
          <p className="text-red-500 text-sm mt-1">{formErrors.hero}</p>
        )}
      </div>
      <div>
        <Label htmlFor="linkedin">Linkedin</Label>
        <Input name="linkedin" type="text" />
      </div>
      <div>
        <Label htmlFor="twitter">X</Label>
        <Input name="twitter" type="text" />
      </div>
      <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input name="facebook" type="text" />
      </div>
      <div>
        <Label htmlFor="instagram">Instagram</Label>
        <Input name="instagram" type="text" />
      </div>
      <div>
        <Label htmlFor="resumeLink">Resume link</Label>
        <Input
          name="resumeLink"
          type="text"
          required
          onChange={(e) => handleInputChange(e, "resumeLink")}
        />
        {formErrors.resumeLink && (
          <p className="text-red-500 text-sm mt-1">{formErrors.resumeLink}</p>
        )}
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
              {job.errors.title && (
                <p className="text-red-500 text-sm mt-1">{job.errors.title}</p>
              )}
            </div>

            <div className="mb-2 flex gap-4">
              <div className="flex-1">
                <Label htmlFor={`jobStartDate-${jobIndex}`}>Start Date</Label>
                <Input
                  id={`jobStartDate-${jobIndex}`}
                  type="date"
                  value={job.startDate}
                  max={job.endDate || undefined}
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
                  min={job.startDate || undefined}
                  onChange={(e) =>
                    updateJob(jobIndex, "endDate", e.target.value)
                  }
                  disabled={job.isCurrent}
                  required={!job.isCurrent}
                />
              </div>
            </div>
            {job.errors.dates && (
              <p className="text-red-500 text-sm mt-1">{job.errors.dates}</p>
            )}

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
              <Label>Location</Label>
              <Select
                value={job.location}
                onValueChange={(value) =>
                  updateJob(jobIndex, "location", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Country.getAllCountries().map((country) => (
                    <SelectItem
                      key={country.isoCode}
                      value={country.name}
                      className="cursor-pointer"
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
