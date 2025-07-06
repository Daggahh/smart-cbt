"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  role:
    | "admin"
    | "super_admin"
    | "student"
    | ("admin" | "super_admin" | "student")[];
}

export default function AuthGuard({ children, role }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Normalize role prop to array
  const allowedRoles = Array.isArray(role) ? role : [role];

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      // No session, redirect to appropriate login
      if (
        allowedRoles.includes("admin") ||
        allowedRoles.includes("super_admin")
      ) {
        router.push("/auth/admin/login");
      } else if (allowedRoles.includes("student")) {
        router.push("/auth/student/login");
      }
      return;
    }
    // Check role
    const userRole = (session.user as any)?.role;
    if (!allowedRoles.includes(userRole)) {
      if (
        allowedRoles.includes("admin") ||
        allowedRoles.includes("super_admin")
      ) {
        router.push("/auth/admin/login?error=unauthorized");
      } else if (allowedRoles.includes("student")) {
        router.push("/auth/student/login?error=unauthorized");
      }
      return;
    }
  }, [session, status, router, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!session || !allowedRoles.includes((session.user as any)?.role)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-slate-600 dark:text-gray-400 mt-2">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
