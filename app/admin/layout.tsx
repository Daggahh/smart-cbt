"use client";
import AuthGuard from "@/hooks/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard role={["admin", "super_admin"]}>{children}</AuthGuard>;
}
