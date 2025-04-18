"use client"; // Marks this file as a client-side component

// Icon imports
import { GlobeIcon, UsersIcon } from "lucide-react";

// Sidebar component and layout utilities
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// Authentication and routing
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar navigation component
export function AppSidebar() {
  const { user } = useAuth(); // Get current user from auth context
  const pathname = usePathname(); // Get current route

  // Define sidebar items, with conditional item for ADMIN users
  const items = [
    {
      title: "Countries",
      url: "/countries",
      icon: GlobeIcon,
    },
    ...(user?.role === "ADMIN"
      ? [
          {
            title: "Users",
            url: "/users",
            icon: UsersIcon,
          },
        ]
      : []), // Only include "Users" if role is ADMIN
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* Section label */}
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Render each menu item */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
