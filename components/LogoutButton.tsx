"use client";

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
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
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
            You will be logged out of your account. You&apos;ll have to log in
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
  );
}
