import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Protected</h1>
      <p className="mt-4">User ID: {session.user.id}</p>
      <p>Role: {session.user.role ?? "member"}</p>
    </main>
  );
}
