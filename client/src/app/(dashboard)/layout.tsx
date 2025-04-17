"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AppSidebar } from "@/components/common/app-sidebar";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  SidebarProvider,
} from "@/components/ui";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Static sidebar */}
        <div className="fixed left-0 top-0 bottom-0 z-20">
          <AppSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          {/* Fixed header */}
          <header className="fixed top-0 right-0 left-64 z-10 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="h-full w-full px-4 flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-accent"
                onClick={() => setIsProfileOpen(true)}
              >
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </header>

          {/* Scrollable content area */}
          <main className="pt-14 h-screen overflow-auto">{children}</main>
        </div>

        {/* Profile dialog */}
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Profile Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Full Name
                </span>
                <span className="text-base">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Email
                </span>
                <span className="text-base">{user.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Mobile
                </span>
                <span className="text-base">{user.mobile}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Role
                </span>
                <span className="text-base capitalize">
                  {user.role.toLowerCase()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Status
                </span>
                <span className="text-base">
                  {user.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
