import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email: string, password: string): Promise<void> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const idToken = await userCredential.user.getIdToken();

  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error("Session creation failed");
};

export const logout = async (): Promise<void> => {
  await fetch("/api/auth/session", { method: "DELETE" });
  await signOut(auth);
  window.location.href = "/login";
};
