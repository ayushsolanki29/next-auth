import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to handle authentication checks
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("nextauth-token")?.value || "";

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if the above conditions are not met
  return NextResponse.next();
}

// Configuration to specify which paths the middleware should apply to
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
  ],
};
