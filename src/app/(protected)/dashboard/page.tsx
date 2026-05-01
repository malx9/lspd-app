import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Witaj, {session.user.nickname}</h1>
    </main>
  );
}
