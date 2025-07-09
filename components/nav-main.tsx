"use client";

import { PlusCircleIcon, Upload, type LucideIcon } from "lucide-react";
import { type Icon } from "@tabler/icons-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type NavIcon = LucideIcon | Icon | React.ComponentType<any>;

export function NavMain({
  items,
  role = "admin",
}: {
  items: { title: string; url: string; icon?: NavIcon }[];
  role?: "admin" | "super_admin" | "student";
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {role === "admin" || role === "super_admin" ? (
            <SidebarMenuItem className="flex items-center gap-2 mb-4">
              <SidebarMenuButton
                asChild
                className="min-w-8 bg-gradient-to-r from-[#7F5AF0] to-[#2CB67D] text-white font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition-transform duration-150 justify-center items-center text-center border-0 dark:from-[#7F5AF0] dark:to-[#2CB67D]"
              >
                <Link href="/admin/exams/create">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>Create Exam</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={isActive ? "bg-accent text-accent-foreground" : ""}
                >
                  <Link
                    href={item.url}
                    className="text-black dark:text-sidebar-foreground"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
