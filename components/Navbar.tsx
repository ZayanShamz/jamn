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

export default function Navbar() {
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
      <div className="w-full p-3 fixed start-0 top-0 flex justify-between bg-[#171616] ">
        <h1 className="text-2xl font-bold text-amber-50 cursor-default">
          jamn!
        </h1>{" "}
        <AlertDialog>
          <AlertDialogTrigger asChild className="cursor-pointer">
            <button className="bg-green-500 text-white py-1 px-3 cursor-pointer ">
              Logout
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-none">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-md text-amber-50">
                You will be logged out of your account. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer rounded-none">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer text-white bg-red-500 hover:bg-red-800 rounded-none"
                onClick={() => {
                  handleLogout();
                }}
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
