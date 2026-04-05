import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("PROTECTED LAYOUT SESSION:", session);

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.isOnboarded) {
    redirect("/onboarding");
  }

  return <>{children}</>;
}
