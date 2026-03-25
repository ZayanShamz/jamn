"use client";
import { useState } from "react";
import { getAuthErrorMessage } from "@/lib/firebase-errors";
import { emailRules, passwordRules } from "@/lib/validations";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/AuthCard";
import { toast } from "sonner";
import { FormField } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { login } from "@/lib/auth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login error caught:", error.message);
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-3 w-full"
      >
        <h2 className="text-xl font-bold cursor-default">Login</h2>

        <FormField error={errors.email?.message}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", emailRules)}
            className="border py-2 px-3 w-full h-12"
          />
        </FormField>

        <FormField error={errors.password?.message}>
          <PasswordInput
            placeholder="Password"
            {...register("password", passwordRules)}
          />
        </FormField>

        <Button
          className="bg-green-500 cursor-pointer rounded-none hover:bg-green-600"
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging In..." : "Login"}
        </Button>
        <div className="text-sm text-center">
          <span className="cursor-default">New Here?</span>
          <Link href="/register" className="dark:text-amber-50 underline ml-1">
            Sign up now
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
