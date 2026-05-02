import { redirect } from "next/navigation";

import { auth, signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    return await signIn("discord");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      isActive: true,
      isOnboarded: true,
    },
  });

  if (!user || !user.isActive) {
    return await signIn("discord");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}
