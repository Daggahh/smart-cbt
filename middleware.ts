import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth",
  "/auth/student/login",
  "/auth/student/signup",
  "/auth/student/forgot-password",
  "/auth/student/reset-password",
  "/auth/student/verify-email",
  "/auth/admin/login",
  "/docs",
  "/status",
  "/terms",
  "/privacy",
  "/contributing",
  "/api/auth", // Allow all NextAuth API routes
];

// Define admin routes that require admin authentication
const adminRoutes = [
  "/admin",
  "/admin/analytics",
  "/admin/security",
  "/admin/content",
  "/admin/students",
  "/admin/batches",
  "/admin/exams",
];

// Define student routes that require student authentication
const studentRoutes = ["/student", "/student/exam", "/student/results"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Use next-auth getToken to check session and role
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
  });

  if (!token) {
    // Redirect to appropriate login page based on the route
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/admin/login", request.url));
    }
    if (studentRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/student/login", request.url));
    }
    // Default redirect for unknown protected routes
    return NextResponse.redirect(new URL("/auth/student/login", request.url));
  }

  // Check admin routes access
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "admin" && token.role !== "super_admin") {
      return NextResponse.redirect(
        new URL("/auth/admin/login?error=unauthorized", request.url)
      );
    }
  }

  // Check student routes access
  if (studentRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "student") {
      return NextResponse.redirect(
        new URL("/auth/student/login?error=unauthorized", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};