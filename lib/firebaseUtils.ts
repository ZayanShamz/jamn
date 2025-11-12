// lib/firebaseUtils.ts
import { auth, db } from "./firebase";
import type { Job } from "@/lib/types";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// Job type is defined in lib/types.ts

// job fetch function
export async function fetchUserJobs(): Promise<Job[]> {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const jobsRef = collection(db, "users", user.uid, "jobs");
    const q = query(jobsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error("fetchUserJobs error:", error);
    return [];
  }
}

// Job Save function
export async function saveJob(
  formData: Omit<Job, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const jobRef = doc(collection(db, "users", user.uid, "jobs"));
  await setDoc(jobRef, {
    ...formData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return jobRef.id;
}
