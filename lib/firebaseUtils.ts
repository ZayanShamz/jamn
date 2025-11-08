// lib/firebaseUtils.ts
import { auth, db } from "./firebase";
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

// === TYPES ===
export interface Job {
  id: string;
  job_title: string;
  company: string;
  location: string;
  work_arrangement: string;
  employment_type: string;
  job_description: string;
  responsibilities: string;
  requirements: string;
  salary: string;
  applied_date: string;
  platform: string;
  source_url: string;
  user_notes: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

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
