import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      isActive?: boolean;
      isOnboarded?: boolean;
      discordId?: string;
      discordUsername?: string;
      displayName?: string | null;
      nickname?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    isActive?: boolean;
    isOnboarded?: boolean;
    discordId?: string;
    discordUsername?: string;
    displayName?: string | null;
    nickname?: string | null;
  }
}
