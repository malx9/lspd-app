"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Users, FileCheck, Shield } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Lista członków", href: "/characters", icon: Users },
  { title: "Aplikacje o postacie", href: "/applications", icon: FileCheck },
  { title: "Admin", href: "/admin", icon: Shield },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <div className="flex h-14 items-center px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="relative size-10 shrink-0">
            <Image
              src="/lspd-logo.png"
              alt="LSPD"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="ml-3 flex min-w-0 flex-col overflow-hidden leading-tight transition-all duration-200 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:translate-x-1.5">
            <span className="truncate text-sm font-semibold tracking-tight">
              LSPD Database
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Centrum Frakcyjne
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Menu
          </SidebarGroupLabel>

          <SidebarMenu className="group-data-[collapsible=icon]:items-center gap-1.5 group-data-[collapsible=icon]:gap-4">
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="
    h-10
    [&_svg]:size-5!
    group-data-[collapsible=icon]:h-12
    group-data-[collapsible=icon]:w-12
    group-data-[collapsible=icon]:my-1
    group-data-[collapsible=icon]:justify-center
    group-data-[collapsible=icon]:p-0
  "
                >
                  <Link href={item.href}>
                    <item.icon className="size-5 group-data-[collapsible=icon]:size-5!" />

                    <span
                      className="
        transition-opacity
        group-data-[collapsible=icon]:sr-only
      "
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
