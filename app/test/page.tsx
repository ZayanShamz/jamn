"use client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
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
import { IndianRupee, Info } from "lucide-react";
import JobTitleCombobox from "@/components/JobTitleCombobox";
import PlatformCombobox from "@/components/PlatformCombobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TestPage() {
  const [platform, setPlatform] = useState("");
  const [job, setJob] = useState({ job_title: "" });

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-2 h-svh mt-20">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-lg">This is a test page for development purposes.</p>
        <div className="flex flex-col justify-center w-[90%] md:w-[70%] lg:w-[50%] border p-8 mt-5 bg-[#FFFFFF] dark:bg-[#2f2e2e] ">
          <form className="flex flex-col gap-5">
            <Input
              type="text"
              id="company-name"
              placeholder="Company Name"
              className="rounded-none bg-background py-5"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <JobTitleCombobox
                  value={job.job_title}
                  onChange={(val) => setJob({ ...job, job_title: val })}
                />
              </div>
              <div>
                <InputGroup className="rounded-none bg-background">
                  <InputGroupInput placeholder="Salary" className="pl-1!" />
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
                <Input
                  type="text"
                  placeholder="Location"
                  className="rounded-none bg-background py-4"
                />
              </div>
              <div className="w-full md:col-start-2 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger
                      className="w-full rounded-none bg-background py-4 focus:rounded-md dark:focus:border-primary/70 
                      data-[state=open]:rounded-md data-[state=open]:border-2 data-[state=open]:border-[#C7C7C7]"
                    >
                      <SelectValue placeholder="On-Site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="na" className="text-muted-foreground">
                        Not Specified
                      </SelectItem>
                      <SelectItem value="onsite">On-Site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger
                      className="w-full rounded-none bg-background py-4 focus:rounded-md dark:focus:border-primary/70 
                      data-[state=open]:rounded-md data-[state=open]:border-2 data-[state=open]:border-[#C7C7C7]"
                    >
                      <SelectValue placeholder="Employement Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="na" className="text-muted-foreground">
                        Not Specified
                      </SelectItem>
                      <SelectItem value="onsite">Full-Time</SelectItem>
                      <SelectItem value="remote">Part-Time</SelectItem>
                      <SelectItem value="hybrid">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Textarea
              id="job-description"
              placeholder="Job Description"
              className="bg-background overflow-auto leading-6 rounded-none min-h-20 max-h-37
                            [scrollbar-width:thin]
                            [scrollbar-color:#d1d5db_transparent] 
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
            />
            <Textarea
              id="responsibilities"
              placeholder="Job Responsibilities"
              className="bg-background overflow-auto leading-6 rounded-none min-h-20 max-h-37
                            [scrollbar-width:thin]
                            [scrollbar-color:#d1d5db_transparent] 
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
            />
            <Textarea
              id="requirements"
              placeholder="Key Requirements"
              className="bg-background overflow-auto leading-6 rounded-none min-h-20 max-h-37
                            [scrollbar-width:thin]
                            [scrollbar-color:#d1d5db_transparent] 
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <PlatformCombobox
                value={platform}
                onChange={setPlatform}
                placeholder="Where did you find the job?"
              />
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Paste source Url"
                  className="rounded-none bg-background py-4"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="absolute right-2 h-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none" />
                  </TooltipTrigger>
                  <TooltipContent>Make sure to paste valid url.</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
