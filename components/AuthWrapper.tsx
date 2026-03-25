"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isOnboarding = pathname === "/user-info";
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (loading || profileLoading) return;
    if (isAdminRoute) return;

    const isAuth = !!user;
    const hasProfile = !!profile;

    if (isAuth && !hasProfile && !isOnboarding) {
      router.replace("/user-info");
    }
  }, [
    user,
    profile,
    loading,
    profileLoading,
    isOnboarding,
    isAdminRoute,
    router,
  ]);

  return <>{children}</>;
}
