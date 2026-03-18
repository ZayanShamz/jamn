"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import JobSubmitDialog from "@/components/JobSubmitDialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onJobSaved: () => Promise<void>;
}

export default function AddJobDialog({
  open,
  onOpenChange,
  onJobSaved,
}: AddJobDialogProps) {
  const [jobInfo, setJobInfo] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [showJobSubmitDialog, setShowJobSubmitDialog] = useState(false);
  const [extractedJobData, setExtractedJobData] = useState<any>(null);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setExtracting(true);
    try {
      const res = await fetch("/api/extract-job", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: jobInfo,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      toast.success("Job data extracted successfully!", { dismissible: true });
      setJobInfo("");
      setExtractedJobData(data.job);
      onOpenChange(false);
      setShowJobSubmitDialog(true);
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { dismissible: true });
    } finally {
      setExtracting(false);
    }
  };

  const handleManualAdd = () => {
    setExtractedJobData(null);
    setJobInfo("");
    onOpenChange(false);
    setShowJobSubmitDialog(true);
  };

  const handleJobSaved = async () => {
    setShowJobSubmitDialog(false);
    await onJobSaved();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="bg-[#f8f7f7] dark:bg-[#171616] border-[#2f2e2e] rounded-none
          max-h-[calc(100vh-20px)] overflow-y-auto! p-0"
        >
          <form onSubmit={handleExtract}>
            <DialogHeader className="px-6">
              <DialogTitle className="text-2xl font-bold cursor-default mt-5 py-2">
                Get Job Details
              </DialogTitle>
              <DialogDescription className="text-sm dark:text-muted-foreground text-neutral-400 cursor-default">
                Make sure to copy all the essential data from the source!
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <Textarea
                placeholder="Paste the job details here."
                className="bg-white dark:bg-[#2f2e2e] text-[#2f2e2e] dark:text-white resize-none mt-3 overflow-auto leading-6 rounded-none min-h-20 max-h-37
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
            </div>
            <DialogFooter className="justify-end gap-4 flex-row! px-6 pb-6">
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
                className="rounded-none bg-blue-500 hover:bg-blue-700 text-white"
              >
                {extracting ? "Extracting..." : "Extract"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showJobSubmitDialog} onOpenChange={setShowJobSubmitDialog}>
        <DialogContent className="fixed h-[90dvh] p-0 gap-0 bg-background rounded-none">
          <JobSubmitDialog
            jobData={extractedJobData}
            onClose={handleJobSaved}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
