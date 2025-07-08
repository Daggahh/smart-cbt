"use client";

import { Upload, type LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  role = "admin",
}: {
  items: { title: string; url: string; icon?: LucideIcon }[];
  role?: "admin" | "super_admin" | "student";
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {role === "admin" || role === "super_admin" ? (
            <SidebarMenuItem className="flex items-center gap-2 mb-4">
              <SidebarMenuButton
                asChild
                className="min-w-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition-transform duration-150 justify-center items-center text-center"
              >
                <Link href="/admin/exams/create">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Upload className="w-5 h-5" />
                    <span>Create Exam</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
