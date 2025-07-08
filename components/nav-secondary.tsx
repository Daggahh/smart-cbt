"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  onSearch,
  iconSize = 16,
  ...props
}: {
  items: { title: string; url: string; icon: LucideIcon }[];
  onSearch?: () => void;
  iconSize?: number;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Search" ? (
                <SidebarMenuButton
                  asChild={false}
                  onClick={onSearch}
                  className="flex items-center justify-between group"
                  tooltip="Search"
                >
                  <span className="flex items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0">
                    <item.icon
                      className={`!w-[${iconSize}px] !h-[${iconSize}px] align-middle`}
                    />
                    <span>{item.title}</span>
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                    Ctrl+K
                  </span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  className={
                    item.title === "Settings" ? "group/settings" : undefined
                  }
                >
                  <a href={item.url}>
                    <item.icon
                      className={`!w-[${iconSize}px] !h-[${iconSize}px] align-middle ${
                        item.title === "Settings"
                          ? "transition-transform group-hover/settings:rotate-180"
                          : ""
                      }`}
                    />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
