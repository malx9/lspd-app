import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: Request) {
  const session = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/characters") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/admin");

  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (!session?.user) {
    if (isProtectedRoute || isOnboardingRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!session.user.isOnboarded && isProtectedRoute) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (session.user.isOnboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/characters/:path*",
    "/applications/:path*",
    "/admin/:path*",
    "/onboarding/:path*",
  ],
};
