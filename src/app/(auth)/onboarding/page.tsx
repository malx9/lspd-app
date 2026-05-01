import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import OnboardingForm from "./_components/onboarding-form";
import Image from "next/image";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <div className="mt-5 flex flex-col gap-5 items-center justify-center">
      <Image src="/lspd-logo.png" width={200} height={200} alt=""></Image>
      <div className="w-full max-w-md">
        <OnboardingForm
          defaultNickname=""
          discordUsername={session.user.discordUsername ?? ""}
          displayName={session.user.displayName ?? ""}
          image={session.user.image}
        />
      </div>
    </div>
  );
}
