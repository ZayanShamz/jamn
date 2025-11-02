"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function dashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="h-dvh w-full">
        <div className="flex flex-col gap-3 h-full items-center justify-center">
          <h1 className="text-3xl font-bold cursor-default">Dashboard</h1>
          <h1 className="flex text-2xl font-semibold">
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
        </div>
      </div>
    </>
  );
}

export default dashboard;
