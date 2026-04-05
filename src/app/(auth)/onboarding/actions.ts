"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type ActionState = {
  error?: string;
};

export async function completeOnboarding(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in." };
  }

  const nicknameRaw = formData.get("nickname");
  const nickname = typeof nicknameRaw === "string" ? nicknameRaw.trim() : "";

  if (nickname.length < 3) {
    return { error: "Nickname must be at least 3 characters." };
  }

  if (nickname.length > 32) {
    return { error: "Nickname must be 32 characters or fewer." };
  }

  const existing = await prisma.user.findFirst({
    where: {
      nickname: {
        equals: nickname,
        mode: "insensitive",
      },
      NOT: {
        id: session.user.id,
      },
    },
    select: { id: true },
  });

  if (existing) {
    return { error: "This nickname is already taken." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      nickname,
      isOnboarded: true,
    },
  });

  redirect("/dashboard");
}
