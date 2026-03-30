import { prisma } from "@/lib/prisma";

export default async function Home() {
  const usersCount = await prisma.user.count();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">LSPD App</h1>
      <p className="mt-4">Users in database: {usersCount}</p>
    </main>
  );
}
