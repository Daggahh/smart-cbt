"use client";

import { SmartCBTLogo } from "@/components/smart-cbt-logo";
import {
  Users,
  BarChart3,
  Shield,
  Settings,
  Search as SearchIcon,
  Upload,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import * as React from "react";
import { useSession } from "next-auth/react";
import { IconDashboard } from "@tabler/icons-react";

// Sidebar nav links for admin
const adminNavLinks = [
  { title: "Overview", url: "/admin", icon: IconDashboard },
  { title: "Candidates", url: "/admin/students", icon: Users },
  { title: "Content", url: "/admin/content", icon: Upload },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Security", url: "/admin/security", icon: Shield },
];

const adminSecondary = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Search", url: "#search", icon: SearchIcon },
];

export function AppSidebar({
  role = "admin",
  onSearch,
  ...props
}: {
  role?: "admin" | "super_admin" | "student";
  onSearch?: () => void;
} & React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const user = session?.user
    ? {
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || undefined,
        role: (session.user as any).role || undefined,
      }
    : undefined;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin">
                <SmartCBTLogo className="h-7 w-7" />
                <span className="text-base text-gray-900 dark:text-sidebar-foreground font-bold ml-2">Smart CBT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminNavLinks} role={role} />
        <NavSecondary
          items={adminSecondary}
          className="mt-auto"
          iconSize={16}
          onSearch={onSearch}
        />
      </SidebarContent>
      <SidebarFooter>
        {status === "loading" ? null : user ? <NavUser user={user} /> : null}
      </SidebarFooter>
    </Sidebar>
  );
}
