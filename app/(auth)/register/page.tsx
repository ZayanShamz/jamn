"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="h-dvh w-full flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 p-8 border border-amber-50"
        >
          <h2 className="text-xl font-bold cursor-default">Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border py-2 px-3"
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border py-2 px-3 pr-10"
              required
            />
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none px-3 py-2 rounded-r-md rounded-l-3xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-3 cursor-pointer"
          >
            Register
          </button>
          <div className="text-sm text-center">
            <span className="cursor-default">Already have an account?</span>
            <Link href="/login" className="text-amber-50 underline ml-1">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
