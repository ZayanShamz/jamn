"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("newUser", "true");
      router.push("/user-info");
      console.log("Registration successful!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setloading(false);
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
          <Button
            className="bg-blue-500 cursor-pointer rounded-none hover:bg-blue-600"
            disabled={loading}
            type="submit"
          >
            {loading ? "Registering" : "Register"}
          </Button>

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
