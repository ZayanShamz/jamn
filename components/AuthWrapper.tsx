"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { is } from "date-fns/locale";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isOnboarding = pathname === "/user-info";

  const isReady = !loading && !profileLoading;

  useEffect(() => {
    if (!isReady) return;

    const isAuth = !!user;
    const hasProfile = !!profile;

    if (!isAuth && !isAuthRoute && !isOnboarding) {
      // Unauthenticated user trying to access a protected page
      router.replace("/login");
    } else if (isAuth && !hasProfile && !isOnboarding) {
      // Authenticated but hasn't completed onboarding
      router.replace("/user-info");
    } else if (
      isAuth &&
      hasProfile &&
      (isAuthRoute || isOnboarding || pathname === "/")
    ) {
      // Fully set up user trying to access auth/onboarding pages
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, profile]);

  if (!isReady)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );

  // Block render for one frame while redirect is in progress
  const isAuth = !!user;
  const hasProfile = !!profile;

  if (!isAuth && !isAuthRoute && !isOnboarding) return null;
  if (isAuth && !hasProfile && !isOnboarding) return null;
  if (isAuth && hasProfile && (isAuthRoute || isOnboarding || pathname === "/"))
    return null;

  return <>{children}</>;
}
