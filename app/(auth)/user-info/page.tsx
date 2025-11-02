"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!username.trim()) {
      setIsAvailable(null);
      return;
    }

    const delay = setTimeout(async () => {
      setChecking(true);
      const q = query(
        collection(db, "users"),
        where("username_lower", "==", username.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      setIsAvailable(querySnapshot.empty);
      setChecking(false);
    }, 500); // debounce 500ms

    return () => clearTimeout(delay);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAvailable) {
      alert("Username is already taken");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      await setDoc(doc(db, "users", user.uid), {
        username: username.trim(),
        username_lower: username.trim().toLowerCase(),
        email: user.email,
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-svh w-full   flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-8 border border-amber-50 gap-3"
        >
          <h2 className="text-xl">Create your username</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border py-2 px-3 mt-4"
            required
          />
          {checking ? (
            <p className="text-xs text-gray-400">Checking availability...</p>
          ) : isAvailable === true ? (
            <p className="text-xs text-green-500">✅ Username available</p>
          ) : isAvailable === false ? (
            <p className="text-xs text-red-500">❌ Username taken</p>
          ) : null}
          <Button
            className="rounded-none cursor-pointer bg-blue-500 hover:bg-blue-700"
            type="submit"
            disabled={loading || checking || !isAvailable}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Link
            href="/dashboard"
            className="text-sm text-center text-gray-400 underline mt-2"
          >
            skip
          </Link>
        </form>
      </div>
    </>
  );
}
