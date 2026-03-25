"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // wait for auth state to resolve before rendering anything
  if (loading) return null;

  // Don't render if not admin
  if (!user || user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) return null;

  return <div className="min-h-screen p-6">{children}</div>;
}
