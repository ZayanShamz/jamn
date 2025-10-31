"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="h-svh w-full">
        <div className="flex h-full items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-3 p-8 border border-amber-50"
          >
            <h2 className="text-xl font-bold cursor-default">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border py-2 px-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border py-2 px-3"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-3 cursor-pointer"
            >
              Login
            </button>
            <div className="text-sm text-center">
              <span className="cursor-default">New Here?</span>
              <Link href="/register" className="text-amber-50 underline ml-1">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
