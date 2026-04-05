import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import OnboardingForm from "./_components/onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <OnboardingForm
          defaultNickname=""
          discordUsername={session.user.discordUsername ?? ""}
          displayName={session.user.displayName ?? ""}
        />
      </div>
    </div>
  );
}
