import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/dashboard");
  }

  return <div>...</div>;
}
