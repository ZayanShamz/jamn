"use client";
import { useEffect, useState } from "react";

import { IndianRupee, Info } from "lucide-react";
import JobTitleCombobox from "@/components/JobTitleCombobox";
import PlatformCombobox from "@/components/PlatformCombobox";
import { DatePicker } from "@/components/DatePicker";
import { CustomTextarea } from "@/components/CustomTextArea";

import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveJob } from "@/lib/firebaseUtils";

interface JobSubmitDialogProps {
  jobData?: {
    job_title: string;
    company: string;
    location: string;
    work_arrangement: string;
    employment_type: string;
    job_description: string;
    responsibilities: string;
    requirements: string;
    salary: string;
  };
}

export default function JobSubmitDialog({
  jobData,
  onClose,
}: {
  jobData?: {
    job_title: string;
    company: string;
    location: string;
    work_arrangement: string;
    employment_type: string;
    job_description: string;
    responsibilities: string;
    requirements: string;
    salary: string;
  };
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // pre-filled with jobData if available
    job_title: jobData?.job_title || "",
    company: jobData?.company || "",
    location: jobData?.location || "",
    work_arrangement: jobData?.work_arrangement || "",
    employment_type: jobData?.employment_type || "",
    job_description: jobData?.job_description || "",
    responsibilities: jobData?.responsibilities || "",
    requirements: jobData?.requirements || "",
    salary: jobData?.salary || "",
    // user filled fields
    applied_date: "",
    platform: "",
    source_url: "",
    user_notes: "",
    // default status: "Applied"
    status: "Applied",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      job_title: jobData?.job_title ?? "",
      company: jobData?.company ?? "",
      location: jobData?.location ?? "",
      work_arrangement: jobData?.work_arrangement ?? "",
      employment_type: jobData?.employment_type ?? "",
      job_description: jobData?.job_description ?? "",
      responsibilities: jobData?.responsibilities ?? "",
      requirements: jobData?.requirements ?? "",
      salary: jobData?.salary ?? "",
    }));
  }, [jobData]);

  const handleChange = (field: string) => (e: any) => {
    const value = typeof e === "string" ? e : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // --- 1. Validation ---
    if (formData.source_url && !/^https?:\/\//i.test(formData.source_url)) {
      alert("Please enter a valid URL (http:// or https://)");
      return;
    }

    if (!formData.job_title.trim() || !formData.company.trim()) {
      alert("Job Title and Company are required.");
      return;
    }

    setLoading(true);

    try {
      await saveJob(formData);
      toast.success("Job saved successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader className="p-6 pb-6">
        <DialogTitle className="text-2xl font-bold cursor-default">
          Job Details
        </DialogTitle>
        <DialogDescription className="text-sm cursor-default">
          Make sure the data is correct and provide the remaining details
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col p-6 gap-5 border overflow-y-auto">
        <div className="flex flex-col gap-7">
          <div className="w-full">
            <Label
              htmlFor="company-name"
              className="text-muted-foreground mb-1"
            >
              Company Name
            </Label>
            <Input
              type="text"
              id="company-name"
              placeholder="Company Name"
              defaultValue={jobData?.company}
              className="rounded-none bg-white py-5"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <JobTitleCombobox
                value={formData.job_title}
                onChange={handleChange("job_title")}
              />
            </div>
            <div>
              <Label htmlFor="salary" className="text-muted-foreground mb-1">
                Salary
              </Label>
              <InputGroup className="rounded-none bg-white">
                <InputGroupInput
                  id="salary"
                  placeholder="Salary"
                  className="pl-1!"
                  value={formData.salary}
                  onChange={handleChange("salary")}
                />
                <InputGroupAddon>
                  <InputGroupText>
                    <IndianRupee />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-start-1">
              <Label htmlFor="location" className="text-muted-foreground mb-1">
                Location
              </Label>
              <Input
                type="text"
                placeholder="Location"
                id="location"
                className="rounded-none bg-white py-4"
                value={formData.location}
                onChange={handleChange("location")}
              />
            </div>
            <div className="w-full md:col-start-2 md:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="work-arrangement"
                    className="text-muted-foreground mb-1"
                  >
                    Work Arrangement
                  </Label>
                  <Select
                    value={formData.work_arrangement || ""}
                    onValueChange={(v) => handleChange("work_arrangement")(v)}
                  >
                    <SelectTrigger
                      id="work-arrangement"
                      className="w-full rounded-none bg-white py-4 focus:rounded-md dark:focus:border-primary/70 
                      data-[state=open]:rounded-md data-[state=open]:border-2 data-[state=open]:border-[#C7C7C7]"
                    >
                      <SelectValue placeholder="Work Arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Not specified"
                        className="text-muted-foreground"
                      >
                        Not Specified
                      </SelectItem>
                      <SelectItem value="On-site">On-Site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="employment-type"
                    className="text-muted-foreground mb-1"
                  >
                    Employment Type
                  </Label>
                  <Select
                    value={formData.employment_type || ""}
                    onValueChange={(v) => handleChange("employment_type")(v)}
                  >
                    <SelectTrigger
                      id="employment-type"
                      className="w-full rounded-none bg-white py-4 focus:rounded-md dark:focus:border-primary/70 
                      data-[state=open]:rounded-md data-[state=open]:border-2 data-[state=open]:border-[#C7C7C7]"
                    >
                      <SelectValue placeholder="Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Not specified"
                        className="text-muted-foreground"
                      >
                        Not Specified
                      </SelectItem>
                      <SelectItem value="Full-time">Full-Time</SelectItem>
                      <SelectItem value="Part-time">Part-Time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {/* with scroll bar hidden */}
          <div className="w-full">
            <CustomTextarea
              id="job_description"
              label="Job Description"
              placeholder="Add a brief description of the job."
              value={formData.job_description}
              onChange={handleChange("job_description")}
            />
          </div>
          {/* normal */}
          <div className="w-full">
            <CustomTextarea
              id="responsibilities"
              label="Core Responsibilities"
              placeholder="Mention the key responsibilities of the job."
              value={formData.responsibilities}
              onChange={handleChange("responsibilities")}
            />
          </div>
          <div className="w-full">
            <CustomTextarea
              id="requirements"
              label="Key Requirements"
              placeholder="Job Requirements"
              value={formData.requirements}
              onChange={handleChange("requirements")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <PlatformCombobox
              value={formData.platform}
              onChange={handleChange("platform")}
              placeholder="Where did you find the job?"
            />
            <DatePicker
              value={formData.applied_date}
              onChange={handleChange("applied_date")}
              placeholder="Date Applied"
            />
          </div>
          <div>
            <CustomTextarea
              id="notes"
              label="Your Notes"
              placeholder="Add your notes"
              value={formData.user_notes}
              onChange={handleChange("user_notes")}
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-muted-foreground mb-1">
              Application Status ("Applied" by default)
            </Label>
            <Input
              type="text"
              placeholder="Status"
              className="rounded-none bg-white py-4"
              value={formData.status}
              onChange={handleChange("status")}
            />
          </div>

          <div className="relative">
            <Input
              type="url"
              placeholder="Paste source Url"
              value={formData.source_url}
              onChange={handleChange("source_url")}
              className="rounded-none bg-white py-4 pr-7"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="absolute right-2 h-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none" />
              </TooltipTrigger>
              <TooltipContent>Make sure to paste valid url.</TooltipContent>
            </Tooltip>
          </div>

          <DialogFooter className="mt-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-none bg-blue-500 hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </DialogFooter>
        </div>
      </div>
    </>
  );
}
