"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { set } from "firebase/database";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="h-svh w-full flex items-center justify-center">
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
          <Button
            className="bg-green-500 cursor-pointer rounded-none hover:bg-green-600"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
          <div className="text-sm text-center">
            <span className="cursor-default">New Here?</span>
            <Link href="/register" className="text-amber-50 underline ml-1">
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
