"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthGuard from "@/hooks/auth-guard";
import { SearchModal } from "@/components/search-modal";
import { useState, useCallback, useEffect } from "react";
import {
  Calendar,
  Users,
  Upload,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";

const adminPages = [
  { title: "Live Exams", path: "/admin", icon: Calendar },
  { title: "Candidates", path: "/admin/students", icon: Users },
  { title: "Content", path: "/admin/content", icon: Upload },
  { title: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { title: "Security", path: "/admin/security", icon: Shield },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Hotkey: Ctrl+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AuthGuard role={["admin", "super_admin"]}>
      <SidebarProvider>
        <AppSidebar variant="inset" onSearch={() => setSearchOpen(true)} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
        </SidebarInset>
        <SearchModal
          open={searchOpen}
          onOpenChange={setSearchOpen}
          pages={adminPages}
        />
      </SidebarProvider>
    </AuthGuard>
  );
}
