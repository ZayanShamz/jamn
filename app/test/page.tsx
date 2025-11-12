"use client";

import { useState } from "react";
import { IndianRupee, Info, X } from "lucide-react";
import { CustomTextarea } from "@/components/CustomTextArea";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import PlatformCombobox from "@/components/PlatformCombobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobTitleCombobox from "@/components/JobTitleCombobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700"
      >
        Open Modal
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className={`
              relative w-full max-w-3xl rounded-none bg-white p-6 shadow-xl
              max-h-[90dvh] overflow-y-auto
            `}
          >
            {/* Close button (top-right) */}
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute right-3 top-3 rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Modal Title
            </h2>

            {/* Modal Content */}
            <div className="border rounded-md p-3">
              {/* form here */}
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
                    className="rounded-none bg-white py-5"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <JobTitleCombobox value="" onChange={() => {}} />
                  </div>
                  <div>
                    <Label
                      htmlFor="salary"
                      className="text-muted-foreground mb-1"
                    >
                      Salary
                    </Label>
                    <InputGroup className="rounded-none bg-white">
                      <InputGroupInput
                        id="salary"
                        placeholder="Salary"
                        className="pl-1!"
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
                    <Label
                      htmlFor="location"
                      className="text-muted-foreground mb-1"
                    >
                      Location
                    </Label>
                    <Input
                      type="text"
                      placeholder="Location"
                      id="location"
                      className="rounded-none bg-white py-4"
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
                        <Select>
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
                        <Select>
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
                            <SelectItem value="Internship">
                              Internship
                            </SelectItem>
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
                  />
                </div>
                {/* normal */}
                <div className="w-full">
                  <CustomTextarea
                    id="responsibilities"
                    label="Core Responsibilities"
                    placeholder="Mention the key responsibilities of the job."
                  />
                </div>
                <div className="w-full">
                  <CustomTextarea
                    id="requirements"
                    label="Key Requirements"
                    placeholder="Job Requirements"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <PlatformCombobox
                    value=""
                    onChange={() => {}}
                    placeholder="Where did you find the job?"
                  />
                  <DatePicker placeholder="Date Applied" />
                </div>
                <div>
                  <CustomTextarea
                    id="notes"
                    label="Your Notes"
                    placeholder="Add your notes"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="status"
                    className="text-muted-foreground mb-1"
                  >
                    Application Status ("Applied" by default)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Status"
                    className="rounded-none bg-white py-4"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="url"
                    placeholder="Paste source Url"
                    className="rounded-none bg-white py-4 pr-7"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="absolute right-2 h-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Make sure to paste valid url.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* footer */}

            <div className="flex justify-end mt-3">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
