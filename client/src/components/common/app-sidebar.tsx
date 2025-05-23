"use client"; // Marks the file as a client component

// Importing required icons
import { Globe, Users, LogOut, Key } from "lucide-react";

// Next.js and authentication hooks
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

// Custom UI components
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui";

// Sidebar navigation component for the app
export function AppSidebar() {
  const { logout, user } = useAuth(); // Access user and logout function
  const pathname = usePathname(); // Get current route path

  return (
    <Sidebar>
      <div className="flex h-full flex-col">
        {/* Sidebar top header section */}
        <SidebarHeader className="border-b flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
            <span className="font-semibold">Dashboard</span>
          </Link>
        </SidebarHeader>

        {/* Sidebar main menu */}
        <SidebarContent className="flex-1">
          <SidebarMenu>
            {/* Link to Countries page */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/countries"}>
                <Link href="/countries">
                  <Globe className="w-4 h-4" />
                  <span>Countries</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Admin-only link to Users page */}
            {user?.role === "ADMIN" && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/users"}>
                  <Link href="/users">
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {/* Link to API Keys page */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/api-keys"}>
                <Link href="/api-keys">
                  <Key className="w-4 h-4" />
                  <span>API Keys</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        {/* Sidebar bottom logout button */}
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
