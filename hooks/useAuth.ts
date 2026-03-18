"use client";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export interface UserProfile {
  username: string;
  email: string;
  createdAt: unknown;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    setProfileLoading(true);
    const snap = await getDoc(doc(db, "users", uid));
    setProfile(snap.exists() ? (snap.data() as UserProfile) : null);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await fetchProfile(currentUser.uid);
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  const refetchProfile = useCallback(() => {
    if (user) fetchProfile(user.uid);
  }, [user, fetchProfile]);

  return { user, profile, loading, profileLoading, refetchProfile };
}
