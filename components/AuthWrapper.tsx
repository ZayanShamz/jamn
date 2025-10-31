"use client";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If not logged in → redirect to login page
      if (!user && pathname !== "/login" && pathname !== "/register") {
        router.replace("/login");
      }
      // If logged in → prevent access to login or signup
      else if (
        user &&
        (pathname === "/login" || pathname === "/register" || pathname === "/")
      ) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );

  return <>{children}</>;
}
