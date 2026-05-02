"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type AppTopbarProps = {
  trigger?: React.ReactNode;
  username: string;
  displayName: string;
  image?: string | null;
  role: string;
};

export function AppTopbar({
  trigger,
  username,
  displayName,
  image,
  role,
}: AppTopbarProps) {
  const fallback = username.slice(0, 2).toUpperCase();

  return (
    <header className=" top-0 z-30 flex h-16 items-center bg-transparent justify-between px-6 backdrop-blur">
      <div className="flex items-center gap-2">{trigger}</div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="size-5" />
        </Button>

        <div className="flex items-center gap-3 rounded-full bg-card/70 px-3 py-2">
          <Avatar className="size-8">
            <AvatarImage src={image ?? ""} alt={displayName} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
