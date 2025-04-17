"use client";

import { Globe, Users, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar>
      <div className="flex h-full flex-col">
        <SidebarHeader className="border-b flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
            <span className="font-semibold">Dashboard</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/countries"}>
                <Link href="/countries">
                  <Globe className="w-4 h-4" />
                  <span>Countries</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/users"}>
                <Link href="/users">
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t flex-shrink-0">
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
