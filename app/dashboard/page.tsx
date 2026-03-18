"use client";

import type { Job } from "@/lib/types";
import { fetchUserJobs } from "@/lib/firebaseUtils";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AddJobDialog from "@/components/AddJobDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DashBoardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAddJobDialog, setShowAddJobDialog] = useState(false);

  const refetchJobs = async () => {
    const userJobs = await fetchUserJobs();
    setJobs(userJobs);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
          setUsername(userSnap.data().username || null);
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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );

  return (
    <>
      <Navbar onNewJob={() => setShowAddJobDialog(true)} />
      <AddJobDialog
        open={showAddJobDialog}
        onOpenChange={setShowAddJobDialog}
        onJobSaved={refetchJobs}
      />
      <div className="flex flex-col h-dvh w-full pt-15">
        <div className="flex flex-col items-center justify-center select-none">
          <h1 className="flex text-2xl font-semibold py-8">
            Welcome, &nbsp;
            {username}
          </h1>
        </div>

        {jobs.length === 0 ? (
          <div className="flex-1 flex justify-center items-center px-5">
            <div className="flex flex-col p-8 justify-center items-center gap-5 h-fit w-fit border  bg-[#eeeded] dark:bg-[#171616]">
              <h3 className="text-center cursor-default">
                Applied for a new job? Add now and keep track of all your job
                applications in one plae.
              </h3>
              <div>
                <Button
                  variant="outline"
                  className="rounded-none px-5 font-semibold dark:hover:bg-gray-200"
                  onClick={() => setShowAddJobDialog(true)}
                >
                  New Job
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <div className="w-[95%] md:max-w-[70%] md:w-fit py-5 bg-[#ffffff] dark:bg-[#171616] border border-amber-50 dark:border-[#1F1F1F] shadow-sm">
              <div className="w-full px-5">
                <Table className="mb-5">
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
                    {jobs.map((job, index) => (
                      <TableRow key={job.id} className="cursor-pointer  ">
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
