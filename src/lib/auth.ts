import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

const REQUIRED_GUILD_ID = process.env.DISCORD_REQUIRED_GUILD_ID;

if (!process.env.AUTH_DISCORD_ID) {
  throw new Error("Missing AUTH_DISCORD_ID");
}

if (!process.env.AUTH_DISCORD_SECRET) {
  throw new Error("Missing AUTH_DISCORD_SECRET");
}

if (!REQUIRED_GUILD_ID) {
  throw new Error("Missing DISCORD_REQUIRED_GUILD_ID");
}

type DiscordProfile = {
  id: string;
  username?: string;
  global_name?: string | null;
  email?: string | null;
  image_url?: string | null;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Discord({
      authorization: {
        params: {
          scope: "identify guilds.members.read",
        },
      },

      profile(profile) {
        const p = profile as DiscordProfile;

        return {
          id: p.id,
          name: p.global_name ?? p.username ?? null,
          email: p.email ?? null,
          image: p.image_url ?? null,

          discordId: p.id,
          discordUsername: p.username ?? "",
          displayName: p.global_name ?? p.username ?? null,

          role: "MEMBER",
          isActive: true,
          isOnboarded: false,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "discord") {
        return false;
      }

      const accessToken = account.access_token;
      if (!accessToken) {
        return false;
      }

      const discordProfile = profile as DiscordProfile | undefined;
      const discordId = discordProfile?.id;

      if (!discordId) {
        return false;
      }

      try {
        const response = await fetch(
          `https://discord.com/api/guilds/${REQUIRED_GUILD_ID}/members/${discordId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
            cache: "no-store",
          },
        );

        const guildResponse = await fetch(
          `https://discord.com/api/guilds/${REQUIRED_GUILD_ID}`,
          {
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
            cache: "no-store",
          },
        );

        console.log("ENV CHECK", {
          hasBotToken: !!process.env.DISCORD_BOT_TOKEN,
          guildId: process.env.DISCORD_REQUIRED_GUILD_ID,
          discordClientId: process.env.AUTH_DISCORD_ID,
          botTokenPreview: process.env.DISCORD_BOT_TOKEN
            ? `${process.env.DISCORD_BOT_TOKEN.slice(0, 6)}...${process.env.DISCORD_BOT_TOKEN.slice(-6)}`
            : null,
        });

        console.log("GUILD EXISTENCE STATUS:", guildResponse.status);
        console.log("GUILD EXISTENCE BODY:", await guildResponse.text());

        console.log("GUILD CHECK STATUS:", response.status);

        const text = await response.text();
        console.log("GUILD CHECK BODY:", text);

        // User is not in the required guild
        if (!response.ok) {
          return false;
        }

        // Optional local block
        const existingUser = await prisma.user.findUnique({
          where: { discordId },
          select: { isActive: true },
        });

        if (existingUser && !existingUser.isActive) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Discord guild membership check failed:", error);
        return false;
      }
    },

    async session({ session, user }) {
      if (!session.user) {
        return session;
      }

      session.user.id = user.id;
      session.user.role = user.role;
      session.user.isActive = user.isActive;
      session.user.isOnboarded = user.isOnboarded;

      session.user.discordId = user.discordId;
      session.user.discordUsername = user.discordUsername;
      session.user.displayName = user.displayName;
      session.user.nickname = user.nickname;

      session.user.name = user.name;
      session.user.email = user.email;
      session.user.image = user.image;

      return session;
    },
  },

  // Optional later:
  // pages: {
  //   error: "/auth/error",
  // },
});
