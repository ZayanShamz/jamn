"use client";

import type { Job } from "@/lib/types";
import { fetchUserJobs } from "@/lib/firebaseUtils";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ExternalLink, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import JobSubmitDialog from "@/components/JobSubmitDialog";
import { useKeyboardAdjustment } from "@/hooks/useKeyboardAdjustment";

export default function dashboard() {
  useKeyboardAdjustment();

  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState<Job[]>([]);

  const [jobInfo, setJobInfo] = useState<string>("");
  const [extracting, setExtracting] = useState(false);

  const [showAddJobDialog, setShowAddJobDialog] = useState(false);
  const [showJobSubmitDialog, setShowJobSubmitDialog] = useState(false);
  const [extractedJobData, setExtractedJobData] = useState<any>(null);

  const refetchJobs = async () => {
    const userJobs = await fetchUserJobs();
    setJobs(userJobs);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not logged in");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username || null);
        } else {
          console.log("User data not available!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    refetchJobs();
  }, []);

  // ---------------------------------------
  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();

    setExtracting(true);

    try {
      console.log("Sending job data to /api/extract-job...", { text: jobInfo });

      const res = await fetch("/api/extract-job", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: jobInfo,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }

      toast.success("Job data extracted successfully!", { dismissible: true });
      setJobInfo("");
      setExtractedJobData(data.job);
      setShowJobSubmitDialog(true);
      setShowAddJobDialog(false);
    } catch (err: any) {
      console.error("Extraction failed:", err.message);
      toast.error(`Error: ${err.message}`, { dismissible: true });
    } finally {
      setExtracting(false);
    }
  };

  // Manual Job Addition
  const handleManualAdd = () => {
    setExtractedJobData(null);
    setShowAddJobDialog(false);
    setShowJobSubmitDialog(true);
    setJobInfo("");
  };
  // ------------------------------------

  const handleJobSaved = async () => {
    setShowAddJobDialog(false);
    setShowJobSubmitDialog(false);
    await refetchJobs();
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="h-dvh w-full pt-20">
        <div className="flex flex-col items-center justify-center select-none">
          <h1 className="flex text-2xl font-semibold py-8">
            Welcome, &nbsp;
            {username ? (
              username
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link
                    href="/user-info"
                    className="flex relative items-center gap-1 pr-6 hover:underline"
                  >
                    User
                    <ExternalLink className="absolute right-0 top-0 w-4 h-4" />
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-[#171616] text-white border-[#2f2e2e] rounded-none">
                  <h2 className="font-bold mb-2">Complete Your Profile</h2>
                  <p className="text-sm ">
                    It looks like you haven't set up your username yet. Click
                    the link to complete your profile and get started!
                  </p>
                </HoverCardContent>
              </HoverCard>
            )}
          </h1>
          <div className="px-5">
            <div className="flex flex-col p-8 justify-center items-center gap-5 h-35 bg-white">
              <h3 className="text-center">
                Applied for a new job? Add now and keep track of all your job
                applications here
              </h3>
              <div>
                <Dialog
                  open={showAddJobDialog}
                  onOpenChange={setShowAddJobDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="rounded-none">Add Your Job</Button>
                  </DialogTrigger>
                  <DialogContent
                    className="bg-[#f8f7f7] dark:bg-[#171616] border-[#2f2e2e] rounded-none
                  max-h-[85dvh] overflow-y-auto top-[50%] translate-y-[-50%]
    [scrollbar-width:thin]
    [scrollbar-color:#d1d5db_transparent]"
                  >
                    <form onSubmit={handleExtract}>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold cursor-default">
                          Get Job Details
                        </DialogTitle>
                        <DialogDescription className="text-sm cursor-default">
                          Make sure to Copy all the essential data from the
                          source!
                        </DialogDescription>
                      </DialogHeader>

                      <Textarea
                        placeholder="Paste the job details here."
                        className="bg-[#ffff] dark:bg-[#2f2e2e] resize-none mt-3 overflow-auto leading-6 rounded-none min-h-20 max-h-37
                            [scrollbar-width:thin]
                            [scrollbar-color:#d1d5db_transparent] 
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
                        value={jobInfo}
                        onChange={(e) => setJobInfo(e.target.value)}
                      />
                      <span className="text-sm text-gray-500 mt-2">
                        or{" "}
                        <span
                          className="text-blue-500 underline underline-offset-2 cursor-pointer"
                          onClick={handleManualAdd}
                        >
                          add manually
                        </span>
                      </span>
                      <DialogFooter className="justify-end mt-4 gap-4 flex-row!">
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="rounded-none bg-transparent dark:hover:bg-gray-200 w-auto"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          disabled={extracting || !jobInfo.trim()}
                          className="rounded-none bg-blue-500 hover:bg-blue-700"
                        >
                          {extracting ? "Extracting..." : "Extract"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={showJobSubmitDialog}
                  onOpenChange={setShowJobSubmitDialog}
                >
                  <DialogContent className="fixed h-[90dvh] p-0 gap-0 bg-background rounded-none">
                    <JobSubmitDialog
                      jobData={extractedJobData}
                      onClose={handleJobSaved}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* maybe in a distant future i'll make good use of you :)  */}
          {/* <div className=" w-[90%] md:w-[40%] flex gap-2 mt-4">
            <Input
              placeholder="Paste URL Here"
              type="url"
              className="rounded-none"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
            <Button
              className="ml-2 rounded-none cursor-pointer bg-blue-500 hover:bg-blue-700"
              // onClick={handleExtractJob}
              disabled={extracting || !jobUrl.trim()}
            >
              {extracting ? "Extracting Job Info..." : "Extract Job Info"}
            </Button>
          </div> */}
        </div>
        <div className="w-full flex items-center justify-center py-10">
          <div className="w-[95%] md:w-[60%] py-5 bg-[#FFFFFF] border border-amber-50 ">
            <div className="w-full"></div>
            <div className="w-full px-5">
              <Table className="">
                {/* <TableCaption></TableCaption> */}
                <TableHeader>
                  <TableRow className="hover:bg-transparent cursor-default text-lg select-none">
                    <TableHead></TableHead>
                    <TableHead className="font-semibold">Job Title</TableHead>
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">
                      Date Apllied
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No jobs found. Add your first one!
                      </TableCell>
                    </TableRow>
                  ) : (
                    jobs.map((job, index) => (
                      <TableRow key={job.id} className="cursor-pointer">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="pl-3 border-x">
                          {job.job_title}
                        </TableCell>
                        <TableCell className="pl-3">{job.company}</TableCell>
                        <TableCell className="pl-3 border-x">
                          {job.status}
                        </TableCell>
                        <TableCell className="pl-3">
                          {job.applied_date || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
