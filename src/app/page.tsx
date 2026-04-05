import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SignInButton, SignOutButton } from "@/components/auth-buttons";

export default async function Home() {
  const session = await auth();
  const usersCount = await prisma.user.count();

  return (
    <main className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">LSPD App</h1>
        <p className="mt-2">Users in database: {usersCount}</p>
      </div>

      {session?.user ? (
        <div className="space-y-3">
          <p>
            Logged in as: {session.user.name ?? session.user.email ?? "User"}
          </p>

          <div className="flex gap-3">
            <SignOutButton />
            <Link href="/dashboard" className="underline">
              Protected page
            </Link>
          </div>
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
