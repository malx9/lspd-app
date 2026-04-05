import { signIn, signOut } from "@/lib/auth";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
        Login with Discord
      </button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="rounded-md bg-neutral-800 px-4 py-2 text-white">
        Sign out
      </button>
    </form>
  );
}
