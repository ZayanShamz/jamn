"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/firebase-errors";
import { emailRules, passwordRules } from "@/lib/validations";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";

interface RegisterFormData {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/user-info");
      console.log("Registration successful!");
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-3 w-full"
      >
        <h2 className="text-xl font-bold cursor-default">Register</h2>

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
          className="bg-blue-500 cursor-pointer rounded-none hover:bg-blue-600"
          disabled={loading}
          type="submit"
        >
          {loading ? "Registering" : "Register"}
        </Button>

        <div className="text-sm text-center">
          <span className="cursor-default">Already have an account?</span>
          <Link href="/login" className="dark:text-amber-50 underline ml-1">
            Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
