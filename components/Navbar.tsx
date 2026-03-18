"use client";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface NavbarProps {
  onNewJob?: () => void;
}

export default function Navbar({ onNewJob }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/login");
    } catch (error) {
      console;
    }
  };
  return (
    <>
      <div className="w-full p-3 fixed z-50 start-0 top-0 flex justify-between bg-[#171616]">
        <h1 className="text-2xl font-bold text-amber-50 cursor-default">
          jamn!
        </h1>
        <Button className="rounded-none" onClick={onNewJob}>
          New Job <Plus />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild className="cursor-pointer">
            <Button
              variant={"destructive"}
              className="rounded-none cursor-pointer font-bold"
            >
              Logout
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="rounded-none gap-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-center cursor-default py-3">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="py-3 text-md text-center dark:text-gray-400 cursor-default">
                You will be logged out of your account. You'll have to log in
                again to access your dashboard and job applications.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer rounded-none dark:hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer text-white bg-red-500 hover:bg-red-800 rounded-none"
                onClick={handleLogout}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
