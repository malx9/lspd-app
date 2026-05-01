import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppTopbar } from "@/components/navigation/AppTopbar";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      discordUsername: true,
      displayName: true,
      nickname: true,
      image: true,
      role: true,
      isActive: true,
      isOnboarded: true,
    },
  });

  if (!user || !user.isActive) {
    redirect("/login");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "5rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset className="app-background min-h-dvh">
          <AppTopbar
            username={user.nickname ?? user.discordUsername}
            trigger={<SidebarTrigger />}
            displayName={user.displayName ?? user.discordUsername}
            image={user.image}
            role={user.role}
          />

          <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
