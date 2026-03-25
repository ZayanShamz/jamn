export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { is } from "date-fns/locale";

// Routes that never need a session cookie
const PUBLIC_ROUTES = ["/login", "/register", "/user-info"];

// Routes that require admin access
const ADMIN_ROUTES = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("session")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  if (!sessionCookie) {    
    if (isPublicRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const isAdminUser = decoded.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

    if (pathname === "/login" || pathname === "/register") {
      const destination = isAdminUser ? "/admin" : "/dashboard";

      return NextResponse.redirect(new URL(destination, req.url));
    }

    if (isAdminRoute && !isAdminUser) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isAdminUser && pathname.startsWith("/dashboard")) {
      
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware cookie verification error:", error);
    if (isPublicRoute) {
      const response = NextResponse.next();
      response.cookies.delete("session");
      return response;
    }
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("session");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
