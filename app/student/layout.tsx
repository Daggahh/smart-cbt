"use client";
import AuthGuard from "@/hooks/auth-guard";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard role="student">{children}</AuthGuard>;
}
